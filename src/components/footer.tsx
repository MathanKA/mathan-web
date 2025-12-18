"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Copy,
  Check,
  ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/#work" },
  { name: "Experience", href: "/#experience" },
  { name: "About", href: "/#about" }
];

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    href: "https://github.com/MathanKA",
    icon: Github,
    label: "GitHub (opens in a new tab)"
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/mathanka",
    icon: Linkedin,
    label: "LinkedIn (opens in a new tab)"
  }
];

export function Footer() {
  const shouldReduceMotion = useReducedMotion();
  const [isCopied, setIsCopied] = useState(false);
  const email = "hello@mathan.pro";

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
      toast.error("Failed to copy email.");
    }
  }, [email]);

  const containerVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    whileInView: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    whileInView: { opacity: 1, y: 0 }
  };

  return (
    <footer
      role="contentinfo"
      className="w-full bg-transparent border-t border-white/10 pt-20 pb-10"
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-12 gap-y-16"
        >
          {/* Zone A: Big Ask */}
          <div className="col-span-12 flex flex-col items-center text-center space-y-8">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-sans font-bold tracking-tight text-white"
            >
              Ready to engineer the future?
            </motion.h2>

            <motion.div variants={itemVariants} className="group relative">
              {/* Tooltip */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900 border border-white/10 rounded text-[10px] font-mono uppercase tracking-wider text-foreground opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none mb-2 z-10">
                {isCopied ? "Copied!" : "Copy to clipboard"}
              </div>

              <button
                type="button"
                onClick={copyToClipboard}
                onKeyDown={(e) => e.key === "Enter" && copyToClipboard()}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300",
                  "backdrop-blur-2xl bg-zinc-900/50 border border-white/10",
                  "hover:border-white/20 hover:bg-zinc-800/50 focus-visible:ring-2 focus-visible:ring-white/30 outline-none",
                  "group/btn text-lg md:text-xl font-mono text-zinc-300 hover:text-white"
                )}
                aria-label={`Copy email address: ${email}`}
              >
                <span>{email}</span>
                {isCopied ? (
                  <Check className="w-5 h-5 text-green-400 shrink-0" />
                ) : (
                  <Copy className="w-5 h-5 group-hover/btn:scale-110 transition-transform shrink-0" />
                )}
              </button>

              <div className="mt-4">
                <a
                  href={`mailto:${email}`}
                  className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-brand-accent transition-colors"
                >
                  Or email me directly
                </a>
              </div>
            </motion.div>
          </div>

          {/* Zone B: Data Grid */}
          <div className="col-span-12 grid grid-cols-12 gap-8 border-t border-white/5 pt-16">
            {/* Column 1: Identity */}
            <div className="col-span-12 md:col-span-3 space-y-4">
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-white tracking-widest text-sm uppercase">
                  MATHAN K A
                </h3>
                <p className="text-zinc-500 text-sm">
                  Senior Full-Stack Engineer
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full bg-green-500 animate-status-pulse"
                  aria-hidden="true"
                />
                <span className="text-[10px] font-mono uppercase tracking-tighter text-zinc-400">
                  Open to Opportunities
                </span>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="col-span-12 md:col-span-3">
              <nav aria-label="Footer">
                <ul className="space-y-3">
                  {NAV_LINKS.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="font-mono text-sm text-zinc-400 hover:text-brand-accent transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Connect */}
            <div className="col-span-12 md:col-span-3 space-y-6">
              <div className="flex gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="group/social"
                  >
                    <div className="p-2 rounded-lg bg-zinc-900/50 border border-white/5 group-hover/social:border-white/20 group-hover/social:bg-white/5 transition-all duration-200 group-hover/social:scale-110 group-hover/social:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <social.icon className="w-5 h-5 text-zinc-400 group-hover/social:text-white transition-colors" />
                    </div>
                  </a>
                ))}
                <a
                  href={`mailto:${email}`}
                  aria-label="Email Mathan"
                  className="group/social"
                >
                  <div className="p-2 rounded-lg bg-zinc-900/50 border border-white/5 group-hover/social:border-white/20 group-hover/social:bg-white/5 transition-all duration-200 group-hover/social:scale-110 group-hover/social:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Mail className="w-5 h-5 text-zinc-400 group-hover/social:text-white transition-colors" />
                  </div>
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500">
                <span className="text-sm font-mono tracking-tight">
                  Bengaluru, India
                </span>
              </div>
            </div>

            {/* Column 4: Colophon */}
            <div className="col-span-12 md:col-span-3 space-y-4 text-right md:text-left">
              <p className="text-xs font-mono text-zinc-500 leading-relaxed uppercase tracking-tighter">
                Built with Next.js 16, React 19 & Tailwind 4.
              </p>
              <p className="text-xs font-mono text-zinc-600 uppercase tracking-tighter">
                © 2025 Mathan.pro. All rights reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
