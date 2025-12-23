"use client";

import * as React from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Terminal } from "lucide-react";
import type { UsesItem } from "@/data/uses";

interface UsesLinkRowProps {
  item: UsesItem;
  onViewConfig?: (config: NonNullable<UsesItem["config"]>) => void;
}

export function UsesLinkRow({ item, onViewConfig }: UsesLinkRowProps) {
  return (
    <div className="group relative flex items-center justify-between py-3 border-b border-white/5 last:border-0">
      <div className="flex flex-col gap-0.5 min-w-0">
        <motion.a
          href={item.link}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 text-zinc-200 hover:text-brand-primary transition-colors font-medium group/link outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/50 rounded-sm"
          aria-label={`Open ${item.name} official website`}
          initial="initial"
          whileHover="hover"
          whileFocus="hover"
        >
          <span className="truncate">{item.name}</span>
          <motion.span
            variants={{
              initial: { opacity: 0, x: -4 },
              hover: { opacity: 1, x: 0 }
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
          </motion.span>
        </motion.a>
        {item.meta && (
          <span className="text-xs text-zinc-500 truncate">{item.meta}</span>
        )}
      </div>

      {item.config && onViewConfig && (
        <button
          onClick={() => onViewConfig(item.config!)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] font-sans uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition-all active:scale-95"
        >
          <Terminal className="h-3 w-3" />
          <span>Config</span>
        </button>
      )}
    </div>
  );
}
