"use client";

import * as React from "react";
import { motion } from "motion/react";
import { USES_DATA, LAST_UPDATED, type UsesItem } from "@/data/uses";
import { UsesSectionCard } from "@/components/uses/uses-section-card";
import { CodeOverlay } from "@/components/ui/code-overlay";

export function UsesContent() {
  const [activeConfig, setActiveConfig] = React.useState<NonNullable<
    UsesItem["config"]
  > | null>(null);

  const handleOpenConfig = (config: NonNullable<UsesItem["config"]>) => {
    setActiveConfig(config);
  };

  const handleCloseConfig = () => {
    setActiveConfig(null);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <div className="w-full pt-32 pb-20">
        <section className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-12 gap-0 md:gap-12">
            {/* Left Column: Sticky Header & Index */}
            <div className="col-span-12 lg:col-span-4 h-fit lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-2xl pr-1">
                    Uses
                  </span>

                  <span className="text-brand-primary">.</span>
                </h1>
                <p className="text-zinc-400 text-lg mb-8 max-w-sm">
                  Tools, systems, and hardware that drive my daily creation
                  process.
                </p>

                {/* Index / Navigation */}
                <nav className="hidden lg:flex flex-col gap-3 border-l border-white/10 pl-6 mb-8">
                  {USES_DATA.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToSection(category.id)}
                      className="text-sm font-sans text-zinc-500 hover:text-white transition-colors text-left group flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      {category.title}
                    </button>
                  ))}
                </nav>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-sans">
                    Last Updated
                  </span>
                  <span className="text-xs text-zinc-400 font-sans">
                    {LAST_UPDATED}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Column: Grid of Cards */}
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-12 gap-6">
                {USES_DATA.map((category, index) => (
                  <UsesSectionCard
                    key={category.id}
                    category={category}
                    index={index}
                    onViewConfig={handleOpenConfig}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Code Overlay Modal */}
      <CodeOverlay
        isOpen={!!activeConfig}
        onClose={handleCloseConfig}
        title={activeConfig?.title || ""}
        code={activeConfig?.code || ""}
        language={activeConfig?.language || "text"}
      />
    </>
  );
}
