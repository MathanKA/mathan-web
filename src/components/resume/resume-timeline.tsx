"use client";

import { motion, useReducedMotion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { ResumeData } from "@/data/resume";
import { GitCommit, ExternalLink, Calendar, MapPin } from "lucide-react";

interface ResumeTimelineProps {
  data: ResumeData;
}

export function ResumeTimeline({ data }: ResumeTimelineProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="space-y-12">
      {/* Summary / Mission */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400/50 to-fuchsia-500/50 bg-clip-text text-transparent">
          Summary
        </h2>
        <div className="space-y-4 text-foreground/60 leading-relaxed">
          <ul className="list-disc ml-4 text-md mt-1">
            {data.summary.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Professional Experience */}
      <section className="space-y-8 relative">
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400/50 to-fuchsia-500/50 bg-clip-text text-transparent mb-8">
          Professional Experience
        </h2>

        {/* Timeline Circuit Line */}
        <div className="absolute left-4 top-24 bottom-0 w-px bg-gradient-to-b from-brand-primary/50 via-brand-secondary/30 to-transparent hidden md:block" />

        <div className="space-y-10">
          {data.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={
                shouldReduceMotion ? { duration: 0.1 } : { delay: idx * 0.1 }
              }
              className="relative md:pl-12 group"
            >
              {/* Timeline Node */}
              <div className="absolute left-3.5 md:left-4 top-4 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-primary ring-4 ring-brand-primary/20 z-10 hidden md:block" />

              <div className="bg-black/20 backdrop-blur-xl border border-white/5 rounded-2xl p-6 hover:border-brand-primary/5 transition-all group-hover:shadow-[0_0_30px_-10px_rgba(17,221,119,0.05)]">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground transition-colors flex items-center gap-2">
                      {exp.company}
                    </h3>
                    <p className="text-lg font-medium text-foreground/60">
                      {exp.role}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-white/50 font-sans">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.dates}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </div>
                  </div>
                </div>

                {exp.highlights && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.highlights.map((h, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-[10px] tracking-wider bg-white/5 border border-white/10 text-white/70"
                      >
                        {h}
                      </Badge>
                    ))}
                  </div>
                )}

                <ul className="space-y-3">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex gap-4 text-sm text-white/70 leading-relaxed"
                    >
                      <GitCommit className="w-4 h-4 mt-1 text-brand-primary/40 shrink-0" />
                      <span>{highlightMetrics(bullet)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Experience (Accordion) */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-white/40 uppercase tracking-[0.2em]">
          Additional Experience
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {data.additionalExperience.map((exp, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-white/10 px-4"
            >
              <AccordionTrigger className="hover:no-underline py-4">
                <div className="flex justify-between items-center w-full pr-4 text-left">
                  <div>
                    <p className="font-bold text-white/80">{exp.company}</p>
                    <p className="text-xs text-foreground/60">{exp.role}</p>
                  </div>
                  <span className="text-[10px] font-sans text-white/40">
                    {exp.dates}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-white/60 text-sm pb-4">
                <ul className="space-y-2">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-1.5 h-px bg-brand-primary/30 mt-2.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Projects */}
      {/* <section className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-fuchsia-500 bg-clip-text text-transparent">
          Module Repository (Projects)
        </h2>
        <div className="grid grid-cols-1 gap-6">
          {data.projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-brand-secondary/30 transition-all"
            >
              <div className="flex justify-between items-start gap-4 mb-2">
                <h3 className="text-xl font-bold text-white">
                  {project.title}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-brand-primary"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
              <p className="text-brand-secondary/80 text-sm font-medium mb-4">
                {project.role}
              </p>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-1 rounded bg-black/40 border border-white/5 text-white/40 font-sans"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Achievements */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight text-white/40 uppercase tracking-[0.2em]">
          Achievements & Rewards
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.achievements.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="w-2 h-2 rounded-full bg-brand-secondary mt-1.5 shrink-0 shadow-[0_0_10px_rgba(136,0,136,0.5)]" />
              <p className="text-sm text-white/70">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function highlightMetrics(text: string) {
  // Simple regex to find percentages or numbers that look like metrics (e.g., 40%, 90+, 10x)
  const parts = text.split(/(\d+%\+?|\d+x|\d+\s?ms|\d+\s?MB|\d+\s?kB)/g);
  return parts.map((part, i) => {
    if (part.match(/(\d+%\+?|\d+x|\d+\s?ms|\d+\s?MB|\d+\s?kB)/)) {
      return (
        <strong key={i} className="font-semibold">
          {part}
        </strong>
      );
    }
    return part;
  });
}
