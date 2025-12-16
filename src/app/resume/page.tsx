import { Metadata } from "next";
import Link from "next/link";
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  ExternalLink
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { resumeData } from "@/data/resume";
import { TextAnimate } from "@/components/magicui/text-animate";
import { CopyEmailButton } from "@/components/resume/copy-email-button";
import { PrintButton } from "./print-button";

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
    <main className="container max-w-4xl py-12 md:py-16 print:py-0 print:max-w-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Print / Actions Row - Hidden in Print */}
      <div className="mb-8 flex flex-wrap justify-end gap-4 print:hidden">
        <Button variant="outline" asChild>
          <Link href="/resume.json" target="_blank">
            <code className="text-xs mr-2">{"{}"}</code>
            JSON
          </Link>
        </Button>
        <Button variant="default" asChild>
          {/* Placeholder for PDF - verify if exists, else it might 404 but standard practice is to place file in public */}
          <a href="/resume/MathanKA_Resume.pdf" download>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </a>
        </Button>
        <PrintButton />
      </div>

      <div className="space-y-10 print:space-y-6">
        {/* Header */}
        <section className="flex flex-col gap-4 md:flex-row md:justify-between md:items-start">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <TextAnimate animation="blurIn" by="character" once>
                {resumeData.header.name}
              </TextAnimate>
            </h1>
            <TextAnimate
              as="p"
              animation="fadeIn"
              delay={0.5}
              once
              className="text-xl font-medium text-muted-foreground max-w-2xl"
            >
              {resumeData.header.titleLine}
            </TextAnimate>
            <p className="text-base text-muted-foreground/80">
              {resumeData.header.tagline}
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground pt-2 print:pt-0">
              <div className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {resumeData.header.location}
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" />
                <a
                  href={`mailto:${resumeData.header.email}`}
                  className="hover:underline hover:text-foreground"
                >
                  {resumeData.header.email}
                </a>
                <CopyEmailButton email={resumeData.header.email} />
              </div>
              <div className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                <a
                  href={`tel:${resumeData.header.phone}`}
                  className="hover:underline hover:text-foreground"
                >
                  {resumeData.header.phone}
                </a>
              </div>
            </div>

            <div className="flex gap-4 text-sm pt-2 print:hidden">
              {resumeData.header.links.map((link) => (
                <Button
                  key={link.label}
                  variant="outline"
                  size="sm"
                  asChild
                  className="h-8"
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.label.includes("github") ? (
                      <Github className="mr-2 h-3.5 w-3.5" />
                    ) : link.label.includes("linkedin") ? (
                      <Linkedin className="mr-2 h-3.5 w-3.5" />
                    ) : (
                      <Globe className="mr-2 h-3.5 w-3.5" />
                    )}
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>

            {/* Print-only links display */}
            <div className="hidden print:flex flex-col gap-1 text-sm text-muted-foreground mt-2">
              {resumeData.header.links.map((link) => (
                <span key={link.label}>
                  {link.href.replace("https://", "")}
                </span>
              ))}
            </div>
          </div>
        </section>

        <Separator />

        {/* Summary */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Summary</h2>
          <div className="space-y-2 text-muted-foreground">
            {resumeData.summary.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        <Separator />

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Technical Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 print:grid-cols-2">
            {resumeData.skills.map((skillGroup) => (
              <div key={skillGroup.category} className="break-inside-avoid">
                <h3 className="font-semibold text-foreground mb-2">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="font-normal print:border print:border-border print:bg-transparent print:text-foreground"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <Separator />

        {/* Experience */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Experience</h2>
          <div className="space-y-6">
            <Accordion
              type="multiple"
              defaultValue={["item-0", "item-1", "item-2"]}
              className="w-full"
            >
              {resumeData.experience.map((role, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b last:border-0"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start pt-4 mb-2 print:mb-1">
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {role.company}
                      </h3>
                      <p className="text-lg font-medium text-foreground/80">
                        {role.role}
                      </p>
                    </div>
                    <div className="text-right md:text-right text-sm text-muted-foreground font-medium md:mt-1">
                      <p>{role.dates}</p>
                      <p>{role.location}</p>
                    </div>
                  </div>

                  {role.highlights && (
                    <div className="flex flex-wrap gap-2 mb-3 print:hidden">
                      {role.highlights.map((h) => (
                        <Badge key={h} variant="outline" className="text-xs">
                          {h}
                        </Badge>
                      ))}
                    </div>
                  )}

                  <AccordionTrigger className="py-2 hover:no-underline print:hidden">
                    <span className="text-sm text-muted-foreground">
                      View Details
                    </span>
                  </AccordionTrigger>

                  {/* Print: always show content, hide trigger */}
                  <AccordionContent className="text-muted-foreground">
                    <ul className="list-disc list-outside ml-4 space-y-1.5 marker:text-muted-foreground/60">
                      {role.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </AccordionContent>

                  {/* CSS Hack for Print to force accordion content visible */}
                  <div className="hidden print:block text-muted-foreground mt-2">
                    <ul className="list-disc list-outside ml-4 space-y-1 marker:text-muted-foreground/60">
                      {role.bullets.map((bullet, i) => (
                        <li key={i}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold tracking-tight mb-4">
            Additional Experience
          </h2>
          <div className="grid gap-6 md:grid-cols-2 print:grid-cols-1">
            {resumeData.additionalExperience.map((role, index) => (
              <Card
                key={index}
                className="shadow-none border-border/60 bg-card/40 print:border hover:border-border transition-colors"
              >
                <CardHeader className="p-5">
                  <div className="flex justify-between items-start mb-1">
                    <CardTitle className="text-lg">{role.company}</CardTitle>
                    <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">
                      {role.dates}
                    </span>
                  </div>
                  <CardDescription className="font-medium text-foreground">
                    {role.role}
                  </CardDescription>
                  <CardDescription>{role.location}</CardDescription>
                </CardHeader>
                <CardContent className="p-5 pt-0 text-sm text-muted-foreground">
                  <ul className="list-disc list-outside ml-4">
                    {role.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Projects */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Projects</h2>
          <div className="grid gap-6 md:grid-cols-1">
            {resumeData.projects.map((project, index) => (
              <Card key={index} className="print:shadow-none print:border">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-base font-medium mt-1">
                        {project.role}
                      </CardDescription>
                    </div>
                    {project.link && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="print:hidden"
                      >
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        {/* Education & Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 print:grid-cols-2">
          <section>
            <h2 className="text-xl font-bold tracking-tight mb-4">Education</h2>
            <ul className="space-y-4">
              {resumeData.education.map((edu, i) => (
                <li key={i}>
                  <div className="font-semibold">{edu.school}</div>
                  <div className="text-muted-foreground">{edu.degree}</div>
                  <div className="text-sm text-muted-foreground/80">
                    {edu.dates}
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-lg font-bold tracking-tight mt-8 mb-4">
              Certifications
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              {resumeData.certifications.map((c, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight mb-4">
              Achievements
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              {resumeData.achievements.map((achievement, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
