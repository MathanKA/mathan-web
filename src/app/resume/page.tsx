import { Metadata } from "next";

import { resumeData } from "@/data/resume";
import { ResumeContent } from "./resume-content";

export const metadata: Metadata = {
  title: "Resume | Mathan K A",
  description:
    "Senior Full-Stack Engineer | TypeScript • React • Next.js • Vue.js • Nuxt.js • PostgreSQL. Building privacy-first consent & DSAR platform.",
  alternates: {
    canonical: "/resume"
  }
};

export default function ResumePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: resumeData.header.name,
      jobTitle: resumeData.header.titleLine.split("|")[0].trim(),
      description: resumeData.summary.join(" "),
      email: resumeData.header.email,
      telephone: resumeData.header.phone,
      url: "https://mathan.pro/resume",
      sameAs: resumeData.header.links.map((l) => l.href),
      knowsAbout: resumeData.skills.flatMap((s) => s.items)
    }
  };

  return (
    <main className="container mx-auto p-4 pt-40 md:pt-40 lg:pt-32 max-w-4xl py-12 md:py-16 print:py-0 print:max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ResumeContent />
    </main>
  );
}
