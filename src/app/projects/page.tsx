import { caseStudies } from "@/velite";
import { TagBar } from "@/components/projects/tag-bar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Projects | Mathan K A",
  description:
    "A collection of Case Studies and architectural deep dives into Privacy Engineering, Next.js, and Frontend Systems.",
  alternates: {
    canonical: "/projects"
  }
};

interface ProjectsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectsPage({
  searchParams
}: ProjectsPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentTagSlug =
    typeof resolvedSearchParams.tag === "string"
      ? resolvedSearchParams.tag
      : null;

  // 1. Normalize and aggregate tags
  const tagMap = new Map<
    string,
    { slug: string; label: string; count: number }
  >();

  caseStudies.forEach((cs) => {
    cs.tags.forEach((tag) => {
      const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      if (!tagMap.has(slug)) {
        tagMap.set(slug, { slug, label: tag, count: 0 });
      }
      tagMap.get(slug)!.count++;
    });
  });

  const allTags = Array.from(tagMap.values()).sort((a, b) => b.count - a.count);

  // 2. Filter logic - sort by featured first
  let filteredProjects = caseStudies.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  if (currentTagSlug) {
    filteredProjects = filteredProjects.filter((cs) =>
      cs.tags.some(
        (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-") === currentTagSlug
      )
    );
  }

  // 3. Separate Featured (only if NO filter is active, usually featured are pinned at top)
  // Logic: If filtering, just show the list. If not filtering, show Featured section then All.
  // Actually, standard pattern is: Always show pinned at top? Or just mixed?
  // User request: "Section 1: Featured", "Section 2: All case studies (with tag filtering)".
  // If I filter, "All case studies" becomes "Filtered case studies". Featured section often disappears or filters too.
  // Let's keep it simple:
  // If no filter: Show distinct Featured section (top 3) -> Separator -> All Projects (grid).
  // If filter: Just show all matches in the grid.

  const featured = !currentTagSlug
    ? caseStudies.filter((cs) => cs.featured).slice(0, 3)
    : [];
  // Exclude featured from the main list if we are showing them in the featured block to avoid dupe?
  // Or just duplicate? Duplicate is safer for "Review all" feel, but dedupe looks cleaner.
  // Let's dedupe if showing explicit featured section.
  const featuredSlugs = new Set(featured.map((f) => f.slug));
  const mainList = currentTagSlug
    ? filteredProjects
    : filteredProjects.filter((cs) => !featuredSlugs.has(cs.slug));

  return (
    <div className="container py-12 md:py-24 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Projects
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Deep dives into complex frontend systems, privacy engineering, and
          scalable architecture.
        </p>
      </div>

      {/* Featured Section (Only visible when not filtering) */}
      {featured.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            <h2 className="text-2xl font-bold tracking-tight">
              Featured Case Studies
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((cs) => (
              <Card
                key={cs.slug}
                className="flex flex-col h-full border-primary/20 bg-primary/5 hover:border-primary/50 transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="leading-snug text-xl">
                      {cs.title}
                    </CardTitle>
                    <Badge
                      variant="default"
                      className="shrink-0 bg-primary text-primary-foreground"
                    >
                      Featured
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {cs.summary_one_liner}
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/80">
                    <span>{cs.role}</span>
                    <span>•</span>
                    <span>{cs.status}</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    variant="ghost"
                    asChild
                    className="w-full justify-between group"
                  >
                    <Link href={cs.url}>
                      Read Case Study
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Main List Section */}
      <section className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">
            {currentTagSlug
              ? `Projects tagged "${allTags.find((t) => t.slug === currentTagSlug)?.label || currentTagSlug}"`
              : "All Projects"}
          </h2>
          {/* Tag Filter */}
          <TagBar tags={allTags} />
        </div>

        {mainList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mainList.map((cs) => (
              <Card
                key={cs.slug}
                className="flex flex-col h-full hover:border-foreground/50 transition-colors"
              >
                <CardHeader className="pb-3">
                  <CardTitle className="leading-snug text-xl hover:underline decoration-primary underline-offset-4">
                    <Link href={cs.url}>{cs.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {cs.summary_one_liner}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {cs.tags.slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] px-2 py-0.5"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {cs.tags.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-[10px] px-2 py-0.5"
                      >
                        +{cs.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="pt-0 border-t mt-auto pt-4">
                  <Link
                    href={cs.url}
                    className="text-sm font-medium flex items-center text-primary/80 hover:text-primary transition-colors"
                  >
                    Read Case Study
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-4 border-2 border-dashed rounded-xl">
            <p className="text-lg text-muted-foreground">
              No projects found with this tag.
            </p>
            <Button variant="outline" asChild>
              <Link href="/projects" scroll={false}>
                Clear Filters
              </Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
