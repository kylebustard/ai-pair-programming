# PLC Pro: Lessons Learned & Best Practices

## Authentication Patterns

### Problem: Inconsistent Auth Implementation

We initially had multiple approaches to authentication:

- Direct Supabase client usage in components
- Custom hooks with different implementations
- Mixed client/server auth state management
- No clear strategy for real-time auth state updates

### Solution: Hybrid Auth Pattern

```typescript
// ✅ Correct Pattern: Server-First Auth Base
// app/actions/auth.ts
export async function getCurrentUser() {
  "use server";
  const supabase = createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// ✅ Correct Pattern: Server Components Protection
// app/components/AuthGuard.tsx
export async function AuthGuard({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return children;
}

// ✅ Correct Pattern: Real-time Auth State (When Needed)
// hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  // Initial server-validated state
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  // Real-time updates for multi-tab/window scenarios
  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return user;
}

// ❌ Anti-pattern: Client-Only Auth
// Don't rely solely on client-side auth state
const useClientOnlyAuth = () => {
  const [user, setUser] = useState(null);
  // Missing server validation
  // Missing real-time updates
  // Potential security risks
};
```

### When to Use Each Pattern

#### Server-First Auth (Base Pattern)

✅ Use when:

- Implementing page-level protection
- Handling initial auth state
- Working with Server Components
- Implementing middleware protection

#### Real-time Auth State (Enhancement)

✅ Add when:

- Building multi-tab applications
- Needing instant auth state updates
- Implementing real-time features
- Building chat/collaboration features

#### Hybrid Approach Considerations

- Cache server auth calls appropriately
- Use middleware for API route protection
- Implement proper error boundaries
- Consider performance implications

### Performance Optimization

```typescript
// ✅ Correct Pattern: Cached Auth State
// lib/auth-cache.ts
export const getUser = cache(async () => {
  const supabase = createServer();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
});

// ✅ Correct Pattern: Middleware Protection
// middleware.ts
export async function middleware(request: NextRequest) {
  const response = await supabase.auth.getUser();

  if (!response.data.user) {
    const url = new URL('/login', request.url);
    url.searchParams.set('from', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
}

// ✅ Correct Pattern: Error Boundary for Auth
// app/components/AuthErrorBoundary.tsx
export function AuthErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<AuthErrorFallback />}
      onError={(error) => {
        if (error instanceof AuthError) {
          // Handle auth-specific errors
          reportAuthError(error);
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
```

### Key Considerations

1. **Security**

   - Server-first validation is essential
   - Protect both pages and API routes
   - Implement proper token handling
   - Use secure session management

2. **Performance**

   - Cache auth state appropriately
   - Minimize unnecessary server calls
   - Use edge functions when possible
   - Implement proper loading states

3. **User Experience**

   - Handle multi-tab scenarios
   - Provide instant feedback
   - Implement proper error handling
   - Show appropriate loading states

4. **Maintenance**
   - Keep auth logic centralized
   - Document auth patterns clearly
   - Monitor auth-related errors
   - Regular security audits

## Test Infrastructure

### Problem: Test Data Management

- Inconsistent test data setup
- Data leaking between tests
- Manual cleanup required
- Flaky tests due to state

### Solution: Structured Test Utilities

```typescript
// ✅ Correct Pattern: Test Data Management
// tests/utils/test-data.ts
export class TestData {
  private static testIds: string[] = [];

  static async create(data: TestDataInput) {
    const id = await insertTestData(data);
    this.testIds.push(id);
    return id;
  }

  static async cleanup() {
    await Promise.all(this.testIds.map((id) => deleteTestData(id)));
    this.testIds = [];
  }
}

// ✅ Correct Pattern: Test Setup
// tests/features/user-profile.test.ts
describe("UserProfile", () => {
  let testUser: TestUser;

  beforeEach(async () => {
    testUser = await TestData.create({
      type: "user",
      data: userFixture,
    });
  });

  afterEach(async () => {
    await TestData.cleanup();
  });
});

// ❌ Anti-pattern: Manual Test Data
// Don't create test data without cleanup
test("profile display", async () => {
  const user = await createTestUser(); // Data leaks!
});
```

