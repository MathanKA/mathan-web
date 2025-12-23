"use client";

import { Download, Mail } from "lucide-react";

interface ActionPillProps {
  onClick?: () => void;
}

export function ActionPill({ onClick }: ActionPillProps) {
  return (
    <div className="flex items-center p-1 bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-full border border-black/5 dark:border-white/10">
      {/* Resume Button */}
      <a
        href="/MATHANKA_resume_.pdf"
        download
        aria-label="Download Resume"
        onClick={onClick}
        className="relative group flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 outline-none"
      >
        <span className="absolute inset-0 bg-white/50 dark:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <Download size={16} className="relative z-10" />
        <span className="relative z-10">Resume</span>
      </a>

      {/* Separator */}
      <div className="w-px h-4 bg-black/10 dark:bg-white/10 mx-1" />

      {/* Email Button */}
      <a
        href="mailto:hello@mathan.pro"
        aria-label="Send Email"
        onClick={onClick}
        className="relative group flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors duration-200 outline-none"
      >
        <span className="absolute inset-0 bg-white/50 dark:bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        <Mail size={16} className="relative z-10" />
        <span className="relative z-10">Email</span>
      </a>
    </div>
  );
}
