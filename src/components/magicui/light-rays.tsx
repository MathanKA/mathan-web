"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * LightRays component: renders a rotating light ray effect.
 * Implements reduced motion support via CSS media queries in global styles
 * or by relying on minimal motion if necessary.
 */
export function LightRays({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-1/2 left-1/2 -z-10 h-[200vh] w-[200vw] -translate-x-1/2 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-transparent opacity-40 blur-3xl",
          "animate-spin-slow [--spin-duration:30s]"
        )}
      />
      <div
         className={cn(
             "absolute inset-0 bg-gradient-to-bl from-rose-500/20 via-transparent to-transparent opacity-40 blur-3xl",
             "animate-reverse-spin [--spin-duration:40s]"
         )}
      />
    </div>
  );
}
