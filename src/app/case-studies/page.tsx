import { caseStudies } from "@/velite";
import Link from "next/link";
import { ArrowUpRight, Calendar, Sparkles } from "lucide-react";

export const metadata = {
  title: "Case Studies | Mathan",
  description: "Architectural decisions, trade-offs, and outcomes."
};

export default function CaseStudiesPage() {
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
      {/* --- BACKGROUND AMBIENCE (Unified Iridescent Theme) --- */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Fixed "Aurora" Gradient at Top Center */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[conic-gradient(from_90deg_at_50%_50%,var(--color-brand-primary)_0%,var(--color-brand-secondary)_50%,var(--color-brand-primary)_100%)] opacity-10 blur-[120px]" />

        {/* Subtle Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 py-24 md:py-32 max-w-7xl">
        {/* --- HEADER --- */}
        <div className="max-w-2xl mb-16 md:mb-24 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs font-sans text-[var(--color-brand-primary)] uppercase tracking-wider">
            <Sparkles size={12} />
            <span>Engineering Logs</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-heading">
            Case <span className="text-zinc-500">Studies</span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-body">
            Deep dives into architectural challenges, performance optimization,
            and system design trade-offs.
          </p>
        </div>

        {/* --- LAYOUT GRID --- */}
        <div className="space-y-8">
          {/* 1. FEATURED HERO CARD (Full Width) */}
          {featuredPost && (
            <Link href={featuredPost.url} className="block group relative">
              <div className="relative w-full rounded-[2rem] overflow-hidden transition-all duration-500 border border-white/10 group-hover:border-[var(--color-brand-primary)]/50 group-hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.2)]">
                {/* Card Background: Glass + Gradient Mesh */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.1),transparent_50%)]" />

                <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                  {/* Left: Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[var(--color-brand-primary)] text-black">
                        Featured Issue
                      </span>
                      <span className="text-xs text-zinc-500 font-sans flex items-center gap-1">
                        <Calendar size={12} />
                        {featuredPost.date
                          ? new Date(featuredPost.date).getFullYear()
                          : "Present"}
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-[var(--color-brand-primary)] transition-colors duration-300">
                      {featuredPost.title}
                    </h2>

                    <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                      {featuredPost.summary_one_liner}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {featuredPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-sans rounded-md bg-white/5 text-zinc-300 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Action / Visual Hint */}
                  <div className="hidden md:flex flex-col items-end justify-between h-full gap-4">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* 2. STANDARD GRID (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPosts.map((post) => (
              <Link
                key={post.slug}
                href={post.url}
                className="block group h-full"
              >
                <div className="relative h-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/20 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900/40 hover:border-white/20 hover:scale-[1.01]">
                  <div className="p-8 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] uppercase tracking-wider text-zinc-500 font-sans"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <ArrowUpRight
                        className="text-zinc-600 group-hover:text-white transition-colors"
                        size={18}
                      />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-[var(--color-brand-secondary)] transition-colors">
                      {post.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                      {post.summary_one_liner}
                    </p>

                    {/* Footer */}
                    <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-zinc-500 font-sans">
                        {"// "}
                        {post.date
                          ? new Date(post.date).toLocaleDateString("en-US", {
                              month: "long",
                              year: "numeric"
                            })
                          : "Ongoing"}
                      </span>
                      <span className="text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
                        Read Case Study &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
