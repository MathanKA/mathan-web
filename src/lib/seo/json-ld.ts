import { abs, CANONICAL_SITE_URL } from "./site";
import { resumeData } from "@/data/resume";

/**
 * Sanitize JSON-LD output to prevent XSS.
 */
export function safeJsonLd(objOrArray: unknown): string {
  return JSON.stringify(objOrArray).replace(/</g, "\\u003c");
}

/**
 * Generator for Person JSON-LD.
 */
export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${CANONICAL_SITE_URL}/#person`,
    name: resumeData.header.name,
    jobTitle: "Senior Front-end Engineer",
    url: CANONICAL_SITE_URL,
    image: `${CANONICAL_SITE_URL}/og-image.png`, // Fallback or real path
    sameAs: resumeData.header.links.map((link) => link.href),
    email: resumeData.header.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN"
    }
  };
}

/**
 * Generator for WebSite JSON-LD.
 */
export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${CANONICAL_SITE_URL}/#website`,
    url: CANONICAL_SITE_URL,
    name: "Mathan K A",
    publisher: {
      "@id": `${CANONICAL_SITE_URL}/#person`
    }
  };
}

/**
 * Generator for WebPage JSON-LD.
 */
export function getWebPageJsonLd({
  id,
  url,
  name,
  description,
  type = "WebPage"
}: {
  id: string;
  url: string;
  name: string;
  description: string;
  type?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": id,
    url,
    name,
    headline: name,
    description,
    isPartOf: {
      "@id": `${CANONICAL_SITE_URL}/#website`
    },
    breadcrumb: {
      "@id": `${url}#breadcrumb`
    }
  };
}

/**
 * Generator for BreadcrumbList JSON-LD.
 */
export function getBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${items[items.length - 1].item}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item
    }))
  };
}

/**
 * Generator for Article JSON-LD for Case Studies.
 */
export function getArticleJsonLd({
  url,
  headline,
  description,
  datePublished,
  dateModified,
  keywords,
  image
}: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  keywords?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@id": `${CANONICAL_SITE_URL}/#person`
    },
    publisher: {
      "@id": `${CANONICAL_SITE_URL}/#person`
    },
    image: image ? [image] : undefined,
    keywords
  };
}
