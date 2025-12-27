import { type CaseStudy } from "@/velite";
import caseStudiesData from "../../../.velite/caseStudies.json";
import Link from "next/link";
import { ArrowUpRight, Calendar, BriefcaseBusiness } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageJsonLd, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { abs, CANONICAL_SITE_URL } from "@/lib/seo/site";

const caseStudies = caseStudiesData as CaseStudy[];

export const metadata = {
  title: "Case Studies | Mathan K A",
  description:
    "Deep dives into product builds, frontend systems, and the engineering trade offs behind real releases.",
  alternates: {
    canonical: abs("/case-studies")
  }
};

export default function CaseStudiesPage() {
  const url = abs("/case-studies");
  const webPageData = getWebPageJsonLd({
    id: `${url}#webpage`,
    url,
    name: "Case Studies | Mathan K A",
    description:
      "Deep dives into product builds, frontend systems, and the engineering trade offs behind real releases.",
    type: "CollectionPage"
  });

  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "Home", item: CANONICAL_SITE_URL },
    { name: "Case Studies", item: url }
  ]);

  // Logic: Sort by date, then separate Featured from the rest
  const sortedPosts = caseStudies.sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  const featuredPost = sortedPosts.find((post) => post.featured);
  const otherPosts = sortedPosts.filter(
    (post) => post.slug !== featuredPost?.slug
  );

  return (
    <div className="min-h-screen relative w-full overflow-hidden">
      <JsonLd data={[webPageData, breadcrumbData]} />
      {/* --- BACKGROUND AMBIENCE --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-24 md:py-32 max-w-7xl">
        {/* --- HEADER --- */}
        <div className="max-w-2xl mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] md:text-xs font-sans text-[var(--color-brand-primary)] uppercase tracking-[0.4em] opacity-80">
            <BriefcaseBusiness size={12} />
            <span>Engineering Logs</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white font-heading">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-2xl pr-1">
              Case
            </span>{" "}
            <span className="text-foreground/60">Studies</span>
          </h1>

          <p className="text-foreground/70 max-w-2xl text-xl leading-relaxed">
            Deep dives into product builds, frontend systems, and the
            engineering trade offs behind real releases.
          </p>
        </div>

        {/* --- LAYOUT GRID --- */}
        <div className="space-y-8">
          <div className="container mx-auto relative z-10">
            <div className="grid grid-cols-12 gap-6 md:gap-12">
              <div className="col-span-12 md:col-span-6">
                {featuredPost && (
                  <Link
                    href={featuredPost.url}
                    className="block group relative"
                  >
                    <div className="relative w-full rounded-[2rem] overflow-hidden transition-all duration-500 border border-white/10 group-hover:border-[var(--color-brand-primary)]/10 group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)]">
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />
                      <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="flex-1 space-y-6">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-[10px] font-semibold  tracking-widest bg-[var(--color-brand-primary)]/50 text-foreground">
                              Building Now
                            </span>
                            <span className="text-xs text-zinc-500 font-sans flex items-center gap-1">
                              <Calendar size={12} />
                              {featuredPost.date
                                ? new Date(featuredPost.date).getFullYear()
                                : "Present"}
                            </span>
                          </div>

                          <h2 className="text-3xl md:text-4xl font-bold text-foreground  transition-colors duration-300">
                            {featuredPost.title}
                          </h2>

                          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                            {featuredPost.summary_one_liner}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {featuredPost.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 pt-1 pb-0.5 text-xs font-sans rounded-md bg-white/5 text-zinc-300 border border-white/10 tracking-wide"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="hidden md:flex flex-col items-end justify-between h-full gap-4">
                          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
              {otherPosts.map((post) => (
                <div className="col-span-12 md:col-span-6" key={post.slug}>
                  <Link href={post.url} className="block group relative">
                    <div className="relative w-full rounded-[2rem] overflow-hidden transition-all duration-500 border border-white/10 group-hover:border-[var(--color-brand-primary)]/10 group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.1)]">
                      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" />
                      <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        <div className="flex-1 space-y-6">
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-zinc-500 font-sans flex items-center gap-1">
                              <Calendar size={12} />
                              {post.date
                                ? new Date(post.date).getFullYear()
                                : "Present"}
                            </span>
                          </div>

                          <h2 className="text-3xl md:text-4xl font-bold text-foreground  transition-colors duration-300">
                            {post.title}
                          </h2>

                          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                            {post.summary_one_liner}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 pt-1 pb-0.5 text-xs font-sans rounded-md bg-white/5 text-zinc-300 border border-white/10 tracking-wide"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="hidden md:flex flex-col items-end justify-between h-full gap-4">
                          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                            <ArrowUpRight size={20} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
