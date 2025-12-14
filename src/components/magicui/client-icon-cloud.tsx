"use client";

import dynamic from "next/dynamic";

const IconCloud = dynamic(
  () => import("./icon-cloud").then((mod) => mod.IconCloud),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-muted/20 rounded-lg min-h-[300px]" />
    ),
  }
);

export function ClientIconCloud({ iconSlugs }: { iconSlugs: string[] }) {
  return <IconCloud iconSlugs={iconSlugs} />;
}
