/**
 * @component UserProfile
 * @description Displays and manages user profile information with editable capabilities
 *
 * @ai-notes
 * - Component uses React hooks for state management
 * - Implements form validation with error handling
 * - Uses optimistic updates for better UX
 * - Integrates with authentication context
 *
 * @example
 * ```tsx
 * <UserProfile
 *   userId="123"
 *   editable={true}
 *   onUpdate={(data) => console.log('Profile updated:', data)}
 * />
 * ```
 */

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserService } from "../services/UserService";
import { ProfileForm } from "./ProfileForm";
import { LoadingSpinner } from "./LoadingSpinner";

interface UserProfileProps {
  userId: string;
  editable?: boolean;
  onUpdate?: (data: UserData) => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: Record<string, unknown>;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userId, editable = false, onUpdate }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    loadUserData();
  }, [userId]);

  /**
   * @function loadUserData
   * @description Fetches user data from the API
   *
   * @ai-notes
   * - Handles loading state
   * - Implements error handling
   * - Updates component state
   */
  const loadUserData = async () => {
    try {
      setIsLoading(true);
      const data = await UserService.getUserProfile(userId);
      setUserData(data);
    } catch (err) {
      setError("Failed to load user profile");
      console.error("Error loading profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="error-message">{error}</div>;
  if (!userData) return <div>No user data found</div>;

  return (
    <div className="user-profile">
      {editable && user?.id === userId ? (
        <ProfileForm initialData={userData} onSubmit={onUpdate} />
      ) : (
        <ProfileDisplay data={userData} />
      )}
    </div>
  );
};

export default UserProfile;
