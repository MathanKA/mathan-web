"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  className?: string;
  linkClassName?: string;
  onNavClick?: () => void;
}

export function NavLinks({
  className,
  linkClassName,
  onNavClick
}: NavLinksProps) {
  const pathname = usePathname();

  const navLinks = [
    { label: "Case Studies", href: "/case-studies" },
    { label: "Resume", href: "/resume" },
    { label: "Uses", href: "/uses" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <ul className={cn("flex items-center gap-6", className)}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              onClick={onNavClick}
              className={cn(
                "block text-sm font-medium transition-colors duration-200 whitespace-nowrap",
                linkClassName,
                isActive
                  ? "text-black dark:text-white"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              )}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
