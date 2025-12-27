import { getMode } from "@/lib/viewer-mode";
import { HomeHero } from "@/components/home/home-hero";
import { SkillsSection } from "@/components/home/skills-section";
import { FeaturedEngineeringSection } from "@/components/home/featured-engineering";
import { ExperienceSection } from "@/components/sections/experience";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageJsonLd } from "@/lib/seo/json-ld";
import { CANONICAL_SITE_URL } from "@/lib/seo/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  canonicalPath: "/"
});

export default async function Home() {
  const mode = await getMode();

  const webPageData = getWebPageJsonLd({
    id: `${CANONICAL_SITE_URL}/#webpage-home`,
    url: `${CANONICAL_SITE_URL}/`,
    name: "Mathan K A | Senior Front-end Engineer",
    description:
      "Senior Front-end Engineer and Solo Founder specializing in high-performance Next.js applications, scalable architecture, and user-centric design."
  });

  return (
    <div className="flex flex-col gap-0">
      <JsonLd data={webPageData} />
      {/* Hero Section - FULL WIDTH */}
      <HomeHero mode={mode} />

      {/* Skills Section - FULL WIDTH */}
      <SkillsSection />

      {/* Featured Engineering Section */}
      <FeaturedEngineeringSection />

      {/* Experience Section */}
      <ExperienceSection />
    </div>
  );
}
