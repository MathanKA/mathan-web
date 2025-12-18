"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  FEATURED_ENGINEERING_ITEMS,
  FeaturedEngineeringItem
} from "./featured-engineering-data";
import { FeaturedEngineeringCard } from "./featured-engineering-card";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

export const FeaturedEngineeringSection = () => {
  const [activeId, setActiveId] = useState<FeaturedEngineeringItem["id"]>(
    FEATURED_ENGINEERING_ITEMS[0].id
  );

  const activeItem = FEATURED_ENGINEERING_ITEMS.find(
    (item) => item.id === activeId
  )!;

  return (
    <section
      id="work"
      className="relative w-full bg-transparent py-24 md:py-36"
      style={
        {
          "--accent-rgb": activeItem.theme.accentRgb,
          "--accent-hex": activeItem.theme.accentHex
        } as React.CSSProperties
      }
    >
      {/* Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />

        {/* Dynamic Section Glow - Matches Brand Palette */}
        <motion.div
          animate={{
            background: `radial-gradient(60% 40% at 20% 30%, rgb(var(--accent-rgb) / 0.15), transparent 60%)`
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-12 gap-8 md:gap-12">
          {/* Left Column: Sticky Project Index & Details */}
          <div className="col-span-12 md:col-span-4 self-start md:sticky md:top-24 mb-12 md:mb-0">
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <span
                  className="text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase transition-colors duration-500"
                  style={{ color: activeItem.theme.accentHex }}
                >
                  Featured Engineering
                </span>
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading">
                  Crafting <span className="text-zinc-500">at scale.</span>
                </h2>
                <p className="text-zinc-400 text-lg leading-relaxed max-w-sm font-body">
                  A selection of architectural decisions and performance wins
                  from recent projects.
                </p>
              </div>

              {/* Project Index */}
              <nav className="flex flex-col gap-4">
                {FEATURED_ENGINEERING_ITEMS.map((item) => (
                  <ProjectIndexItem
                    key={item.id}
                    item={item}
                    isActive={activeId === item.id}
                    onClick={() => {
                      setActiveId(item.id);
                      const el = document.getElementById(item.id);
                      if (el) {
                        const offset = 100;
                        const bodyRect =
                          document.body.getBoundingClientRect().top;
                        const elementRect = el.getBoundingClientRect().top;
                        const elementPosition = elementRect - bodyRect;
                        const offsetPosition = elementPosition - offset;

                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth"
                        });
                      }
                    }}
                  />
                ))}
              </nav>

              {/* Active Project Details (Desktop Only) */}
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden md:block space-y-6 pt-8 border-t border-white/5"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase uppercase tracking-wider">
                      Role
                    </span>
                    <div className="text-sm text-zinc-300 font-medium">
                      {activeItem.role}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase uppercase tracking-wider">
                      Metric
                    </span>
                    <div
                      className="text-sm font-medium"
                      style={{ color: activeItem.theme.accentHex }}
                    >
                      {activeItem.keyStat}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase uppercase tracking-wider">
                    Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeItem.stack.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-zinc-400 border border-white/5 transition-colors duration-300 hover:text-white"
                        style={{
                          borderColor: `rgba(255,255,255,0.1)`
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Scrolling Card Stack */}
          <div className="col-span-12 md:col-span-8 flex flex-col gap-24 md:gap-40">
            {FEATURED_ENGINEERING_ITEMS.map((item) => (
              <ProjectCardWrapper
                key={item.id}
                item={item}
                activeId={activeId}
                setActiveId={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardWrapperProps {
  item: FeaturedEngineeringItem;
  activeId: FeaturedEngineeringItem["id"];
  setActiveId: (id: FeaturedEngineeringItem["id"]) => void;
}

const ProjectCardWrapper = ({
  item,
  activeId,
  setActiveId
}: ProjectCardWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    margin: "-48% 0px -48% 0px"
  });

  useEffect(() => {
    if (isInView) {
      setActiveId(item.id);
    }
  }, [isInView, item.id, setActiveId]);

  return (
    <div ref={ref} className="w-full">
      <FeaturedEngineeringCard item={item} isActive={activeId === item.id} />
    </div>
  );
};

interface ProjectIndexItemProps {
  item: FeaturedEngineeringItem;
  isActive: boolean;
  onClick: () => void;
}

const ProjectIndexItem = ({
  item,
  isActive,
  onClick
}: ProjectIndexItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-4 text-left transition-all duration-300",
        isActive ? "opacity-100" : "opacity-40 hover:opacity-60"
      )}
      aria-current={isActive ? "true" : undefined}
    >
      {/* Indicator */}
      <div className="relative flex items-center justify-center">
        <div
          className={cn(
            "w-2 h-2 rounded-full transition-all duration-500 shrink-0",
            isActive ? "scale-100" : "scale-50 bg-zinc-700"
          )}
          style={{
            backgroundColor: isActive ? item.theme.accentHex : undefined,
            boxShadow: isActive ? `0 0 10px ${item.theme.accentHex}` : "none"
          }}
        />
      </div>

      <div className="flex flex-col">
        <span
          className={cn(
            "text-xs md:text-sm font-medium transition-colors duration-300 font-heading",
            isActive ? "text-white" : "text-zinc-500"
          )}
        >
          {item.title}
        </span>
        {isActive && (
          <motion.span
            initial={{ opacity: 0, y: -2 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-mono tracking-tighter transition-colors"
            style={{ color: item.theme.accentHex }}
          >
            {item.tagline}
          </motion.span>
        )}
      </div>

      {isActive && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ml-auto"
        >
          <ArrowUpRight size={14} style={{ color: item.theme.accentHex }} />
        </motion.div>
      )}
    </button>
  );
};
