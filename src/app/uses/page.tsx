import type { Metadata } from "next";
import { UsesContent } from "@/components/uses/uses-content";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageJsonLd, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { abs, CANONICAL_SITE_URL } from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "A professional manifesto of the hardware, software, and systems used to build high-performance web applications.",
  alternates: {
    canonical: abs("/uses")
  },
  openGraph: {
    title: "Mathan K A | Uses",
    description: "The tools, hardware, and configurations behind the work.",
    images: [
      { url: "/og/uses.png", width: 1200, height: 630, alt: "Uses Page" }
    ]
  }
};

export default function UsesPage() {
  const url = abs("/uses");
  const webPageData = getWebPageJsonLd({
    id: `${url}#webpage`,
    url,
    name: "Uses | Mathan K A",
    description: "The tools, hardware, and configurations behind the work."
  });

  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "Home", item: CANONICAL_SITE_URL },
    { name: "Uses", item: url }
  ]);

  return (
    <div className=" min-h-screen relative w-full">
      <JsonLd data={[webPageData, breadcrumbData]} />
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      <UsesContent />
    </div>
  );
}
