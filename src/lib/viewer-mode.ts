import { cookies } from 'next/headers';

/**
 * Available viewer modes for the portfolio.
 */
export type ViewerMode = 'recruiter' | 'manager' | 'engineer';

export const VIEWER_MODE_COOKIE = 'viewer_mode';
export const DEFAULT_VIEWER_MODE: ViewerMode = 'recruiter';

/**
 * Type guard to check if a string is a valid ViewerMode.
 * @param value - The value to check.
 */
export function isViewerMode(value: unknown): value is ViewerMode {
  return (
    typeof value === 'string' &&
    ['recruiter', 'manager', 'engineer'].includes(value)
  );
}

/**
 * Retrieves the current viewer mode from cookies.
 *
 * @remarks
 * This function uses the `cookies()` dynamic API, which will opt the
 * calling route/component into dynamic rendering.
 *
 * @returns {Promise<ViewerMode>} The current mode or the default if missing/invalid.
 */
export async function getMode(): Promise<ViewerMode> {
  const cookieStore = await cookies();
  const modeCookie = cookieStore.get(VIEWER_MODE_COOKIE);
  const value = modeCookie?.value;

  if (isViewerMode(value)) {
    return value;
  }

  return DEFAULT_VIEWER_MODE;
}
