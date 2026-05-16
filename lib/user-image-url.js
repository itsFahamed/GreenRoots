/** Normalize user-provided photo URLs (e.g. https:/host → https://host). */
export function normalizeUserImageUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  const fixed = trimmed
    .replace(/^https:\/(?!\/)/i, "https://")
    .replace(/^http:\/(?!\/)/i, "http://");
  try {
    const u = new URL(fixed);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    return u.href;
  } catch {
    return null;
  }
}
