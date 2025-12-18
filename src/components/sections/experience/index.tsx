"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * PHASE 4 - Experience Data
 */
export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  from: string;
  to: string;
  type: string;
  location: string;
  description: string;
  tech: string[];
  colorHex: string;
  colorRgb: string;
};

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "quansentz",
    title: "Founder & Architect",
    company: "Quansentz",
    from: "Sep 2025",
    to: "Present",
    type: "Remote",
    location: "Global",
    description:
      "Defining the technical roadmap for a privacy-first SaaS. Architecting multi-tenant systems and authoring core product specifications (PRDs) for a v1.0 pilot launch.",
    tech: ["Next.js", "Prisma", "Architecture"],
    colorHex: "#333eee",
    colorRgb: "51 62 238"
  },
  {
    id: "softzane",
    title: "Senior Software Tutor",
    company: "Softzane",
    from: "May 2024",
    to: "Jan 2025",
    type: "Remote",
    location: "Global",
    description:
      "Mentored students on MERN stack architecture and clean code practices. Translated complex engineering concepts into structured learning paths.",
    tech: ["Mentorship", "Communication"],
    colorHex: "#fbbf24",
    colorRgb: "251 191 36"
  },
  {
    id: "cyware",
    title: "Senior Software Engineer II",
    company: "Cyware",
    from: "Nov 2017",
    to: "Mar 2024",
    type: "Hybrid",
    location: "Bengaluru, India",
    description:
      "Owned the frontend for India's national CERT platform. Collaborated directly with the CTO to deliver high-stakes demos and mentored junior developers across teams.",
    tech: ["Vue.js", "Performance", "Leadership"],
    colorHex: "#880088",
    colorRgb: "136 0 136"
  },
  {
    id: "sellerapp",
    title: "Software Lead",
    company: "SellerApp",
    from: "Feb 2017",
    to: "Sep 2017",
    type: "On-site",
    location: "Bengaluru, India",
    description:
      "Sole developer responsible for building the early-stage web product. Translated founder requirements into production UI for the platform's initial growth phase.",
    tech: ["Angular", "Zero-to-One"],
    colorHex: "#10b981",
    colorRgb: "16 185 129"
  },
  {
    id: "blue-web",
    title: "UI Developer",
    company: "Blue Web Solutions",
    from: "Oct 2014",
    to: "Nov 2016",
    type: "On-site",
    location: "Coimbatore, India",
    description:
      "Developed customized client websites and led a team of interns for brand promotion and development tasks.",
    tech: ["HTML/CSS", "Team Lead"],
    colorHex: "#3b82f6",
    colorRgb: "59 130 246"
  }
];

/**
 * PHASE 6.1 - ScrollProgressTrace
 */
const ScrollProgressTrace = ({
  sectionRef
}: {
  sectionRef: React.RefObject<HTMLElement | null>;
}) => {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px]">
      {/* Base trace line */}
      <div className="absolute inset-0 bg-white/10" />
      {/* Fill beam */}
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-400 origin-top shadow-[0_0_8px_rgba(99,102,241,0.5)]"
      />
    </div>
  );
};

/**
 * PHASE 7 - TimelineItem
 */
interface TimelineItemProps {
  item: ExperienceItem;
  isActive: boolean;
  onInView: (id: string) => void;
}

const TimelineItem = ({ item, isActive, onInView }: TimelineItemProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const isInView = useInView(sentinelRef, {
    margin: "-30% 0px -60% 0px"
  });

  useEffect(() => {
    if (isInView) {
      onInView(item.id);
    }
  }, [isInView, item.id, onInView]);

  return (
    <div className="relative grid grid-cols-12 gap-6 md:gap-10 pb-16 last:pb-0">
      {/* Sentinel for active detection */}
      <div
        ref={sentinelRef}
        className="absolute left-0 top-12 h-px w-px pointer-events-none"
      />

      {/* Left Trace column */}
      <div className="col-span-2 relative flex justify-center">
        <div className="relative z-10 mt-12">
          {/* Node */}
          <motion.div
            animate={
              !shouldReduceMotion && isActive
                ? {
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      `0 0 0px rgba(${item.colorRgb}, 0)`,
                      `0 0 20px rgba(${item.colorRgb}, 0.6)`,
                      `0 0 0px rgba(${item.colorRgb}, 0)`
                    ]
                  }
                : isActive
                  ? { boxShadow: `0 0 20px rgba(${item.colorRgb}, 0.55)` }
                  : { boxShadow: "0 0 0px rgba(255, 255, 255, 0)" }
            }
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={cn(
              "w-4 h-4 rounded-full border-2 transition-colors duration-500",
              isActive ? "bg-white border-white" : "bg-zinc-900 border-white/20"
            )}
            style={{
              borderColor: isActive ? `rgb(${item.colorRgb})` : undefined,
              backgroundColor: isActive ? `rgb(${item.colorRgb})` : undefined
            }}
          />
        </div>
      </div>

      {/* Right Content Column */}
      <div className="col-span-10">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={cn(
            "relative group p-6 rounded-2xl border transition-all duration-500",
            "bg-zinc-900/50 backdrop-blur-xl border-white/10",
            "shadow-[0_0_0_1px_rgba(255,255,255,0.06),_0_20px_60px_-20px_rgba(0,0,0,0.8)]",
            isActive && "border-white/20 ring-1 ring-white/10"
          )}
        >
          {/* Connector wire */}
          <div className="absolute top-14 -left-10 w-10 h-px bg-gradient-to-r from-white/20 to-transparent hidden md:block" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1">
                {"// "}
                {item.from.replace(" ", "_").toUpperCase()} —{" "}
                {item.to.replace(" ", "_").toUpperCase()}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {item.title}
              </h3>
              <div className="text-indigo-400 font-medium">{item.company}</div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10">
                {item.type}
              </span>
              <span className="text-xs text-zinc-400">{item.location}</span>
            </div>
          </div>

          <p className="text-zinc-400 leading-relaxed max-w-2xl mb-6 font-body">
            {item.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-1 rounded text-[10px] font-mono bg-white/5 text-zinc-300 border border-white/5 uppercase tracking-tighter"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState(EXPERIENCE_DATA[0].id);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-[#050505] py-24 sm:py-32 overflow-hidden"
    >
      {/* Background decoration consistent with other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="col-span-12">
            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] text-zinc-500 uppercase block mb-4">
              Professional Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight font-heading mb-4">
              Experience
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl font-body">
              A timeline of engineering leadership, architecture, and product
              development across high-growth startups and enterprises.
            </p>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Trace Line */}
          <div className="absolute left-[8.333333%] md:left-[8.333333%] h-full">
            {/* col-span-2 center is at 1/12 of the total 12 cols, which is 8.33% */}
            <ScrollProgressTrace sectionRef={sectionRef} />
          </div>

          <div className="space-y-0">
            {EXPERIENCE_DATA.map((item) => (
              <TimelineItem
                key={item.id}
                item={item}
                isActive={activeId === item.id}
                onInView={setActiveId}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
