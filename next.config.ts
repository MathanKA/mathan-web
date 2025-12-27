import type { NextConfig } from "next";

// Basic Next Config
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/_mka/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*"
      },
      {
        source: "/_mka/:path*",
        destination: "https://us.i.posthog.com/:path*"
      }
    ];
  },
  skipTrailingSlashRedirect: true,
  reactCompiler: true,
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "mathanpro.vercel.app" }],
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }
        ]
      }
    ];
  }
};

// VELITE INTEGRATION
// This ensures Velite runs automatically during `next dev` and `next build`.
// The guard prevents multiple instances (Next.js config can be loaded multiple times).
if (!process.env.VELITE_STARTED) {
  process.env.VELITE_STARTED = "1";
  const isDev = process.argv.includes("dev");

  // We rely on the fact that next.config.ts is compiled by Next.js which supports ESM-like syntax/interop.
  // Using dynamic import to avoid require() issues in ESM context if strictly enforced,
  // though next.config.ts usually handles it.
  import("velite").then((velite) => {
    velite.build({ watch: isDev, clean: !isDev }).catch((err) => {
      console.error("Velite build failed:", err);
    });
  });
}

export default nextConfig;
