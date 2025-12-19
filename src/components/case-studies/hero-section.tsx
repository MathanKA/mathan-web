"use client";

import { motion } from "motion/react";
import { ArrowLeft, Briefcase, Building2, Calendar, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImpactCard } from "./impact-card";
import { type CaseStudy } from "@/velite";

interface HeroSectionProps {
  data: CaseStudy;
}

export function HeroSection({ data }: HeroSectionProps) {
  const accentColor = data.status === "pilot" ? "fuchsia" : "emerald";

  return (
    <section className="relative w-full overflow-hidden border-b border-white/5 bg-transparent pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="-ml-3 font-mono text-xs text-zinc-500 hover:text-white"
          >
            <Link href="/case-studies">
              <ArrowLeft className="mr-2 h-3 w-3" />
              BACK_TO_ARCHIVES
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Title Area */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <Badge
                  variant="outline"
                  className={cn(
                    "border-white/10 bg-white/5 font-mono text-[10px] uppercase tracking-tighter",
                    accentColor === "fuchsia"
                      ? "text-brand-secondary"
                      : "text-brand-primary"
                  )}
                >
                  {data.status}
                </Badge>
                {data.featured && (
                  <Badge className="bg-white/10 text-white font-mono text-[10px] uppercase">
                    FEATURED_SPEC
                  </Badge>
                )}
              </div>

              <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-7xl lg:text-8xl">
                <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
                  {data.title}
                </span>
              </h1>

              <p className="max-w-2xl text-xl leading-relaxed text-zinc-400">
                {data.summary_one_liner}
              </p>

              {/* System Specs Metadata Row */}
              <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-white/10">
                <div className="space-y-1">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Role
                  </span>
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Briefcase className="h-3 w-3 text-brand-primary/50" />
                    {data.role}
                  </div>
                </div>

                {data.company && (
                  <div className="space-y-1">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      Company
                    </span>
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Building2 className="h-3 w-3 text-brand-primary/50" />
                      {data.company}
                    </div>
                  </div>
                )}

                {data.timeline && (
                  <div className="space-y-1">
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                      Timeline
                    </span>
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <Calendar className="h-3 w-3 text-brand-primary/50" />
                      {data.timeline}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {data.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] text-zinc-500 bg-zinc-900/50 px-1.5 py-0.5 rounded border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Impact Column */}
          <div className="flex flex-col justify-center lg:col-span-4 lg:pl-12">
            {data.key_stat && (
              <ImpactCard stat={data.key_stat} accentColor={accentColor} />
            )}

            {/* Action Links */}
            <div className="mt-8 flex flex-col gap-3">
              {data.links?.live && (
                <Button
                  variant="outline"
                  className="h-11 w-full border-white/10 bg-white/5 hover:bg-white/10"
                  asChild
                >
                  <a
                    href={data.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Explore Live Project
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Aurora Orbs */}
      <div className="pointer-events-none absolute -top-1/2 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-brand-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-1/2 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-brand-secondary/5 blur-[120px]" />
    </section>
  );
}

// Helper function for conditional classes
function cn(...inputs: (string | boolean | undefined | null)[]) {
  return inputs.filter(Boolean).join(" ");
}
