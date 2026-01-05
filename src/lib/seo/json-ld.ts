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
  const email = resumeData.header.email?.trim();
  const emailValue = email?.startsWith("mailto:")
    ? email
    : email
      ? `mailto:${email}`
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${CANONICAL_SITE_URL}/#person`,
    name: resumeData.header.name,
    jobTitle: "Senior Frontend Engineer",
    url: CANONICAL_SITE_URL,
    image: abs("/og/og.jpg"),
    sameAs: resumeData.header.links.map((link) => link.href),
    ...(emailValue ? { email: emailValue } : {}),
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
 *
 * IMPORTANT:
 * - Only include the `breadcrumb` reference if you are ALSO rendering a valid BreadcrumbList.
 *   Otherwise Google sees a breadcrumb reference with no list and can flag it.
 */
export function getWebPageJsonLd({
  id,
  url,
  name,
  description,
  type = "WebPage",
  breadcrumbId
}: {
  id: string;
  url: string; // absolute canonical URL preferred
  name: string;
  description: string;
  type?: string;
  breadcrumbId?: string; // e.g. `${url}#breadcrumb`
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
    ...(breadcrumbId ? { breadcrumb: { "@id": breadcrumbId } } : {})
  };
}

/**
 * Generator for BreadcrumbList JSON-LD.
 *
 * Fix:
 * - Never emit a BreadcrumbList without itemListElement.
 * - If items are missing/empty, return null and the caller should NOT render JsonLd script.
 */
export function getBreadcrumbJsonLd(
  items: { name: string; item: string }[] | undefined | null
) {
  if (!items || items.length === 0) return null;

  // Ensure each "item" is absolute canonical (accepts "/path" or full URL).
  const normalized = items.map((it) => ({
    name: it.name,
    item: it.item.startsWith("http") ? it.item : abs(it.item)
  }));

  const last = normalized[normalized.length - 1];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${last.item}#breadcrumb`,
    itemListElement: normalized.map((it, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: it.name,
      item: it.item
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
  url: string; // absolute canonical
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string | string[];
  image?: string;
}) {
  const kw = Array.isArray(keywords)
    ? keywords.filter(Boolean).join(", ")
    : keywords;

  const img = image
    ? image.startsWith("http")
      ? image
      : abs(image)
    : undefined;

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
    dateModified: (dateModified || datePublished) as string,
    author: {
      "@id": `${CANONICAL_SITE_URL}/#person`
    },
    publisher: {
      "@id": `${CANONICAL_SITE_URL}/#person`
    },
    ...(img ? { image: [img] } : {}),
    ...(kw ? { keywords: kw } : {})
  };
}
