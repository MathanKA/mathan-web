import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === "production" ||
    process.env.NODE_ENV === "production";

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mathan.pro";

  if (!isProduction) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/"
      }
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", // Internal API routes
        "/_mka/" // PostHog analytics proxy (to reduce junk crawling)
      ]
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
