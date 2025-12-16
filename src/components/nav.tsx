import Link from "next/link";
import type { ViewerMode } from "@/lib/viewer-mode";
import { ModeSwitcher } from "./mode-switcher";

interface NavProps {
  mode: ViewerMode;
}

interface NavItem {
  label: string;
  href: string;
}

const ALL_LINKS: Record<string, NavItem> = {
  home: { label: "Home", href: "/" },
  resume: { label: "Resume", href: "/resume" }, // Placeholder
  projects: { label: "Projects", href: "/projects" }, // Placeholder
  contact: { label: "Contact", href: "/contact" }, // Placeholder
  about: { label: "About", href: "/about" }, // Placeholder
  code: { label: "GitHub / Code", href: "https://github.com/MathanKA" }
};

const RECOMMENDED_PATHS: Record<ViewerMode, NavItem[]> = {
  recruiter: [ALL_LINKS.resume, ALL_LINKS.projects, ALL_LINKS.contact],
  manager: [ALL_LINKS.projects, ALL_LINKS.about, ALL_LINKS.resume],
  engineer: [ALL_LINKS.code, ALL_LINKS.projects, ALL_LINKS.about]
};

export function Nav({ mode }: NavProps) {
  const recommended = RECOMMENDED_PATHS[mode];

  return (
    <nav className="flex flex-col sm:flex-row gap-6 items-center">
      {/* Recommended Section */}
      <div className="flex flex-col gap-1 items-start sm:items-end">
        <span className="text-[10px] font-bold text-prime-blue dark:text-blue-400 uppercase tracking-wider">
          Recommended for you
        </span>
        <ul className="flex gap-4">
          {recommended.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm font-semibold text-gray-900 dark:text-white hover:underline decoration-blue-500 decoration-2 underline-offset-4"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="h-px sm:h-8 w-full sm:w-px bg-gray-200 dark:bg-gray-800" />

      {/* Main Nav (General) */}
      {/* <ul className="flex gap-4">
        <li>
          <Link
            href="/"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <span
            className="text-sm text-gray-400 cursor-not-allowed"
            title="Coming soon"
          >
            Blog
          </span>
        </li>
        <li>
          <Link
            href="/resume"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
          >
            Resume
          </Link>
        </li>
      </ul> */}
      <ModeSwitcher initialMode={mode} />
    </nav>
  );
}
