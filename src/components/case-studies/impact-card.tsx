"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ImpactCardProps {
  stat: string;
  label?: string;
  accentColor?: "emerald" | "fuchsia";
  className?: string;
}

export function ImpactCard({
  stat,
  label = "Key Impact",
  accentColor = "emerald",
  className
}: ImpactCardProps) {
  const glowColor =
    accentColor === "emerald"
      ? "rgba(16, 185, 129, 0.2)"
      : "rgba(217, 70, 239, 0.2)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-8 backdrop-blur-xl",
        className
      )}
    >
      {/* Radial Glow Background */}
      <div
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glowColor} 0%, transparent 70%)`
        }}
      />

      <div className="space-y-2">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          {label}
        </span>
        <h3 className="bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
          {stat}
        </h3>
      </div>

      {/* Decorative corner element */}
      <div
        className={cn(
          "absolute -right-4 -top-4 h-24 w-24 rounded-full blur-3xl",
          accentColor === "emerald"
            ? "bg-brand-primary/20"
            : "bg-brand-secondary/20"
        )}
      />
    </motion.div>
  );
}
