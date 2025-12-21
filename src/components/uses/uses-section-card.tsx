"use client";

import * as React from "react";
import { motion } from "motion/react";
import { UsesLinkRow } from "./uses-link-row";
import type { UsesCategory, UsesItem } from "@/data/uses";

interface UsesSectionCardProps {
  category: UsesCategory;
  onViewConfig: (config: NonNullable<UsesItem["config"]>) => void;
  index: number;
}

export function UsesSectionCard({
  category,
  onViewConfig,
  index
}: UsesSectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      id={category.id}
      className="col-span-12 md:col-span-6 group"
    >
      <div className="h-full flex flex-col p-6 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-white/20 transition-colors">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-brand-primary transition-colors">
            {category.title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {category.description}
          </p>
        </div>

        <motion.div
          className="space-y-1"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
                delayChildren: index * 0.1 + 0.2
              }
            }
          }}
        >
          {category.items.map((item) => (
            <motion.div
              key={item.name}
              variants={{
                hidden: { opacity: 0, x: -10 },
                show: { opacity: 1, x: 0 }
              }}
            >
              <UsesLinkRow item={item} onViewConfig={onViewConfig} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