## Database Access Patterns

### Problem: Mixed Query Patterns

- Direct database queries in components
- Inconsistent error handling
- No type safety for queries
- Duplicate query logic

### Solution: Centralized Data Access

```typescript
// ✅ Correct Pattern: Data Access Layer
// lib/db/users.ts
export class UsersDB {
  static async getProfile(id: string): Promise<UserProfile> {
    const { data, error } = await sql`
      SELECT * FROM profiles WHERE user_id = ${id}
    `;
    if (error) throw new DatabaseError(error);
    return data;
  }
}

// ✅ Correct Pattern: Server Action Usage
// app/actions/users.ts
export async function getUserProfile(id: string) {
  "use server";
  try {
    return await UsersDB.getProfile(id);
  } catch (error) {
    throw new UserActionError("Failed to load profile");
  }
}

// ❌ Anti-pattern: Direct DB Access
// Don't query database directly in components
const Profile = async ({ id }) => {
  const { data } = await sql`SELECT * FROM profiles`; // Wrong!
};
```

## Component Architecture

### Problem: Mixed Client/Server Code

- Components with both client and server logic
- Unclear boundaries between client/server
- Prop drilling for server data
- Unnecessary client-side state

### Solution: Clear Component Boundaries

```typescript
// ✅ Correct Pattern: Server Component
// app/components/UserProfile.tsx
export async function UserProfile({ id }: { id: string }) {
  const profile = await getUserProfile(id);
  return <UserProfileDisplay profile={profile} />;
}

// ✅ Correct Pattern: Client Component
// app/components/UserProfileEdit.tsx
'use client';
export function UserProfileEdit({ profile, onSave }: Props) {
  return <form onSubmit={onSave}>...</form>;
}

// ❌ Anti-pattern: Mixed Concerns
// Don't mix data fetching and interactivity
const Profile = ({ id }) => {
  const [data, setData] = useState(null);
  useEffect(() => { fetchData() }, []); // Wrong!
};
```

## Error Handling

### Problem: Inconsistent Error Handling

- Mixed error handling approaches
- Missing error boundaries
- Unclear error hierarchies
- Poor error messages

### Solution: Structured Error Handling

```typescript
// ✅ Correct Pattern: Error Hierarchy
// lib/errors.ts
export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number
  ) {
    super(message);
  }
}

export class DatabaseError extends AppError {
  constructor(error: unknown) {
    super(
      'Database operation failed',
      'DB_ERROR',
      500
    );
  }
}

// ✅ Correct Pattern: Error Boundary
// app/components/ErrorBoundary.tsx
export function ErrorBoundary({ children }: Props) {
  return (
    <Suspense fallback={<Loading />}>
      <ErrorBoundaryInner>
        {children}
      </ErrorBoundaryInner>
    </Suspense>
  );
}

// ❌ Anti-pattern: Catch-all Errors
// Don't use generic error handling
try {
  await operation();
} catch (e) {
  console.error(e); // Wrong!
}
```

## Key Takeaways

1. **Authentication**

   - Use server-first auth pattern
   - Keep auth state server-side
   - Use typed auth utilities

2. **Testing**

   - Implement robust test data management
   - Always clean up test data
   - Use typed test utilities
   - Avoid test data leaks

3. **Database Access**

   - Centralize data access logic
   - Use typed queries
   - Handle errors consistently
   - Keep queries in server context

4. **Component Architecture**

   - Clear client/server boundaries
   - Server components for data
   - Client components for interactivity
   - Proper prop typing

5. **Error Handling**
   - Structured error hierarchy
   - Consistent error boundaries
   - Clear error messages
   - Type-safe error handling
