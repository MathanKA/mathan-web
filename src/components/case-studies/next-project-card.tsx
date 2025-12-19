"use client";

import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { type CaseStudy } from "@/velite";

interface NextProjectCardProps {
  project: CaseStudy;
}

export function NextProjectCard({ project }: NextProjectCardProps) {
  return (
    <Link href={project.url} className="group block relative w-full mt-24">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-12 backdrop-blur-xl transition-all duration-500 hover:border-brand-primary/30">
        {/* Background Glow */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-brand-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              NEXT_CHASSIS
            </span>

            <h3 className="text-4xl font-bold tracking-tighter text-white sm:text-6xl">
              {project.title}
            </h3>

            <p className="max-w-xl text-lg text-zinc-400">
              {project.summary_one_liner}
            </p>

            <div className="flex items-center gap-4 pt-4">
              <Badge
                variant="outline"
                className="border-white/10 bg-white/5 font-mono text-[10px] uppercase text-zinc-400"
              >
                {project.status}
              </Badge>
              <div className="flex items-center gap-2 text-brand-primary font-mono text-xs font-bold uppercase tracking-tighter transition-all group-hover:gap-4">
                Execute Dive <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center h-24 w-24 rounded-full border border-white/10 bg-white/5 transition-all duration-500 group-hover:border-brand-primary/50 group-hover:bg-brand-primary/10">
            <ChevronRight className="h-8 w-8 text-zinc-500 transition-colors group-hover:text-brand-primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}
