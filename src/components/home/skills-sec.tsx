import Link from "next/link";
import { ArrowRight, Gauge, LayoutGrid, ShieldCheck } from "lucide-react";

type SkillPillar = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: string[];
  proofs: Array<{ label: string; href: string }>;
  featured?: boolean;
};

const PILLARS: SkillPillar[] = [
  {
    title: "Product UI Delivery",
    description:
      "Turn messy requirements into clear, polished interfaces that ship on schedule.",
    icon: LayoutGrid,
    skills: [
      "Interface architecture",
      "Information design",
      "Component composition",
      "Design system alignment",
      "Collaboration and handoffs",
      "Documentation habits",
      "Release ownership",
      "Quality minded delivery"
    ],
    proofs: [
      { label: "View case studies", href: "/projects" },
      { label: "See resume", href: "/resume" }
    ],
    featured: true
  },
  {
    title: "Performance and Quality",
    description:
      "Make interfaces fast, stable, and predictable for real users at real scale.",
    icon: Gauge,
    skills: [
      "Performance profiling",
      "Page speed improvements",
      "Interaction responsiveness",
      "Regression prevention",
      "Healthy build discipline",
      "Observability mindset",
      "Risk based QA",
      "Edge case hardening"
    ],
    proofs: [
      { label: "Browse projects", href: "/projects" },
      { label: "Proof of outcomes", href: "/projects" }
    ]
  },
  {
    title: "Accessibility and Systems",
    description:
      "Build inclusive experiences with consistent patterns that scale across teams.",
    icon: ShieldCheck,
    skills: [
      "Semantic structure",
      "Keyboard navigation",
      "Accessible components",
      "Contrast and readability",
      "Audit readiness thinking",
      "Reusable UI patterns",
      "Consistency at scale",
      "Maintainable UI systems"
    ],
    proofs: [
      { label: "Read case studies", href: "/projects" },
      { label: "Get in touch", href: "/#contact" }
    ]
  }
];

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs sm:text-sm text-white/80 backdrop-blur-sm">
      {children}
    </span>
  );
}

function ProofChip({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs sm:text-sm text-white/75 backdrop-blur-sm transition hover:bg-white/[0.06] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      aria-label={label}
    >
      <span className="whitespace-nowrap">{label}</span>
      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function PillarCard({ pillar }: { pillar: SkillPillar }) {
  const Icon = pillar.icon;

  return (
    <div
      className={[
        "relative h-full rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-md",
        "shadow-[0_20px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/10",
        "transition-transform duration-300 hover:-translate-y-1",
        pillar.featured ? "border-white/20 bg-white/[0.06]" : ""
      ].join(" ")}
    >
      {/* Subtle glow accent */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-300 hover:opacity-100 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(60%_60%_at_85%_20%,rgba(99,102,241,0.14),transparent_65%)]" />

      <div className="relative p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Icon with hero-like hover halo */}
            <div className="group relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03]">
              <div className="absolute inset-0 rounded-2xl bg-white/20 blur-md opacity-0 transition-opacity group-hover:opacity-40" />
              <Icon className="relative h-5 w-5 text-zinc-200 group-hover:text-white transition-colors" />
            </div>

            <div className="min-w-0">
              <h3 className="text-base sm:text-lg font-semibold text-white">
                {pillar.title}
              </h3>
              {pillar.featured ? (
                <p className="mt-1 text-xs text-white/60">Most relevant</p>
              ) : null}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm sm:text-base text-white/70 leading-relaxed">
          {pillar.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {pillar.skills.map((s) => (
            <Chip key={s}>{s}</Chip>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {pillar.proofs.map((p) => (
            <ProofChip
              key={`${pillar.title}-${p.label}`}
              href={p.href}
              label={p.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsSec() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative w-full py-16 sm:py-20 overflow-hidden"
    >
      {/* Calm continuation background (static, readable, matches hero palette) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* Opaque base prevents “gray” when the global theme background is light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06181b] via-[#041015] to-[#02070b]" />
        {/* Subtle color echoes */}
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_20%_10%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(70%_55%_at_85%_20%,rgba(99,102,241,0.14),transparent_65%)]" />
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-start">
          {/* Left column: framing */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <p className="text-xs tracking-widest text-white/60 uppercase">
              Capabilities
            </p>

            <h2
              id="skills-title"
              className="text-2xl md:text-3xl font-semibold text-white"
            >
              Skills that ship outcomes
            </h2>

            <p className="text-sm sm:text-base text-white/70 leading-relaxed">
              A focused snapshot of how I deliver reliable, high quality
              interfaces across product surfaces, from planning to production.
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <Chip>Delivery ownership</Chip>
              <Chip>Performance focus</Chip>
              <Chip>Accessibility first</Chip>
              <Chip>Systems thinking</Chip>
            </div>
          </div>

          {/* Right column: 3 pillar cards */}
          {/* <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.title} pillar={pillar} />
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
