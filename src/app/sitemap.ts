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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.mathan.pro";
const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

function safeDate(value?: string): Date | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

async function getCaseStudies(): Promise<
  Array<{ slug: string; lastModified: Date }>
> {
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
      const [raw, stat] = await Promise.all([
        fs.readFile(fullPath, "utf8"),
        fs.stat(fullPath)
      ]);

      const { data } = matter(raw) as { data: CaseStudyFrontmatter };

      if (data.draft === true || data.noindex === true) return null;

      const slugFromFile = file.replace(/\.mdx$/, "");
      const slug = (data.slug?.trim() || slugFromFile).replace(/^\/+/, "");

      const fm =
        safeDate(data.updated) ??
        safeDate(data.lastModified) ??
        safeDate(data.date);

      const lastModified = fm ?? stat.mtime;

      return { slug, lastModified };
    })
  );

  return items
    .filter(Boolean)
    .sort((a, b) => a!.slug.localeCompare(b!.slug)) as Array<{
    slug: string;
    lastModified: Date;
  }>;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${SITE_URL}/resume`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/resume.json`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${SITE_URL}/uses`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5
    }
  ];

  const caseStudies = await getCaseStudies();

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE_URL}/case-studies/${cs.slug}`,
    lastModified: cs.lastModified,
    changeFrequency: "yearly",
    priority: 0.75
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
