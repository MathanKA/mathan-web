import { resumeData } from "@/data/resume";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  // Option A: JSON Resume-like structure
  const jsonResume = {
    basics: {
      name: resumeData.header.name,
      label: resumeData.header.titleLine.split("|")[0].trim(),
      email: resumeData.header.email,
      phone: resumeData.header.phone,
      location: {
        city: resumeData.header.location.split(",")[0].trim(),
        countryCode: "IN",
        region: resumeData.header.location,
      },
      profiles: resumeData.header.links.map((link) => ({
        network: link.label,
        url: link.href,
      })),
    },
    summary: resumeData.summary.join("\n\n"),
    skills: resumeData.skills.map((skill) => ({
      name: skill.category,
      keywords: skill.items,
    })),
    work: [...resumeData.experience, ...resumeData.additionalExperience].map(
      (role) => ({
        name: role.company,
        position: role.role,
        startDate: role.dates.split("–")[0]?.trim(),
        endDate: role.dates.split("–")[1]?.trim() || "Present",
        summary: role.bullets.join(". "),
        location: role.location,
      })
    ),
    education: resumeData.education.map((edu) => ({
      institution: edu.school,
      area: edu.degree,
      studyType: "Bachelor",
      startDate: edu.dates.split("–")[0]?.trim(),
      endDate: edu.dates.split("–")[1]?.trim(),
    })),
    certificates: resumeData.certifications.map((cert) => ({
      name: cert,
    })),
    awards: resumeData.achievements.map((award) => ({
      title: award,
    })),
    projects: resumeData.projects.map((proj) => ({
      name: proj.title,
      description: proj.description,
      highlights: proj.highlights,
      roles: [proj.role],
      url: proj.link,
      keywords: proj.tech,
    })),
    meta: {
      generatedAt: new Date().toISOString(),
      source: "https://mathan.pro/resume.json",
      version: "1.0.0",
    },
  };

  return NextResponse.json(jsonResume, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control":
        "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
