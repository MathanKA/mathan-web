"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { setMode } from "@/app/actions/viewer-mode";
import type { ViewerMode } from "@/lib/viewer-mode";

interface RoleToggleProps {
  initialMode: ViewerMode;
}

const roles: { value: ViewerMode; label: string }[] = [
  { value: "recruiter", label: "Recruiter" },
  { value: "manager", label: "Manager" },
  { value: "engineer", label: "Engineer" }
];

export default function RoleToggle({ initialMode }: RoleToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleModeChange = (mode: ViewerMode) => {
    if (mode === initialMode) return;

    startTransition(async () => {
      await setMode(mode);
      router.refresh();
    });
  };

  return (
    <div className="flex p-1 bg-black/5 dark:bg-white/10 backdrop-blur-md rounded-full border border-black/5 dark:border-white/10">
      {roles.map((role) => {
        const isActive = initialMode === role.value;
        return (
          <button
            key={role.value}
            onClick={() => handleModeChange(role.value)}
            disabled={isPending}
            className={`${
              isActive
                ? "text-black dark:text-white"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            } relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 outline-none disabled:opacity-50`}
          >
            {/* The Active "Pill" Background */}
            {isActive && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-white dark:bg-white/20 rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ borderRadius: 9999 }} // Ensures full pill shape
              />
            )}

            {/* The Text (z-index ensures it sits on top of the pill) */}
            <span className="relative z-10">{role.label}</span>
          </button>
        );
      })}
    </div>
  );
}
