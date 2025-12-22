"use client";

import { Mail, Github, Linkedin, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResumeData } from "@/data/resume";
import { motion, useReducedMotion } from "motion/react";

interface ResumeSidebarProps {
  data: ResumeData;
}

export function ResumeSidebar({ data }: ResumeSidebarProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="flex flex-col gap-8">
      {/* Profile Section */}
      <section className="space-y-4">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-brand-primary via-white to-brand-secondary bg-clip-text text-transparent">
              {data.header.name}
            </span>
          </h1>
          <p className="text-lg font-medium text-muted-foreground mt-2">
            {data.header.titleLine.split("|")[0].trim()}
          </p>
          <p className="text-sm text-muted-foreground/80 mt-1 uppercase tracking-widest font-sans">
            {data.header.location}
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 gap-2 pt-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="justify-start bg-white/5 border-white/10 hover:bg-white/10 h-10"
          >
            <a href={`mailto:${data.header.email}`}>
              <Mail className="w-4 h-4 mr-3 text-brand-primary" />
              <span className="text-xs truncate">{data.header.email}</span>
            </a>
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="justify-start bg-white/5 border-white/10 hover:bg-white/10 h-10"
          >
            <a href={`tel:${data.header.phone}`}>
              <Phone className="w-4 h-4 mr-3 text-brand-primary" />
              <span className="text-xs">{data.header.phone}</span>
            </a>
          </Button>
          {data.header.links.map((link) => (
            <Button
              key={link.label}
              variant="outline"
              size="sm"
              asChild
              className="justify-start bg-white/5 border-white/10 hover:bg-white/10 h-10"
            >
              <a href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label.includes("github") ? (
                  <Github className="w-4 h-4 mr-3 text-brand-primary" />
                ) : link.label.includes("linkedin") ? (
                  <Linkedin className="w-4 h-4 mr-3 text-brand-primary" />
                ) : (
                  <ExternalLink className="w-4 h-4 mr-3 text-brand-primary" />
                )}
                <span className="text-xs truncate">{link.label}</span>
              </a>
            </Button>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="space-y-6">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">
          Technical Specs
        </h2>
        <div className="space-y-4">
          {data.skills.map((group) => (
            <div key={group.category} className="space-y-2">
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-wider pl-1">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-medium text-white/70 hover:text-white hover:border-white/20 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-white/40">
          Training & Certs
        </h2>
        <div className="space-y-3">
          {data.education.map((edu, i) => (
            <div key={i} className="text-sm">
              <p className="font-semibold text-white/90">{edu.school}</p>
              <p className="text-white/60 text-xs">{edu.degree}</p>
              <p className="text-white/40 text-[10px] mt-1">{edu.dates}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
