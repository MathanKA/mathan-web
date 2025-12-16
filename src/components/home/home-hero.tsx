"use client";

import Link from "next/link";
import Image from "next/image";
import { Check, Shield, Globe, Zap, LucideIcon } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { Iridescence } from "@/components/magicui/iridescence";
import { ViewerMode } from "@/lib/viewer-mode";
import { MODE_CONFIG, HERO_BULLETS } from "@/lib/mode/mode.config";

const ICONS: Record<string, LucideIcon> = {
  Check,
  Shield,
  Globe,
  Zap
};

export function HomeHero({ mode }: { mode: ViewerMode }) {
  const config = MODE_CONFIG[mode].hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative w-full overflow-hidden min-h-[90vh] flex flex-col justify-center"
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Column: Text */}
          <div className="flex flex-col gap-6 md:gap-8 order-2 md:order-1 text-center md:text-left items-center md:items-start">
            <h1
              id="hero-title"
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1]"
            >
              Hi, I&apos;m <AuroraText>Mathan K A</AuroraText>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground font-medium max-w-lg">
              A Passionate Front-end Developer building high-performance web
              applications.
            </p>

            {/* Dynamic Mode Bullets */}
            <ul className="flex flex-col gap-3 text-base md:text-lg text-muted-foreground/90 items-center md:items-start">
              {config.bullets.map((bulletId) => {
                const bullet = HERO_BULLETS[bulletId];
                if (!bullet) return null;
                const Icon = ICONS[bullet.icon] || Check;

                return (
                  <li key={bulletId} className="flex items-center gap-2">
                    <Icon className={`h-5 w-5 ${bullet.color}`} />
                    <span>{bullet.text}</span>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
              {/* Primary CTA */}
              <Link
                href={config.primaryCTA.href}
                target={config.primaryCTA.external ? "_blank" : undefined}
                className="hover:scale-105 transition-transform"
              >
                <ShimmerButton className="shadow-2xl">
                  <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base px-6">
                    {config.primaryCTA.label}
                  </span>
                </ShimmerButton>
              </Link>

              {/* Secondary CTA */}
              <Button
                variant="outline"
                size="lg"
                asChild
                className="h-12 px-8 text-base"
              >
                <Link
                  href={config.secondaryCTA.href}
                  target={config.secondaryCTA.external ? "_blank" : undefined}
                >
                  {config.secondaryCTA.label}
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="flex justify-center items-center order-1 md:order-2">
            <div className="relative flex justify-center items-center">
              <div className="relative z-10 p-3 rounded-full bg-white/5 backdrop-blur-md border border-white/20 shadow-2xl ring-1 ring-white/10">
                <div className="relative rounded-full overflow-hidden w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
                  <Image
                    src="/static/mathan.webp"
                    alt="Mathan KA"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
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
