import { type CaseStudy } from "@/velite";
import caseStudiesData from "../../../../.velite/caseStudies.json";

const caseStudies = caseStudiesData as CaseStudy[];

import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/MDXContent";
import { HeroSection } from "@/components/case-studies/hero-section";
import { TableOfContents } from "@/components/case-studies/table-of-contents";
import { NextProjectCard } from "@/components/case-studies/next-project-card";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all case studies
export async function generateStaticParams() {
  return caseStudies.map((post) => ({
    slug: post.slug
  }));
}

// Generate metadata for the page
export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const post = caseStudies.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Case Study Not Found"
    };
  }

  return {
    title: `${post.title} | Mathan`,
    description: post.summary_one_liner
  };
}

export default async function CaseStudyPage(props: PageProps) {
  const params = await props.params;
  const postIndex = caseStudies.findIndex((p) => p.slug === params.slug);
  const post = caseStudies[postIndex];

  if (!post) {
    notFound();
  }

  // Calculate next project for navigation (circular)
  const nextProject = caseStudies[(postIndex + 1) % caseStudies.length];

  return (
    <main className="min-h-screen bg-transparent pb-32">
      {/* 1. Full-Screen Hero */}
      <HeroSection data={post} />

      {/* 2. Engineering Blueprint Layout */}
      <div className="container mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Left Rail: Sticky TOC (Cols 1-3) */}
          <aside className="hidden lg:block lg:col-span-3">
            <TableOfContents />
          </aside>

          {/* Main Content: MDX Body (Cols 4-11) */}
          <article className="col-span-12 lg:col-span-8 lg:col-start-4">
            <div className="mdx-content">
              <MDXContent code={post.code} />
            </div>

            {/* Next Project Navigation */}
            <NextProjectCard project={nextProject} />
          </article>

          {/* Right Rail: Optional Tech Stack Icons (Cols 12) - Keeping it minimal or empty as requested */}
          <aside className="hidden xl:block xl:col-span-1" />
        </div>
      </div>
    </main>
  );
}
