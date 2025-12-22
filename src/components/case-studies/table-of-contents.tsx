"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [indicatorTop, setIndicatorTop] = useState<number>(0);

  useEffect(() => {
    // Find all h2 and h3 headers in the article
    const headers = Array.from(
      document.querySelectorAll("article h2, article h3")
    );
    const tocItems = headers
      .map((header) => ({
        id: header.id,
        text: header.textContent || "",
        level: Number(header.tagName.charAt(1))
      }))
      .filter((item) => item.id);

    // Defer state update to avoid cascading render warning
    const timeoutId = setTimeout(() => {
      setItems(tocItems);
    }, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: "-100px 0% -80% 0%", threshold: 0.1 }
    );

    headers.forEach((header) => observer.observe(header));

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  // Update indicator position when activeId or items change
  useEffect(() => {
    if (activeId) {
      const activeLink = document.querySelector(
        `a[href="#${activeId}"]`
      ) as HTMLElement;
      if (activeLink) {
        requestAnimationFrame(() => {
          setIndicatorTop(activeLink.offsetTop);
        });
      }
    }
  }, [activeId, items]);

  if (items.length === 0) return null;

  return (
    <nav className="sticky top-32 space-y-4 pr-8">
      <h4 className="font-sans text-[10px] uppercase tracking-widest text-zinc-500">
        TECHNICAL_SPEC_INDEX
      </h4>

      <div className="relative flex flex-col gap-4 pl-4 border-l border-white/10">
        {/* Animated Progress Line */}
        <motion.div
          animate={{ y: indicatorTop }}
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
          className="absolute left-[-1px] top-0 w-[2px] bg-brand-primary h-6"
        />

        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById(item.id);
              if (element) {
                const yOffset = -120; // Accounts for sticky header
                const y =
                  element.getBoundingClientRect().top +
                  window.pageYOffset +
                  yOffset;
                window.scrollTo({ top: y, behavior: "smooth" });
              }
            }}
            className={cn(
              "text-xs font-medium transition-all duration-300 hover:text-white py-1",
              item.level === 3 && "pl-4",
              activeId === item.id ? "text-white" : "text-zinc-500"
            )}
          >
            {item.text}
          </a>
        ))}
      </div>
    </nav>
  );
}
