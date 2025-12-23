import { getMode } from "@/lib/viewer-mode";
import { HomeHero } from "@/components/home/home-hero";
import { SkillsSection } from "@/components/home/skills-section";
import { FeaturedEngineeringSection } from "@/components/home/featured-engineering";
import { ExperienceSection } from "@/components/sections/experience";

export default async function Home() {
  const mode = await getMode();

  return (
    <div className="flex flex-col gap-0">
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
