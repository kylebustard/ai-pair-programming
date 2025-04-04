/**
 * @component ProfileDisplay
 * @description Displays user profile information in read-only mode
 *
 * @ai-notes
 * - Pure presentation component
 * - Handles avatar display
 * - Formats user data for display
 *
 * @example
 * ```tsx
 * <ProfileDisplay data={userData} />
 * ```
 */

import React from "react";
import { Avatar } from "./Avatar";

interface ProfileDisplayProps {
  data: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    preferences: Record<string, unknown>;
  };
}

export const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ data }) => {
  return (
    <div className="profile-display">
      <div className="profile-header">
        <Avatar src={data.avatar} alt={data.name} size="large" />
        <h2>{data.name}</h2>
      </div>

      <div className="profile-details">
        <div className="detail-item">
          <label>Email:</label>
          <span>{data.email}</span>
        </div>

        {Object.entries(data.preferences).map(([key, value]) => (
          <div key={key} className="detail-item">
            <label>{key}:</label>
            <span>{String(value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileDisplay;
