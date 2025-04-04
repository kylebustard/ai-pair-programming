/**
 * @module TestSetup
 * @description Test utilities for managing test data and setup
 *
 * @ai-notes
 * - Implements singleton pattern for test data tracking
 * - Provides type-safe test data creation
 * - Ensures proper cleanup after tests
 * - Supports parallel test execution
 */

import { createServer } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";

// Types for test data management
type TestDataType = "user" | "profile" | "device" | "program";

interface TestDataInput<T extends TestDataType> {
  type: T;
  data: TestDataMap[T];
}

interface TestDataMap {
  user: {
    email: string;
    password: string;
    metadata?: Record<string, unknown>;
  };
  profile: {
    userId: string;
    name: string;
    preferences?: Record<string, unknown>;
  };
  device: {
    userId: string;
    name: string;
    type: string;
  };
  program: {
    deviceId: string;
    name: string;
    code: string;
  };
}

/**
 * Manages test data creation and cleanup
 * Tracks all created data for automatic cleanup
 */
export class TestData {
  private static instance: TestData;
  private testIds: Map<TestDataType, Set<string>>;
  private supabase = createServer();

  private constructor() {
    this.testIds = new Map();
  }

  static getInstance(): TestData {
    if (!TestData.instance) {
      TestData.instance = new TestData();
    }
    return TestData.instance;
  }

  /**
   * Creates test data and tracks it for cleanup
   * @throws {Error} If data creation fails
   */
  async create<T extends TestDataType>(input: TestDataInput<T>): Promise<string> {
    const id = await this.insertData(input);
    this.trackId(input.type, id);
    return id;
  }

  /**
   * Creates multiple related test data items
   * Handles dependencies correctly
   */
  async createRelated(userId: string) {
    const profile = await this.create({
      type: "profile",
      data: {
        userId,
        name: "Test User",
      },
    });

    const device = await this.create({
      type: "device",
      data: {
        userId,
        name: "Test Device",
        type: "PLC",
      },
    });

    await this.create({
      type: "program",
      data: {
        deviceId: device,
        name: "Test Program",
        code: "TEST CODE",
      },
    });

    return { profile, device };
  }

  /**
   * Cleans up all tracked test data
   * Handles deletion order for foreign key constraints
   */
  async cleanup() {
    // Delete in reverse dependency order
    const deleteOrder: TestDataType[] = ["program", "device", "profile", "user"];

    for (const type of deleteOrder) {
      const ids = this.testIds.get(type);
      if (ids?.size) {
        await this.deleteByType(type, Array.from(ids));
        ids.clear();
      }
    }
  }

  private trackId(type: TestDataType, id: string) {
    if (!this.testIds.has(type)) {
      this.testIds.set(type, new Set());
    }
    this.testIds.get(type)!.add(id);
  }

  private async insertData<T extends TestDataType>({
    type,
    data,
  }: TestDataInput<T>): Promise<string> {
    const { data: result, error } = await this.supabase
      .from(type + "s")
      .insert(data)
      .select("id")
      .single();

    if (error) throw new Error(`Failed to create ${type}: ${error.message}`);
    return result.id;
  }

  private async deleteByType(type: TestDataType, ids: string[]) {
    const { error } = await this.supabase
      .from(type + "s")
      .delete()
      .in("id", ids);

    if (error) {
      console.error(`Failed to cleanup ${type}:`, error);
    }
  }
}

/**
 * Example usage in tests:
 *
 * ```typescript
 * describe('UserProfile', () => {
 *   const testData = TestData.getInstance();
 *   let userId: string;
 *
 *   beforeEach(async () => {
 *     userId = await testData.create({
 *       type: 'user',
 *       data: {
 *         email: 'test@example.com',
 *         password: 'password123'
 *       }
 *     });
 *     await testData.createRelated(userId);
 *   });
 *
 *   afterEach(async () => {
 *     await testData.cleanup();
 *   });
 *
 *   test('loads user profile', async () => {
 *     const response = await fetch(`/api/profile/${userId}`);
 *     expect(response.status).toBe(200);
 *   });
 * });
 * ```
 */
