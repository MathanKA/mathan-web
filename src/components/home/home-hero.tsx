"use client";

import Image from "next/image";
import { Fingerprint, Rocket, Lightbulb, LucideIcon } from "lucide-react";
import { HeroButtons } from "@/components/home/hero-buttons";
import { Iridescence } from "@/components/magicui/iridescence";
import { ViewerMode } from "@/lib/viewer-mode";
import { MODE_CONFIG, HERO_BULLETS } from "@/lib/mode/mode.config";

const ICONS: Record<string, LucideIcon> = {
  Fingerprint,
  Rocket,
  Lightbulb
};

export function HomeHero({ mode }: { mode: ViewerMode }) {
  const config = MODE_CONFIG[mode].hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden min-h-[90vh] flex flex-col justify-center py-12"
      id="hero-section"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Desktop: Iridescence WebGL Background */}
        <div className="block md:block w-full h-full">
          <Iridescence
            color={[0.2, 0.3, 0.3]}
            mouseReact={false}
            amplitude={0.1}
            speed={0.1}
          />
        </div>

        {/* Mobile / Reduced Motion: Fallback CSS Background */}
        {/* <div className="block md:hidden w-full h-full bg-gradient-to-br from-white via-gray-100 to-white dark:from-black dark:via-zinc-900 dark:to-black" /> */}

        {/* Universal Overlay for text contrast */}
        <div className="absolute inset-0" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center md:items-start">
          {/* Left Column: Text */}
          <div className="flex flex-col gap-6 md:gap-8 order-2 md:order-1 text-center md:text-left items-center md:items-start md:col-span-8">
            <h1
              id="hero-title"
              className="text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-foreground/60"
            >
              Hi, I&apos;m <br className="block md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-2xl pr-1 whitespace-nowrap">
                Mathan K&nbsp;A
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 font-medium leading-relaxed">
              Frontend engineer with 10+ years building scalable high
              performance B2B SaaS, leading, shipping enterprise grade UI, and
              driving measurable outcomes.
            </p>

            {/* Dynamic Mode Bullets */}
            <ul className="flex flex-col gap-3 text-base md:text-lg text-white/90 text-left items-start md:items-start w-full md:w-auto">
              {config.bullets.map((bulletId) => {
                const bullet = HERO_BULLETS[bulletId];
                if (!bullet) return null;
                const Icon = ICONS[bullet.icon] || Lightbulb;

                return (
                  <li
                    key={bulletId}
                    className="flex items-start md:items-center gap-2 group w-full"
                  >
                    <div className="relative flex-shrink-0 w-5 h-5 flex items-center justify-center mt-1 md:mt-0">
                      <div className="absolute inset-0 bg-white/20 blur-md rounded-full opacity-0 group-hover:opacity-50 transition-opacity" />
                      <Icon
                        className={`h-4 w-4 md:h-5 md:w-5 relative text-foreground/70 group-hover:text-foreground transition-colors duration-300`}
                      />
                    </div>

                    <span className="text-base md:text-lg text-foreground/70 font-normal tracking-wide leading-relaxed">
                      {bullet.text}
                    </span>
                  </li>
                );
              })}
            </ul>

            {/* Replaced CTAs with HeroButtons component */}
            <HeroButtons />
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center items-center order-1 md:order-2 md:col-span-4 w-full">
            <div className="relative flex justify-center items-center w-full max-w-[460px]">
              <div className="relative z-10 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl ring-1 ring-white/10 w-full max-w-[360px] md:max-w-[420px]">
                <div className="relative rounded-full overflow-hidden w-full aspect-square">
                  <Image
                    src="/images/mathan-hero.webp"
                    alt="Mathan K A"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500 object-[center_23%]"
                    priority
                  />
                </div>
              </div>
              <div className="absolute inset-0 rounded-full bg-black/40 blur-2xl -z-10 transform translate-y-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
