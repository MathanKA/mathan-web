"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Cloud, fetchSimpleIcons, renderSimpleIcon, ICloud } from "react-icon-cloud";

export type IconCloudProps = {
  iconSlugs: string[];
  className?: string;
};

export function IconCloud({ iconSlugs, className }: IconCloudProps) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [data, setData] = React.useState<any>(null);

  React.useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = React.useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon: any) =>
      renderSimpleIcon({
        icon,
        size: 42,
        aProps: {
          href: undefined,
          target: undefined,
          rel: undefined,
          onClick: (e: any) => e.preventDefault(),
          className: "select-none pointer-events-none text-slate-500 dark:text-slate-400 fill-current",
        },
      }),
    );
  }, [data]);

  return (
    <div className={cn("relative flex h-full w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg px-20 pb-20 pt-8", className)}>
        {renderedIcons && (
            <Cloud
                options={{
                    clickToFront: 500,
                    depth: 1,
                    imageScale: 2,
                    initial: [0.1, -0.1],
                    outlineColour: "#0000",
                    reverse: true,
                    tooltip: "native",
                    tooltipDelay: 0,
                    wheelZoom: false,
                }}
            >
                {renderedIcons}
            </Cloud>
        )}
    </div>
  );
}
