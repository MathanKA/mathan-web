import { cookies } from "next/headers";

/**
 * Available viewer modes for the portfolio.
 */
export type ViewerMode = "recruiter" | "manager" | "engineer";

export const VIEWER_MODE_COOKIE = "viewer_mode";
export const DEFAULT_VIEWER_MODE: ViewerMode = "recruiter";

export function isViewerMode(value: unknown): value is ViewerMode {
  return (
    typeof value === "string" &&
    ["recruiter", "manager", "engineer"].includes(value)
  );
}

export async function getMode(): Promise<ViewerMode> {
  const cookieStore = await cookies();
  const modeCookie = cookieStore.get(VIEWER_MODE_COOKIE);
  const value = modeCookie?.value;

  if (isViewerMode(value)) {
    return value;
  }

  return DEFAULT_VIEWER_MODE;
}
