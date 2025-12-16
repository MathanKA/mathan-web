import { getMode } from "@/lib/viewer-mode";
import { Separator } from "@/components/ui/separator";
import { HomeHero } from "@/components/home/home-hero";
import { FeaturedCaseStudy } from "@/components/home/featured-case-study";
import { SkillsSnapshot } from "@/components/home/skills-snapshot";
import { RecommendedPath } from "@/components/home/recommended-path";

export default async function Home() {
  const mode = await getMode();

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Recommended Path */}
      {/* <div className="container mx-auto px-4 pt-32 md:pt-40 lg:pt-32">
        <RecommendedPath mode={mode} />
      </div> */}

      {/* Hero Section - FULL WIDTH */}
      <HomeHero mode={mode} />

      <div className="container mx-auto px-4 flex flex-col gap-12">
        <Separator />

        {/* Featured Case Study */}
        <FeaturedCaseStudy mode={mode} />

        {/* Skills Snapshot */}
        <SkillsSnapshot mode={mode} />
      </div>
    </div>
  );
}
