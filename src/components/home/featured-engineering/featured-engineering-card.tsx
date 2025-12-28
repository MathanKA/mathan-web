"use client";

import React, { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion
} from "motion/react";
import { FeaturedEngineeringItem } from "./featured-engineering-data";
import { CodeOverlay } from "./code-overlay";
import { cn } from "@/lib/utils";

interface FeaturedEngineeringCardProps {
  item: FeaturedEngineeringItem;
  isActive: boolean;
}

export const FeaturedEngineeringCard: React.FC<
  FeaturedEngineeringCardProps
> = ({ item, isActive }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax for code overlay
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isReducedMotion ? [0, 0] : [40, -40]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    isReducedMotion ? [1, 1, 1, 1] : [0.95, 1, 1, 0.95]
  );

  return (
    <motion.div
      ref={cardRef}
      id={item.id}
      style={{ opacity, scale }}
      className={cn(
        "relative w-full min-h-[500px] md:min-h-[400px] rounded-3xl overflow-hidden transition-all duration-700",
        // Unified Iridescent Standard: Ghost Glass
        "bg-black/20 backdrop-blur-sm border border-white/10",
        "shadow-[0_0_0_1px_rgba(255,255,255,0.06),_0_40px_80px_-20px_rgba(0,0,0,0.8)]",
        // Gradient Top Sheen
        "before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-b before:from-white/5 before:to-transparent before:opacity-40 before:pointer-events-none",
        isActive
          ? "border-white/20 ring-1 ring-white/10"
          : "opacity-60 grayscale-[0.5]"
      )}
    >
      {/* Dynamic Ambient Glow (Unified) */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgb(${item.theme.accentRgb} / 0.2), transparent 70%)`
        }}
      />

      <div className="relative h-full flex flex-col p-4 md:p-6 justify-between">
        {/* Mobile Info (Visible on small screens) */}
        <div className="md:hidden mb-8">
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-sans tracking-tighter uppercase mb-2"
            style={{
              backgroundColor: `rgb(${item.theme.accentRgb} / 0.1)`,
              color: item.theme.accentHex,
              border: `1px solid rgb(${item.theme.accentRgb} / 0.2)`
            }}
          >
            {item.title}
          </span>
          <h3 className="text-2xl font-bold text-white mb-2 font-heading">
            {item.tagline}
          </h3>
          <p className="text-zinc-400 text-sm mb-4 font-body">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {item.stack.map((tag) => (
              <span
                key={tag}
                className="text-[10px] text-zinc-500 border border-white/10 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visual Stage */}
        <div className="flex-grow flex items-center justify-center relative">
          {item.visual.kind === "image" && item.visual.imageSrc && (
            <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg group">
              <Image
                src={item.visual.imageSrc}
                alt={item.visual.imageAlt || item.title}
                fill
                className="object-fill transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/1200x675/050505/333333?text=Quansentz+Dashboard";
                }}
              />
              {/* Image Overlay Tint */}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
          )}

          {item.visual.kind === "speedometer" && (
            <div className="w-48 h-48 md:w-64 md:h-64 relative flex items-center justify-center">
              {/* SVG Speedometer */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full transform -rotate-90"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-white/5"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={isActive ? item.theme.accentHex : "currentColor"}
                  strokeWidth="2"
                  strokeDasharray="283"
                  initial={{ strokeDashoffset: 283 }}
                  animate={{ strokeDashoffset: isActive ? 70 : 140 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className={cn(!isActive && "text-white/10")}
                  style={{
                    filter: isActive
                      ? `drop-shadow(0 0 8px ${item.theme.accentHex})`
                      : "none"
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-90">
                <span className="text-4xl md:text-6xl font-bold text-white">
                  40
                </span>
                <span className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest">
                  ms TTL
                </span>
              </div>
            </div>
          )}

          {item.visual.kind === "phone-frame" && (
            <div className="w-48 h-[400px] border-[6px] border-zinc-800 rounded-[2.5rem] bg-zinc-950 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-800 rounded-b-xl z-20" />
              <div className="p-4 space-y-4 pt-10">
                <div className="h-2 w-2/3 bg-zinc-800 rounded" />
                <div className="grid grid-cols-2 gap-2">
                  <div
                    className="h-20 rounded-lg border opacity-50"
                    style={{
                      backgroundColor: `rgb(${item.theme.accentRgb} / 0.1)`,
                      borderColor: `rgb(${item.theme.accentRgb} / 0.2)`
                    }}
                  />
                  <div
                    className="h-20 rounded-lg border opacity-50"
                    style={{
                      backgroundColor: `rgb(${item.theme.accentRgb} / 0.1)`,
                      borderColor: `rgb(${item.theme.accentRgb} / 0.2)`
                    }}
                  />
                </div>
                <div className="h-32 bg-zinc-900 rounded-lg border border-white/5" />
                <div className="h-12 bg-zinc-900 rounded-lg border border-white/5" />
              </div>
            </div>
          )}

          {/* Code Overlay */}
          {item.codeOverlay && (
            <motion.div
              style={{ y }}
              className="absolute -right-4 -bottom-4 md:-right-5 md:-bottom-6 w-[240px] md:w-[450px] z-20 pointer-events-none md:pointer-events-auto"
            >
              <CodeOverlay
                title={item.codeOverlay.title}
                languageLabel={item.codeOverlay.languageLabel}
                code={item.codeOverlay.code}
              />
            </motion.div>
          )}
        </div>

        {/* Stats / Footer context inside card */}
        <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
          <div className="text-xs md:text-sm font-mono text-zinc-500">
            {`// ${item.keyStat}`}
          </div>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                isActive ? "bg-white" : "bg-white/20"
              )}
              style={{
                backgroundColor: isActive ? item.theme.accentHex : undefined,
                boxShadow: isActive
                  ? `0 0 10px ${item.theme.accentHex}`
                  : "none"
              }}
            />
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
