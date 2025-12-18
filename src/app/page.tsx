import { getMode } from "@/lib/viewer-mode";
import { HomeHero } from "@/components/home/home-hero";
import { FeaturedCaseStudy } from "@/components/home/featured-case-study";
import { SkillsSnapshot } from "@/components/home/skills-snapshot";
import { SkillsSection } from "@/components/home/skills-section";
import { SkillsSec } from "@/components/home/skills-sec";

export default async function Home() {
  const mode = await getMode();

  return (
    <div className="flex flex-col gap-0 pb-12">
      {/* Recommended Path */}
      {/* <div className="container mx-auto px-4 pt-32 md:pt-40 lg:pt-32">
        <RecommendedPath mode={mode} />
      </div> */}

      {/* Hero Section - FULL WIDTH */}
      <HomeHero mode={mode} />

      {/* Skills Section - FULL WIDTH */}
      <SkillsSection />

      <SkillsSec />

      <div className="container mx-auto px-4 flex flex-col gap-12 h-[500px]">
        {/* Featured Case Study */}
        {/* <FeaturedCaseStudy mode={mode} /> */}

        {/* Skills Snapshot */}
        <SkillsSnapshot mode={mode} />
      </div>
    </div>
  );
}
