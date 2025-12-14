import { caseStudies } from "@/velite";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/mdx/MDXContent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Briefcase } from "lucide-react";
import { SectionNav } from "@/components/case-studies/section-nav";
import { CaseStudyTitle } from "@/components/case-studies/case-study-title";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all case studies
export async function generateStaticParams() {
  return caseStudies.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const post = caseStudies.find((p) => p.slug === params.slug);
  if (!post) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${post.title} | Mathan`,
    description: post.summary_one_liner,
  };
}

export default async function CaseStudyPage(props: PageProps) {
  const params = await props.params;
  const post = caseStudies.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container py-8 md:py-16 max-w-7xl mx-auto">
      {/* Top Navigation */}
      <div className="mb-8 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="-ml-3 text-muted-foreground hover:text-foreground"
        >
          <Link href="/case-studies" aria-label="Back to Case Studies">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Case Studies
          </Link>
        </Button>
        {/* <div className="text-sm text-muted-foreground hidden sm:block">
             {format(parseISO(post.date), "MMMM d, yyyy")}
         </div> */}
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-12 lg:gap-24 relative">
        {/* Main Column */}
        <div className="min-w-0">
          {/* Header */}
          <div className="mb-12 space-y-6 border-b pb-12">
            <div className="flex flex-wrap gap-2 items-center">
              <Badge
                variant={post.status === "pilot" ? "secondary" : "default"}
                className="uppercase tracking-wider text-[10px]"
              >
                {post.status}
              </Badge>
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            <CaseStudyTitle text={post.title} />

            <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
              {post.summary_one_liner}
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm md:text-base text-muted-foreground pt-4 border-t mt-8">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="font-semibold text-foreground">
                  {post.role}
                </span>
              </div>
              <span className="hidden md:inline text-border">|</span>
              {/* <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                         <span>{post.company}</span>
                     </div>
                     <span className="hidden md:inline text-border">|</span> */}
              {/* {post.links?.live && (
                <Button
                     {post.links?.live && (
                         <Button variant="link" asChild className="p-0 h-auto font-normal text-muted-foreground hover:text-primary">
                             <a href={post.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                Live Project
                             </a>
                         </Button>
                     )} */}{" "}
            </div>
          </div>

          {/* Content Body */}
          <div className="prose prose-slate dark:prose-invert max-w-none md:prose-lg">
            <MDXContent code={post.code} />
          </div>

          {/* Footer / Stack */}
          <div className="mt-16 pt-8 border-t">
            <h3 className="text-lg font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {post.stack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-3 py-1 text-sm bg-muted-foreground/10 hover:bg-muted-foreground/20"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <aside className="hidden lg:block relative">
          <SectionNav />
        </aside>
      </div>
    </article>
  );
}
