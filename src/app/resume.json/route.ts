import { resumeData } from "@/data/resume";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mathan.pro")
  .trim()
  .replace(/\/+$/, "");

export async function GET() {
  const jsonResume = {
    basics: {
      name: resumeData.header.name,
      label: resumeData.header.titleLine.split("|")[0].trim(),
      email: resumeData.header.email,
      location: {
        city: resumeData.header.location.split(",")[0].trim(),
        countryCode: "IN",
        region: resumeData.header.location
      },
      profiles: resumeData.header.links.map((link) => ({
        network: link.label,
        url: link.href
      }))
    },
    summary: resumeData.summary.join("\n\n"),
    skills: resumeData.skills.map((skill) => ({
      name: skill.category,
      keywords: skill.items
    })),
    work: [...resumeData.experience, ...resumeData.additionalExperience].map(
      (role) => ({
        name: role.company,
        position: role.role,
        startDate: role.dates.split("–")[0]?.trim(),
        endDate: role.dates.split("–")[1]?.trim() || "Present",
        summary: role.bullets.join(". "),
        location: role.location
      })
    ),
    education: resumeData.education.map((edu) => ({
      institution: edu.school,
      area: edu.degree,
      studyType: "Bachelor",
      startDate: edu.dates.split("–")[0]?.trim(),
      endDate: edu.dates.split("–")[1]?.trim()
    })),
    awards: resumeData.achievements.map((award) => ({ title: award })),
    projects: resumeData.projects.map((proj) => ({
      name: proj.title,
      description: proj.description,
      highlights: proj.highlights,
      roles: [proj.role],
      url: proj.link,
      keywords: proj.tech
    })),
    meta: {
      // If this is force-static, this timestamp is basically "build time".
      // Keep it, or remove it if you want stable content hashes.
      generatedAt: new Date().toISOString(),
      source: `${SITE_URL}/resume.json`,
      version: "1.0.0"
    }
  };

  return NextResponse.json(jsonResume, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      // ✅ Prevent this endpoint from showing up in Google results
      "X-Robots-Tag": "noindex, nosnippet"
    }
  });
}
