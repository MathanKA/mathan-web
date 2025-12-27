import type { MetadataRoute } from "next";

const CANONICAL_SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mathan.pro"
)
  .trim()
  .replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  // On Vercel, this is the reliable environment signal:
  // production | preview | development :contentReference[oaicite:4]{index=4}
  const isProduction = process.env.VERCEL_ENV === "production";

  // Non-production: disallow all (previews should not be indexed)
  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: ["/"]
        }
      ]
    };
  }

  // Production rules: keep it minimal, don’t block assets needed for rendering.
  // Google applies robots.txt only per protocol+host+port where it’s served. :contentReference[oaicite:5]{index=5}
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/api/",
          "/_mka/" // PostHog proxy (reduce junk crawling)
        ]
      }
    ],
    sitemap: `${CANONICAL_SITE_URL}/sitemap.xml`
    // host: intentionally omitted (Google ignores non-standard fields) :contentReference[oaicite:6]{index=6}
  };
}
