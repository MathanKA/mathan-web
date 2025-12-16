import Link from "next/link";
import { Check, Shield, Globe, Zap, LucideIcon } from "lucide-react";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { Button } from "@/components/ui/button";
import { AuroraText } from "@/components/magicui/aurora-text";
import { LightRays } from "@/components/magicui/light-rays";
import { ClientIconCloud } from "@/components/magicui/client-icon-cloud";
import { ViewerMode } from "@/lib/viewer-mode";
import { MODE_CONFIG, HERO_BULLETS } from "@/lib/mode/mode.config";

const ICONS: Record<string, LucideIcon> = {
  Check,
  Shield,
  Globe,
  Zap
};

const ICON_SLUGS = [
  "typescript",
  "javascript",
  "react",
  "nextdotjs",
  "nodedotjs",
  "tailwindcss",
  "prisma",
  "postgresql",
  "docker",
  "git",
  "github",
  "vscode",
  "figma"
];

export function HomeHero({ mode }: { mode: ViewerMode }) {
  const config = MODE_CONFIG[mode].hero;

  return (
    <section
      aria-labelledby="hero-title"
      className="relative grid min-h-[85vh] grid-cols-1 md:grid-cols-2 gap-8 items-center pt-8 md:pt-0"
    >
      <LightRays />

      <div className="flex flex-col gap-6 z-10 order-2 md:order-1">
        <h1
          id="hero-title"
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
        >
          Hi, I&apos;m <AuroraText>Mathan</AuroraText>
        </h1>

        <p className="text-xl text-muted-foreground font-medium max-w-lg">
          Building high-performance web applications that scale. Focused on
          quality, speed, and user experience.
        </p>

        <ul className="flex flex-col gap-2 text-base text-muted-foreground/80">
          {config.bullets.map((bulletId) => {
            const bullet = HERO_BULLETS[bulletId];
            if (!bullet) return null;
            const Icon = ICONS[bullet.icon] || Check;

            return (
              <li key={bulletId} className="flex items-center gap-2">
                <Icon className={`h-4 w-4 ${bullet.color}`} />
                <span>{bullet.text}</span>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-wrap gap-4 pt-4">
          {/* Primary CTA */}
          <Link
            href={config.primaryCTA.href}
            target={config.primaryCTA.external ? "_blank" : undefined}
          >
            <ShimmerButton className="shadow-2xl">
              <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-base">
                {config.primaryCTA.label}
              </span>
            </ShimmerButton>
          </Link>

          {/* Secondary CTA */}
          <Button variant="outline" size="lg" asChild>
            <Link
              href={config.secondaryCTA.href}
              target={config.secondaryCTA.external ? "_blank" : undefined}
            >
              {config.secondaryCTA.label}
            </Link>
          </Button>
        </div>
      </div>

      <div
        className="flex justify-center items-center z-10 order-1 md:order-2 min-h-[300px]"
        role="img"
        aria-label="Technology icon cloud"
      >
        <ClientIconCloud iconSlugs={ICON_SLUGS} />
      </div>
    </section>
  );
}
