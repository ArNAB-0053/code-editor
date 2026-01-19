export const SAFE_RE = /^[a-zA-Z0-9_.-]+$/;

export function isSafeName(v: string) {
  return SAFE_RE.test(v);
}

export function sanitizePath(p: string) {
  if (
    !p ||
    p.includes("..") ||
    p.startsWith("/") ||
    p.includes("\\") ||
    p.includes("://")
  ) {
    throw new Error("Invalid path");
  }
  return p;
}