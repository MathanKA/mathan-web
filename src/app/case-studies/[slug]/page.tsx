import { type CaseStudy } from "@/velite";
import caseStudiesData from "../../../../.velite/caseStudies.json";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/MDXContent";
import { HeroSection } from "@/components/case-studies/hero-section";
import { TableOfContents } from "@/components/case-studies/table-of-contents";
import { NextProjectCard } from "@/components/case-studies/next-project-card";
import { JsonLd } from "@/components/seo/json-ld";
import {
  getWebPageJsonLd,
  getBreadcrumbJsonLd,
  getArticleJsonLd
} from "@/lib/seo/json-ld";
import { abs, CANONICAL_SITE_URL } from "@/lib/seo/site";
import { pageMetadata } from "@/lib/seo/metadata";

const caseStudies = caseStudiesData as CaseStudy[];

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
    return pageMetadata({
      title: "Case Study Not Found",
      noIndex: true
    });
  }

  return pageMetadata({
    title: post.title,
    description: post.summary_one_liner,
    canonicalPath: `/case-studies/${post.slug}`
  });
}

export default async function CaseStudyPage(props: PageProps) {
  const params = await props.params;
  const postIndex = caseStudies.findIndex((p) => p.slug === params.slug);
  const post = caseStudies[postIndex];

  if (!post) {
    notFound();
  }

  const url = abs(`/case-studies/${post.slug}`);

  const webPageData = getWebPageJsonLd({
    id: `${url}#webpage`,
    url,
    name: `${post.title} | Mathan K A`,
    description: post.summary_one_liner
  });

  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "Home", item: CANONICAL_SITE_URL },
    { name: "Case Studies", item: abs("/case-studies") },
    { name: post.title, item: url }
  ]);

  const articleData = getArticleJsonLd({
    url,
    headline: post.title,
    description: post.summary_one_liner,
    datePublished: post.date || new Date().toISOString(),
    dateModified: post.date || new Date().toISOString(),
    keywords: post.tags.join(", ")
  });

  // Calculate next project for navigation (circular)
  const nextProject = caseStudies[(postIndex + 1) % caseStudies.length];

  return (
    <div className="min-h-screen relative w-full pb-32">
      <JsonLd data={[webPageData, breadcrumbData, articleData]} />
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      {/* 1. Full-Screen Hero */}
      <HeroSection data={post} />

      {/* 2. Engineering Blueprint Layout */}
      <section className="relative w-full pt-14 bg-transparent">
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-12">
            {/* Left Rail: Sticky TOC (Cols 1-3) */}
            <aside className="hidden lg:block col-span-12 lg:col-span-3">
              <TableOfContents />
            </aside>

            {/* Main Content: MDX Body (Cols 4-11) */}
            <article className="col-span-12 lg:col-span-9 lg:col-start-4">
              <div className="rounded-3xl bg-zinc-900/40 backdrop-blur-[0.5px] border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] p-8">
                <MDXContent code={post.code} />
              </div>

              {/* Next Project Navigation */}
              <NextProjectCard project={nextProject} />
            </article>

            {/* Right Rail: Optional Tech Stack Icons (Cols 12) - Keeping it minimal or empty as requested */}
            {/* <aside className="hidden xl:block xl:col-span-1" /> */}
          </div>
        </div>
      </section>
    </div>
  );
}
