import { Metadata } from "next";
import { resumeData } from "@/data/resume";
import { ResumeControlBar } from "@/components/resume/resume-control-bar";
import { ResumeSidebar } from "@/components/resume/resume-sidebar";
import { ResumeTimeline } from "@/components/resume/resume-timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { getWebPageJsonLd, getBreadcrumbJsonLd } from "@/lib/seo/json-ld";
import { abs, CANONICAL_SITE_URL } from "@/lib/seo/site";
import { pageMetadata } from "@/lib/seo/metadata";

export const metadata = pageMetadata({
  title: "Resume",
  description:
    "Senior Full-Stack Engineer | TypeScript • React • Next.js • Vue.js • Nuxt.js • PostgreSQL. Building privacy-first consent & DSAR platform.",
  canonicalPath: "/resume"
});

export default function ResumePage() {
  const url = abs("/resume");
  const webPageData = getWebPageJsonLd({
    id: `${url}#webpage`,
    url,
    name: "Resume | Mathan K A",
    description:
      "Senior Full-Stack Engineer specializing in high-performance Next.js applications, scalable architecture, and user-centric design.",
    type: "AboutPage"
  });

  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "Home", item: CANONICAL_SITE_URL },
    { name: "Resume", item: url }
  ]);

  return (
    <section className="min-h-screen pt-20 pb-20 relative">
      {breadcrumbData && <JsonLd data={[webPageData, breadcrumbData]} />}

      <ResumeControlBar />

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 print:block mt-10">
        <aside className="md:col-span-4 lg:col-span-3 md:sticky md:top-40 h-fit print:hidden">
          <ResumeSidebar data={resumeData} />
        </aside>

        <section className="md:col-span-8 lg:col-span-9 print:w-full">
          <ResumeTimeline data={resumeData} />
        </section>
      </div>

      {/* Simplified Print View (Hidden on Web) */}
      <div className="hidden print:block print:text-black print:bg-white text-left p-8">
        <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{resumeData.header.name}</h1>
            <p className="text-xl font-semibold">
              {resumeData.header.titleLine}
            </p>
          </div>
          <div className="text-right text-sm">
            <p>{resumeData.header.location}</p>
            <p>{resumeData.header.email}</p>
            <p>{resumeData.header.phone}</p>
            <p>mathan.pro</p>
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">
              Technical Skills
            </h2>
            <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm">
              {resumeData.skills.map((group) => (
                <div key={group.category}>
                  <p className="font-bold underline text-xs">
                    {group.category}
                  </p>
                  <p>{group.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">
              Experience
            </h2>
            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div key={i} className="break-inside-avoid">
                  <div className="flex justify-between font-bold">
                    <span>
                      {exp.company} | {exp.role}
                    </span>
                    <span>{exp.dates}</span>
                  </div>
                  <ul className="list-disc ml-4 text-sm mt-1">
                    {exp.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold uppercase border-b border-black mb-2">
              Projects
            </h2>
            <div className="space-y-3">
              {resumeData.projects.map((p, i) => (
                <div key={i} className="break-inside-avoid">
                  <p className="font-bold">
                    {p.title} - {p.role}
                  </p>
                  <p className="text-sm">{p.description}</p>
                  <p className="text-xs italic">Tech: {p.tech.join(", ")}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
