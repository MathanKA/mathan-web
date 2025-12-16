"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setMode } from "@/app/actions/viewer-mode";
import type { ViewerMode } from "@/lib/viewer-mode";

interface ModeSwitcherProps {
  initialMode: ViewerMode;
}

const MODES: { value: ViewerMode; label: string }[] = [
  { value: "recruiter", label: "Recruiter" },
  { value: "manager", label: "Manager" },
  { value: "engineer", label: "Engineer" }
];

export function ModeSwitcher({ initialMode }: ModeSwitcherProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleModeChange = (mode: ViewerMode) => {
    if (mode === initialMode) return;

    startTransition(async () => {
      // 1. Optimistic UI update handled by transition state if needed,
      // but here we just wait for the server action.
      // 2. Call Server Action to set cookie
      await setMode(mode);
      // 3. Refresh server components to reflect new mode
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {/* <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">
        Viewer Mode
      </div> */}
      <div
        className="inline-flex rounded-lg bg-gray-100 p-1 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        role="group"
        aria-label="Viewer Mode Selection"
      >
        {MODES.map((mode) => {
          const isActive = initialMode === mode.value;
          return (
            <button
              key={mode.value}
              onClick={() => handleModeChange(mode.value)}
              disabled={isPending}
              aria-pressed={isActive}
              className={`
                px-3 py-1.5 text-sm font-medium rounded-md transition-all
                focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
                ${
                  isActive
                    ? "bg-white dark:bg-black text-black dark:text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                }
                ${isPending ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {mode.label}
            </button>
          );
        })}
      </div>
      {/* <p className="text-[10px] text-gray-400">
        Adapts content for {initialMode === "engineer" ? "an" : "a"}{" "}
        {initialMode}.
      </p> */}
    </div>
  );
}
