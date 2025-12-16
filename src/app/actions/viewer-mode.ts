"use server";

import { cookies } from "next/headers";
import { VIEWER_MODE_COOKIE, type ViewerMode } from "@/lib/viewer-mode";

/**
 * Sets the viewer mode cookie.
 *
 * @remarks
 * This function is a Server Action and must be called from a form action
 * or an event handler (via startTransition or simple async call).
 *
 * @param mode - The mode to set ('recruiter' | 'manager' | 'engineer').
 */
export async function setMode(mode: ViewerMode): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(VIEWER_MODE_COOKIE, mode, {
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 180, // 180 days
    httpOnly: false // Allow client-side read if necessary for UI sync
  });
}
