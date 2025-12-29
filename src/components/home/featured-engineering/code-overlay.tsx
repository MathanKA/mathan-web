"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CodeOverlayProps {
  title: string;
  languageLabel: string;
  code: string;
  className?: string;
}

export const CodeOverlay: React.FC<CodeOverlayProps> = ({
  title,
  languageLabel,
  code,
  className
}) => {
  return (
    <div
      className={cn(
        "rounded-xl overflow-hidden bg-[#0d1117] border border-white/10 shadow-2xl flex flex-col min-h-0 font-sans text-[10px] md:text-xs",
        className
      )}
    >
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-bottom border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="text-zinc-500 text-[10px] md:text-xs select-none">
          {title}
        </div>
        <div className="text-zinc-600 text-[10px] md:text-xs select-none uppercase tracking-wider">
          {languageLabel}
        </div>
      </div>

      {/* Code Content */}
      <div className="p-4 overflow-auto scrollbar-hide flex-1 min-h-0">
        <pre className="text-zinc-300 leading-relaxed font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};
