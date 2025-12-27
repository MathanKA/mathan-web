import type { MetadataRoute } from "next";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export const runtime = "nodejs";

type CaseStudyFrontmatter = {
  slug?: string;
  date?: string;
  updated?: string;
  lastModified?: string;
  draft?: boolean;
  noindex?: boolean;
};

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mathan.pro")
  .trim()
  .replace(/\/+$/, ""); // normalize trailing slashes

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

function abs(p: string) {
  return new URL(p, `${SITE_URL}/`).toString();
}

function safeDate(value?: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function getCaseStudies(): Promise<Array<{ slug: string; lastModified: Date }>> {
  let files: string[] = [];
  try {
    files = await fs.readdir(CASE_STUDIES_DIR);
  } catch {
    return [];
  }

  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const items = await Promise.all(
    mdxFiles.map(async (file) => {
      const fullPath = path.join(CASE_STUDIES_DIR, file);
      const [raw, stat] = await Promise.all([fs.readFile(fullPath, "utf8"), fs.stat(fullPath)]);
      const { data } = matter(raw) as { data: CaseStudyFrontmatter };

      if (data.draft || data.noindex) return null;

      const slugFromFile = file.replace(/\.mdx$/, "");
      const slug = (data.slug?.trim() || slugFromFile).replace(/^\/+/, "");

      const fm =
        safeDate(data.updated) ??
        safeDate(data.lastModified) ??
        safeDate(data.date);

      return { slug, lastModified: fm ?? stat.mtime };
    })
  );

  // de-dupe slugs defensively
  const seen = new Set<string>();
  return items
    .filter((x): x is { slug: string; lastModified: Date } => Boolean(x))
    .filter((x) => (seen.has(x.slug) ? false : (seen.add(x.slug), true)))
    .sort((a, b) => a.slug.localeCompare(b.slug));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: abs("/"), lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: abs("/case-studies"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: abs("/resume"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: abs("/uses"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: abs("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const caseStudies = await getCaseStudies();

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: abs(`/case-studies/${cs.slug}`),
    lastModified: cs.lastModified,
    changeFrequency: "yearly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
