import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ViewerMode } from "@/lib/viewer-mode";
import RoleToggle from "./role-toggle";
import { cn } from "@/lib/utils";

interface NavProps {
  mode: ViewerMode;
}

interface NavItem {
  label: string;
  href: string;
}

const ALL_LINKS: Record<string, NavItem> = {
  home: { label: "Home", href: "/" },
  resume: { label: "Resume", href: "/resume" },
  projects: { label: "Projects", href: "/projects" },
  contact: { label: "Contact", href: "/contact" },
  about: { label: "About", href: "/about" },
  code: { label: "GitHub / Code", href: "https://github.com/MathanKA" }
};

const RECOMMENDED_PATHS: Record<ViewerMode, NavItem[]> = {
  recruiter: [ALL_LINKS.resume, ALL_LINKS.projects, ALL_LINKS.contact],
  manager: [ALL_LINKS.projects, ALL_LINKS.about, ALL_LINKS.resume],
  engineer: [ALL_LINKS.code, ALL_LINKS.projects, ALL_LINKS.about]
};

export function Nav({ mode }: NavProps) {
  const recommended = RECOMMENDED_PATHS[mode];
  const pathname = usePathname();

  return (
    <nav className="flex flex-col sm:flex-row gap-6 items-center">
      {/* Recommended Section */}
      <div className="flex flex-col gap-1 items-start sm:items-end">
        <span className="text-[10px] font-bold text-zinc-500 dark:text-white/40 uppercase tracking-wider">
          Recommended for you
        </span>
        <ul className="flex gap-4">
          {recommended.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors duration-200",
                    isActive
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-brand-accent"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="h-px sm:h-8 w-full sm:w-px bg-white/10" />

      <RoleToggle initialMode={mode} />
    </nav>
  );
}
