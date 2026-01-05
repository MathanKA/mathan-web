export const SITE = {
  name: "Mathan K A",
  siteName: "Mathan K A | Senior Frontend Engineer",
  domain: "mathan.pro",
  canonicalBase: "https://www.mathan.pro",
  locale: "en_US",
  titleTemplate: "%s | Mathan K A",
  defaultTitle: "Mathan K A | Senior Frontend Engineer",
  defaultDescription:
    "Senior Frontend Engineer and Solo Founder specializing in high-performance Next.js applications, scalable architecture, and user-centric design.",
  keywords: [
    "Senior Frontend Engineer",
    "Next.js Developer",
    "React Developer",
    "Web Performance",
    "Tailwind CSS",
    "Software Architecture",
    "Optimization Expert",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Mathan K A",
    "Mathan.pro",
    "Web Developer",
    "Vue.js",
    "Nuxt.js",
    "SEO Optimization",
    "Web Core Vitals",
    "Lighthouse",
    "Web Acessibility",
    "Progressive Web Apps",
    "PWA"
  ],
  social: {
    twitter: "@MathanKA",
    github: "MathanKA",
    linkedin: "mathanka"
  }
};

export const CANONICAL_SITE_URL = SITE.canonicalBase;

/**
 * Generate an absolute canonical URL for a given pathname.
 * @param pathname The path to the page (e.g., "/resume")
 * @returns The absolute canonical URL (e.g., "https://www.mathan.pro/resume")
 */
export function abs(pathname: string): string {
  // Ensure we don't have double slashes if pathname starts with /
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE.canonicalBase}${path}`;
}
