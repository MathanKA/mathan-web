export const CANONICAL_SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mathan.pro"
)
  .trim()
  .replace(/\/+$/, "");

/**
 * Generate an absolute canonical URL for a given pathname.
 * @param pathname The path to the page (e.g., "/resume")
 * @returns The absolute canonical URL (e.g., "https://www.mathan.pro/resume")
 */
export function abs(pathname: string): string {
  // Ensure we don't have double slashes if pathname starts with /
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${CANONICAL_SITE_URL}${path}`;
}
