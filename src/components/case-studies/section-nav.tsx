"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { BookmarkIcon } from "lucide-react";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "problem", label: "Problem" },
  { id: "constraints", label: "Constraints" },
  { id: "approach", label: "Approach" },
  { id: "tradeoffs", label: "Tradeoffs" },
  { id: "impact", label: "Impact" },
];

export function SectionNav() {
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const headingElements = sections
        .map(({ id }) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);

      // Find the first heading that is in the viewport
      for (const el of headingElements) {
        const rect = el.getBoundingClientRect();
        // Check if the element is roughly in the top part of the screen
        if (rect.top >= 0 && rect.top < 300) {
          setActiveHash(el.id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="hidden lg:block sticky top-24 self-start space-y-2">
      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-muted-foreground">
        <BookmarkIcon className="h-4 w-4" />
        <span>On this page</span>
      </div>
      <ul className="space-y-1">
        {sections.map(({ id, label }) => (
          <li key={id}>
            <Link
              href={`#${id}`}
              className={cn(
                "block py-1 pl-4 border-l-2 text-sm transition-colors hover:text-foreground",
                activeHash === id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground"
              )}
              onClick={() => setActiveHash(id)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
