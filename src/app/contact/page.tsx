"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  Calendar,
  ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CAL_URL = "https://cal.com/mathanka";
const LI_URL = "https://linkedin.com/in/mathanka";
const GH_URL = "https://github.com/MathanKA";
const EMAIL = "hello@mathan.pro";

export default function ContactPage() {
  const [isCopied, setIsCopied] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(EMAIL);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = EMAIL;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      toast.success("Email copied!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
      toast.error("Failed to copy email");
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050505] selection:bg-emerald-500/30 overflow-hidden flex flex-col justify-center py-20 px-4 md:px-0">
      {/* Visual Concept + Background (Phase 3) */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/10 blur-[120px] pointer-events-none -z-10"
        aria-hidden="true"
      />
      <div
        className="fixed bottom-0 right-0 w-[500px] h-[400px] bg-purple-500/5 blur-[100px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      {/* Noise Overlay (matches global layout) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay"
        aria-hidden="true"
      />

      <main className="relative z-10 w-full">
        <section aria-labelledby="contact-title" className="container mx-auto">
          <div className="grid grid-cols-12 gap-4">
            {/* The Glass Card (Phase 4) */}
            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={cn(
                "col-span-12 md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4",
                "bg-black/20 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12",
                "ring-1 ring-white/10 shadow-[0_20px_80px_-30px_rgba(0,0,0,0.9)]"
              )}
            >
              <div className="flex flex-col space-y-8">
                {/* Heading (Phase 5.1) */}
                <div className="space-y-3">
                  <h1
                    id="contact-title"
                    className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white"
                  >
                    Ready to Collaborate?
                  </h1>
                  {/* Subtext (Phase 5.2) */}
                  <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-md">
                    I am currently open for architectural consulting and senior
                    engineering roles.
                  </p>
                </div>

                {/* Primary Action — Massive Email Display (Phase 5.3) */}
                <div className="relative pt-4">
                  <button
                    onClick={copyToClipboard}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        copyToClipboard();
                      }
                    }}
                    className="group relative flex flex-col items-start focus:outline-none"
                    aria-label="Copy email address"
                  >
                    <span
                      className={cn(
                        "text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight transition-all duration-300",
                        "bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent",
                        "group-hover:opacity-80 active:scale-[0.98]"
                      )}
                    >
                      {EMAIL}
                    </span>

                    {/* Hover indicator */}
                    <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-emerald-400/50 to-purple-400/50 transition-all duration-500 mt-1" />

                    {/* Tooltip Feedback (Phase 6) */}
                    <AnimatePresence mode="wait">
                      {isCopied && (
                        <motion.div
                          key="copied-tooltip"
                          initial={
                            shouldReduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, y: 6 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          className="absolute -top-10 right-0 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-lg backdrop-blur-md"
                        >
                          <span className="text-emerald-400 text-xs font-medium flex items-center gap-1.5 line-clamp-1">
                            <Check className="w-3.5 h-3.5" />
                            Copied to clipboard
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Screen Reader Feedback (Phase 7) */}
                    <span className="sr-only" aria-live="polite">
                      {isCopied ? "Email copied to clipboard" : ""}
                    </span>
                  </button>
                </div>

                {/* Secondary Actions (Phase 5.4) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6">
                  {/* Book a Call */}
                  <Link
                    href={CAL_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300",
                      "bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-white/20",
                      "hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.25)] hover:-translate-y-1"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                        Book a Call
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                  </Link>

                  {/* LinkedIn */}
                  <Link
                    href={LI_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300",
                      "bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-white/20",
                      "hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.25)] hover:-translate-y-1"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                        LinkedIn
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-blue-400 transition-colors" />
                  </Link>

                  {/* GitHub */}
                  <Link
                    href={GH_URL}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={cn(
                      "group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300",
                      "bg-zinc-900/40 backdrop-blur-xl border border-white/10 hover:border-white/20",
                      "hover:shadow-[0_0_30px_-10px_rgba(99,102,241,0.25)] hover:-translate-y-1"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-zinc-500/10 text-zinc-400">
                        <Github className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-zinc-300 group-hover:text-white">
                        GitHub
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400 transition-colors" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
