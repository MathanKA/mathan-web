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
 * Updated to align with the "Unified Iridescent" Theme Palette.
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
  // We now use CSS variables for colors to ensure theme consistency
  colorVar: string;
};

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    id: "quansentz",
    title: "Senior Full-Stack Engineer & Founder",
    company: "Quansentz",
    from: "Sep 2025",
    to: "Present",
    type: "Remote",
    location: "Global",
    description:
      "Building a privacy-first consent and DSAR platform. Implemented domain-based multi-tenant isolation, RBAC-backed flows, hash-chained audit events, and a Redis worker plus S3 streaming pipeline for large encrypted exports. Set up Docker + Vercel CI/CD and authored core product specs for a v1.0 pilot.",
    tech: [
      "Next.js",
      "TypeScript",
      "Postgres",
      "Prisma",
      "RBAC",
      "Redis",
      "S3"
    ],
    colorVar: "var(--color-brand-primary)"
  },
  {
    id: "softzane",
    title: "Senior Software Tutor (Full-Stack, MERN)",
    company: "Softzane Solutions",
    from: "May 2024",
    to: "Jan 2025",
    type: "Remote",
    location: "Global",
    description:
      "Delivered instructor-led MERN training and mentored students through code reviews, debugging support, and structured feedback on assignments and mini-projects, reinforcing clean coding and web development best practices.",
    tech: ["MERN", "Mentoring", "Code Reviews", "Teaching"],
    colorVar: "var(--color-brand-secondary)"
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
      "Led frontend delivery for threat intelligence and security platforms, collaborating with the CTO for high-stakes demos and shipping the initial CERT-In release. Revamped cyware.com for faster rendering and stability, supported VPAT-driven accessibility remediation, and modernized legacy dashboard code with Vue 3 + Vite using route-level splitting and chunking to reduce initial JS payload.",
    tech: [
      "Vue.js",
      "Nuxt.js",
      "Angular",
      "Vite",
      "Performance",
      "Accessibility"
    ],
    colorVar: "var(--color-brand-accent)"
  },
  {
    id: "sellerapp",
    title: "Software Lead, Web Development",
    company: "SellerApp",
    from: "Feb 2017",
    to: "Sep 2017",
    type: "On-site",
    location: "Bengaluru, India",
    description:
      "Sole developer for the early-stage web product and marketing site. Built core dashboards and campaign visibility features using AngularJS, Jade, and CoffeeScript, translating founder requirements into production-ready UI under rapid iteration cycles.",
    tech: ["AngularJS", "CoffeeScript", "Jade", "Dashboards"],
    colorVar: "var(--color-brand-secondary)"
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
      "Delivered end-to-end client websites from requirements through deployment and maintenance. Provided client support and content updates, and was promoted to lead and train interns for brand promotion and development work.",
    tech: ["HTML", "CSS", "JavaScript", "Client Delivery", "Team Lead"],
    colorVar: "var(--color-brand-accent)"
  }
];

/**
 * PHASE 6.1 - ScrollProgressTrace
 * UPDATED: Uses the Hero's Emerald -> Purple gradient.
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
      <div className="absolute inset-0 bg-white/5" />
      {/* Fill beam - "The Iridescent Signal" */}
      <motion.div
        style={{ scaleY }}
        className="absolute inset-0 bg-gradient-to-b from-[var(--color-brand-primary)] via-[var(--color-brand-secondary)] to-[var(--color-brand-accent)] origin-top shadow-[0_0_15px_rgba(16,185,129,0.4)]"
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
                      `0 0 0px ${item.colorVar}`,
                      `0 0 20px ${item.colorVar}`,
                      `0 0 0px ${item.colorVar}`
                    ]
                  }
                : isActive
                  ? { boxShadow: `0 0 20px ${item.colorVar}` }
                  : { boxShadow: "0 0 0px rgba(0,0,0,0)" }
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
              borderColor: isActive ? item.colorVar : undefined,
              backgroundColor: isActive ? item.colorVar : undefined
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
            // Glass Card Style matching globals.css
            "bg-black/20 backdrop-blur-xl border-white/10",
            "shadow-2xl",
            isActive && "border-white/20 ring-1 ring-white/5"
          )}
        >
          {/* Connector wire */}
          <div className="absolute top-14 -left-10 w-10 h-px bg-gradient-to-r from-white/20 to-transparent hidden md:block" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
            <div>
              <span className="font-sans text-[10px] tracking-[0.2em] text-zinc-500 uppercase block mb-1">
                {"// "}
                {item.from.replace(" ", "_").toUpperCase()} —{" "}
                {item.to.replace(" ", "_").toUpperCase()}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight  transition-colors duration-300">
                {item.title}
              </h3>
              <div
                className="font-medium mt-1"
                style={{ color: item.colorVar }}
              >
                {item.company}
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="text-[10px] font-sans text-zinc-500 tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10">
                {item.type}
              </span>
              <span className="text-xs text-zinc-400 mt-2 md:mt-1">
                {item.location}
              </span>
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
                className="px-2 py-0.5 rounded text-[10px] font-sans bg-white/5 text-zinc-300 border border-white/5 tracking-wide transition-colors"
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
      className="relative w-full bg-transparent pt-24 sm:py-32 md:pt-36 overflow-hidden"
    >
      {/* Background decoration consistent with other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
          <div className="col-span-12">
            <span className="text-[10px] md:text-xs font-sans tracking-[0.4em] text-[var(--color-brand-primary)] uppercase block mb-4 opacity-80">
              Professional Journey
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight font-heading mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-2xl pr-1">
                Experience
              </span>{" "}
            </h2>
            <p className="text-foreground/70 text-lg leading-relaxed max-w-2xl font-body">
              A timeline of engineering leadership and product development
              across high growth startups and enterprise teams.
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
