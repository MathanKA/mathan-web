import React from "react";

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs sm:text-sm text-white/80 backdrop-blur-sm">
      {children}
    </span>
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
