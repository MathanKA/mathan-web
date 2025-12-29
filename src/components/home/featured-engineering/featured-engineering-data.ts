export type FeaturedEngineeringItem = {
  id: "quansentz" | "cybersecurity-products" | "cyware-performance";
  title: string;
  tagline: string;
  role: string;
  stack: string[]; // tags
  keyStat: string;
  description: string;
  link?: string;
  theme: {
    name: string;
    accentHex: string; // used for glow + micro-interaction
    accentRgb: string; // e.g. "17 221 119" for radial alpha
  };
  visual: {
    kind: "image" | "speedometer" | "phone-frame";
    imageSrc?: string; // use placeholder if real assets not available
    imageAlt?: string;
  };
  codeOverlay?: {
    title: string;
    languageLabel: string; // "prisma" | "ts" | "vue" etc (display only)
    code: string; // static snippet string
  };
};

export const FEATURED_ENGINEERING_ITEMS: FeaturedEngineeringItem[] = [
  {
    id: "quansentz",
    title: "Quansentz",
    tagline:
      "Privacy infrastructure for modern SaaS for consent, DSAR, and evidence by default.",
    role: "Founder & Full-Stack Engineer",
    stack: [
      "Next.js App Router",
      "TypeScript",
      "Prisma + Postgres",
      "RBAC",
      "Redis + BullMQ",
      "S3"
    ],
    keyStat: "Hash-Chained Audit Trail",
    description:
      "Designed and building a Next.js-native DPDP/GDPR consent + DSAR platform with tenant by domain isolation, purpose-level gating, and streaming export pipelines backed by tamper-evident audit logging for regulator ready evidence.",
    link: "/case-studies/privacy-first-consent-dsar-platform",
    theme: {
      name: "Emerald",
      accentHex: "#11dd77", // Brand Primary
      accentRgb: "17 221 119"
    },
    visual: {
      kind: "image",
      imageSrc: "/images/quansentz.png",
      imageAlt: "Quansentz Dashboard"
    },
    codeOverlay: {
      title: "prisma/schema.prisma",
      languageLabel: "prisma",
      code: `model AuditEvent {
  id          String   @id @default(cuid())
  tenantId    String
  prevHash    String
  hash        String   @db.Char(64)
  actorType   String   // USER | SYSTEM | API_KEY
  actorId     String
  action      String   // CONSENT.GRANT | DSAR.EXPORT | ...
  subjectType String   // CONSENT | DSAR | TENANT | ...
  subjectId   String
  meta        Json?
  createdAt   DateTime @default(now())
  @@unique([tenantId, hash])
  @@index([tenantId, createdAt])
}`
    }
  },
  {
    id: "cybersecurity-products",
    title: "Cyware Products",
    tagline:
      "Cybersecurity SaaS products built in a fast changing startup environment.",
    role: "Senior Software Engineer II",
    stack: ["Vue 2", "TypeScript", "Design Systems", "Reusable components"],
    keyStat: "Shared UI System Across Products",
    description:
      "Led end to end frontend delivery for multiple cybersecurity products, translating changing requirements into reliable releases with clean UI architecture, reusable components, and strong collaboration across product, design, and backend teams.",
    link: "/case-studies/cyware-frontend-modernization-program",
    theme: {
      name: "Cobalt",
      accentHex: "#333EEE",
      accentRgb: "51 62 238"
    },
    visual: {
      kind: "image",
      imageSrc: "/images/cybersecurity_frontend_architecture.svg",
      imageAlt: "Cyware Product UI"
    }
    // codeOverlay: {
    //   title: "feature-flags.ts",
    //   languageLabel: "ts",
    //   code: `export const flags = {
    //   newNav: true,
    //   fasterLists: true,
    //   roleBasedUI: true,
    // } as const;`
    // }
  },
  {
    id: "cyware-performance",
    title: "Performance Engineering",
    tagline:
      "Performance hardening and speed focused refactors for public and dashboard experiences.",
    role: "Senior Software Engineer II",
    stack: [
      "Nuxt",
      "Vue 3",
      "Vite",
      "SEO",
      "Code Splitting",
      "Bundle Strategy",
      "Lazy Loading"
    ],
    keyStat: "40% Smaller initial load, Entry bundle 10MB → 4MB",
    description:
      "Improved production web performance and discoverability by tightening render paths, refining bundle and chunking strategy, and strengthening SEO fundamentals such as metadata, canonical structure, and indexable page delivery for high traffic surfaces.",
    link: "/case-studies/cyware-frontend-modernization-program",
    theme: { name: "Fuchsia", accentHex: "#880088", accentRgb: "136 0 136" },
    visual: {
      kind: "image",
      imageSrc: "/images/cyware_seo_performance.jpg",
      imageAlt: "Performance and SEO engineering highlights"
    },
    codeOverlay: {
      title: "perf+seo.config.ts",
      languageLabel: "ts",
      code: `
export default defineConfig({
  build: { rollupOptions: { output: {
    manualChunks: (id) => (id.includes("node_modules") ? "vendor" : undefined),
  } } },
});`
    }
  }
];
