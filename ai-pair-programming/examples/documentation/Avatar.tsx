/**
 * @component Avatar
 * @description Displays a user avatar image with fallback
 *
 * @ai-notes
 * - Handles image loading states
 * - Provides fallback for missing images
 * - Supports multiple sizes
 *
 * @example
 * ```tsx
 * <Avatar
 *   src="/path/to/image.jpg"
 *   alt="User Name"
 *   size="medium"
 * />
 * ```
 */

import React, { useState } from "react";

interface AvatarProps {
  src: string;
  alt: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeMap = {
  small: 32,
  medium: 48,
  large: 64,
};

export const Avatar: React.FC<AvatarProps> = ({ src, alt, size = "medium", className = "" }) => {
  const [error, setError] = useState(false);
  const dimensions = sizeMap[size];

  const handleError = () => {
    setError(true);
  };

  return (
    <div
      className={`avatar avatar-${size} ${className}`}
      style={{
        width: dimensions,
        height: dimensions,
        borderRadius: "50%",
        overflow: "hidden",
      }}
    >
      {error ? (
        <div
          className="avatar-fallback"
          style={{
            backgroundColor: "#e0e0e0",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
          }}
        >
          {alt.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={handleError}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      )}
    </div>
  );
};

export default Avatar;
