"use client";

import Link from "next/link";
import { ArrowRight, Handshake } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroButtonsProps {
  primaryHref?: string;
  secondaryHref?: string;
  className?: string;
}

export function HeroButtons({
  primaryHref = "/case-studies",
  secondaryHref = "/contact",
  className
}: HeroButtonsProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-6 w-full justify-center md:justify-start pt-6",
        className
      )}
    >
      {/* Primary CTA - Organic Glassmorphism */}
      <Link
        href={primaryHref}
        className="group relative inline-flex items-center justify-center px-8 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded-full"
      >
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg" />
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 opacity-50 blur-sm transition-opacity duration-300 group-hover:opacity-70" />

        <span className="relative flex items-center gap-2">
          View Case Studies
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>

      {/* Secondary CTA - Standard Backdrop Blur */}
      <Link
        href={secondaryHref}
        className={cn(
          "group relative inline-flex items-center justify-center px-8 py-3 rounded-full",
          "bg-white/5 hover:bg-white/10",
          "backdrop-blur-md",
          "border border-white/10 hover:border-white/20",
          "shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)]",
          "transition-all duration-300 ease-out",
          "active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        )}
      >
        {/* Optional: A subtle glow behind the text that appears on hover */}
        <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />

        <span className="relative flex items-center gap-2 font-medium text-zinc-200 group-hover:text-white transition-colors">
          <Handshake className="w-5 h-5 text-zinc-200 group-hover:text-white transition-colors" />
          Connect
        </span>
      </Link>
    </div>
  );
}
