import {
  Activity,
  Layers,
  MoveRight,
  PencilRuler,
  ShieldCheck
} from "lucide-react"; // Example icons
import { skills } from "@/data/site";

export const SkillsSection = () => {
  return (
    <section
      id="about"
      className="relative w-full pt-24 bg-transparent overflow-hidden"
    >
      {/* Background decoration consistent with other sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Section Header */}

        {/* 2. THE BENTO GRID */}
        <div className="grid grid-cols-12 items-stretch justify-center gap-y-[24px] md:gap-x-[24px]">
          {/* Card 1: The Core (Large Span) */}
          <div className="col-span-12 md:col-span-8 p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-[0.5px] border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] hover:border-white/20 transition-colors group">
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground/60 mb-6 tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-2xl pr-1">
                  Skills
                </span>{" "}
                <span className="text-foreground/60">that drive impact</span>
              </h2>
              <p className="text-foreground/70 max-w-2xl text-lg leading-relaxed">
                A focused snapshot of how I deliver reliable, high quality
                frontend across products, from planning to production.
              </p>
            </div>
            {/* Skill Tags - Mini Glass Chips */}
            <div className="flex flex-wrap gap-3">
              {[
                "Product Craftsmanship",
                "Tech Adaptability",
                "Performance & Security",
                "Scalable Frontend"
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/5 text-sm text-zinc-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-span-12 md:col-span-4 p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-[0.5px] border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] hover:border-[#f59e0b]/30 transition-colors group">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center p-3 rounded-xl bg-[#f59e0b]/20 text-[#fbbf24]/60">
                <PencilRuler size={22} />
              </div>
              <h3 className="text-xl font-mono text-zinc-200 uppercase tracking-widest mt-2">
                {"Craftsmanship"}
              </h3>
            </div>
            <ul className="space-y-3 text-foreground/70 text-lg normal-case">
              {skills["craftmanship"].map((skill) => (
                <li className="flex gap-2 items-center" key={skill.title}>
                  <span className="text-[#fbbf24]/40 flex items-center justify-center">
                    <MoveRight size={24} />
                  </span>
                  <span>{skill.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: */}
          <div className="col-span-12 md:col-span-4 p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-[0.5px] border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] hover:border-[#e879f9]/30 transition-colors group">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center p-3 rounded-xl bg-[#880088]/20 text-[#e879f9]/80">
                <Activity size={22} />
              </div>
              <h3 className="text-xl font-mono text-zinc-200 uppercase tracking-wider mt-2">
                {"Adaptability"}
              </h3>
            </div>
            <ul className="space-y-3 text-foreground/70 text-lg">
              {skills["adaptability"].map((skill) => (
                <li className="flex gap-2 items-center" key={skill.title}>
                  <span className="text-[#e879f9]/40 flex items-center justify-center">
                    <MoveRight size={24} />
                  </span>
                  <span>{skill.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4: */}
          <div className="col-span-12 md:col-span-4 p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-[0.5px] border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] hover:border-[#34d399]/30 transition-colors group">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center p-3 rounded-xl bg-[#10b981]/20 text-[#34d399]/80">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-xl font-mono text-zinc-200 uppercase tracking-wider mt-2">
                {"Performance & Sec"}
              </h3>
            </div>
            <ul className="space-y-3 text-foreground/70 text-lg">
              {skills["performance"].map((skill) => (
                <li className="flex gap-2 items-center" key={skill.title}>
                  <span className="text-[#34d399]/40 flex items-center justify-center">
                    <MoveRight size={24} />
                  </span>
                  <span>{skill.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 5: */}
          <div className="col-span-12 md:col-span-4 p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-[0.5px] border border-white/10 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.1)] hover:border-[#6366f1]/30 transition-colors group">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center justify-center p-3 rounded-xl bg-[#333eee]/15 text-[#6366f1]/80">
                <Layers size={22} />
              </div>
              <h3 className="text-xl font-mono text-zinc-200 uppercase tracking-wider mt-2">
                {"Frontend Ecosystem"}
              </h3>
            </div>
            <ul className="space-y-3 text-foreground/70 text-lg">
              {skills["architecture"].map((skill) => (
                <li className="flex gap-2 items-center" key={skill.title}>
                  <span className="text-[#6366f1]/80 flex items-center justify-center">
                    <MoveRight size={24} />
                  </span>
                  <span>{skill.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* End */}
        </div>
      </div>
    </section>
  );
};
