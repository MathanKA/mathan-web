"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Github, Linkedin, Mail, ArrowRight } from "lucide-react";
import { FooterCTA } from "./footer/footer-cta";
import { TelemetryLog } from "./footer/telemetry-log";

const NAV_INDEX = [
  { name: "Home", href: "/" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Resume", href: "/resume" },
  { name: "Uses", href: "/uses" }
];

const SOCIAL_LINKS = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mathanka",
    icon: Linkedin,
    label: "LinkedIn"
  },
  {
    name: "GitHub",
    href: "https://github.com/MathanKA",
    icon: Github,
    label: "GitHub"
  },
  {
    name: "Email",
    href: "mailto:hello@mathan.pro",
    icon: Mail,
    label: "Email"
  }
];

export function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <footer
      role="contentinfo"
      className="w-full bg-black/40 backdrop-blur-xl border-t border-white/10 pt-24 pb-8 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-12 gap-y-20"
        >
          {/* Zone A: The Big Ask (Refactored) */}
          <FooterCTA />

          {/* Zone B: The Command Center (Data Grid) */}
          <div className="col-span-12 grid grid-cols-12 gap-8 md:gap-4 border-t border-white/5 pt-16">
            {/* Column A: Identity & Status [Cols 1-3] */}
            <div className="col-span-12 md:col-span-3 space-y-6">
              <div className="flex items-center gap-3 group">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-white/10 bg-zinc-900 flex items-center justify-center p-1.5 grayscale-90 transition-all group-hover:grayscale-0">
                  <Image
                    src="/images/mathan.svg"
                    alt="M Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <span className="text-sm font-bold uppercase tracking-widest bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-2xl">
                  Mathan K A
                </span>
              </div>

              <div className="flex items-center gap-2 group cursor-default">
                <div className="relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] animate-pulse animate-status-pulse" />
                  <div className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] animate-ping opacity-40" />
                </div>
                <span className="text-xs text-zinc-400 font-medium tracking-widest   group-hover:text-white transition-colors duration-300">
                  Open to Opportunities
                </span>
              </div>
            </div>

            {/* Column B: The Unified Telemetry Stream [Cols 4-7] */}
            <div className="col-span-12 md:col-span-4 md:border-l md:border-white/5 md:pl-8 space-y-4">
              <div className="font-sans text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
                {"// Dev ACTIVITY"}
              </div>
              <TelemetryLog />
            </div>

            {/* Column C: Navigation Index [Cols 8-10] */}
            <div className="col-span-6 md:col-span-3 md:border-l md:border-white/5 md:pl-8 space-y-4">
              <div className="font-sans text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
                {"// INDEX"}
              </div>
              <ul className="space-y-2">
                {NAV_INDEX.map((link) => (
                  <li key={link.name} className="group flex items-center gap-2">
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                    <ArrowRight className="w-3 h-3 text-[var(--color-brand-primary)] -ml-5 opacity-0 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                  </li>
                ))}
              </ul>
            </div>

            {/* Column D: Network [Cols 11-12] */}
            <div className="col-span-6 md:col-span-2 md:border-l md:border-white/5 md:pl-8 space-y-4">
              <div className="font-sans text-[10px] text-zinc-600 uppercase tracking-[0.2em]">
                {"// CONNECT"}
              </div>
              <div className="flex flex-wrap gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="p-2 rounded-md bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 hover:scale-110 transition-all duration-300 group"
                  >
                    <social.icon className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar (Copyright) */}
          <div className="col-span-12 pt-12 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
              <p className="font-sans text-[10px] text-zinc-600 tracking-wide">
                &copy; 2025 Mathan K A &middot; All Rights Reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
