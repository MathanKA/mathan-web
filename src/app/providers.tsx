"use client";

import { useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "@posthog/react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // const isLocalhost =
    //   typeof window !== "undefined" &&
    //   (window.location.hostname === "localhost" ||
    //     window.location.hostname === "127.0.0.1");

    // if (isLocalhost) return;
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      // ui_host: "https://us.posthog.com",
      defaults: "2025-11-30",
      capture_pageview: "history_change",
      respect_dnt: true,
      loaded: (ph) => {
        if (process.env.NODE_ENV === "development") {
          ph.debug(true);
        }
      }
    });
    // if (
    //   location.hostname === "localhost" ||
    //   location.hostname === "127.0.0.1"
    // ) {
    //   posthog.opt_out_capturing();
    // }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
