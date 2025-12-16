"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface AuroraTextProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function AuroraText({
  className,
  children,
  as: Component = "span",
  ...props
}: AuroraTextProps) {
  return (
    <Component
      className={cn(
        "relative inline-block text-transparent bg-clip-text",
        "bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] dark:bg-[linear-gradient(110deg,#a1a1aa,45%,#ffffff,55%,#a1a1aa)]",
        "bg-[length:250%_100%] animate-aurora-text",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
