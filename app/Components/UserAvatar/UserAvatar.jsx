"use client";

import { useState } from "react";
import { normalizeUserImageUrl } from "@/lib/user-image-url";

/**
 * Avatar from arbitrary URL (not limited by next/image remotePatterns).
 * Broken or invalid URLs fall back to `fallback`.
 */
export default function UserAvatar({ src, alt, className, fallback }) {
  const [failed, setFailed] = useState(false);
  const url = normalizeUserImageUrl(src);

  if (!url || failed) return fallback;

  return (
    <img
      src={url}
      alt={alt || "User"}
      className={className}
      onError={() => setFailed(true)}
      referrerPolicy="no-referrer"
    />
  );
}
