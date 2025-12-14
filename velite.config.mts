import { defineConfig, s } from "velite";

export default defineConfig({
  collections: {
    caseStudies: {
      name: "CaseStudy",
      pattern: "case-studies/**/*.mdx",
      schema: s
        .object({
          title: s.string().max(90),
          slug: s.slug("case-studies", ["admin", "login"]),
          role: s.string().max(80),
          featured: s.boolean().default(false),
          status: s.enum(["pilot", "beta", "launched", "paused"]).default("pilot"),
          tags: s.array(s.string().max(32)).max(12).default([]),
          modes: s
            .array(s.enum(["recruiter", "manager", "engineer"]))
            .default(["recruiter", "manager", "engineer"]),
          stack: s.array(s.string().max(40)).max(20).default([]),
          summary_one_liner: s.string().max(160),
          // Extract excerpt for previews (first 180 chars)
          excerpt: s.excerpt({ length: 180 }),
          // Metadata (reading time, etc.)
          metadata: s.metadata(),
          // MDX content compiled to function body string
          code: s.mdx(),
        })
        .transform((data) => ({
          ...data,
          // Computed permalink
          url: `/case-studies/${data.slug}`,
        })),
    },
  },
});
