import { Metadata } from "next";
import { SITE } from "./site";

/**
 * Returns the metadataBase URL object.
 */
export function buildMetadataBase(): URL {
  return new URL(SITE.canonicalBase);
}

interface PageMetadataParams {
  title?: string;
  description?: string;
  image?: string;
  canonicalPath?: string; // Relative path, e.g., "/resume"
  noIndex?: boolean;
}

/**
 * Generates a Next.js Metadata object with consistent defaults.
 */
export function pageMetadata({
  title,
  description,
  image,
  canonicalPath,
  noIndex = false
}: PageMetadataParams = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${SITE.defaultTitle}`
    : SITE.defaultTitle;
  const metaDescription = description || SITE.defaultDescription;

  const metadata: Metadata = {
    title: { absolute: metaTitle }, // If specific title is provided, use absolute to override template behavior if needed, or rely on template in root
    description: metaDescription,
    robots: {
      index: !noIndex,
      follow: !noIndex
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: canonicalPath || "/",
      siteName: SITE.siteName,
      // images: image ? [{ url: image }] : undefined,
      images: [{ url: "og/og.jpg", width: 1200, height: 630, alt: "..." }],
      locale: SITE.locale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: ["/og/og.jpg"],
      creator: SITE.social.twitter
    }
  };

  if (canonicalPath) {
    metadata.alternates = {
      canonical: canonicalPath
    };
  }

  return metadata;
}
