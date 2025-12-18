export type FeaturedEngineeringItem = {
  id: "quansentz" | "orchestrate" | "cyware-social";
  title: string;
  tagline: string;
  role: string;
  stack: string[]; // tags
  keyStat: string;
  description: string;
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
  codeOverlay: {
    title: string;
    languageLabel: string; // "prisma" | "ts" | "vue" etc (display only)
    code: string; // static snippet string
  };
};

export const FEATURED_ENGINEERING_ITEMS: FeaturedEngineeringItem[] = [
  {
    id: "quansentz",
    title: "Quansentz",
    tagline: "Designing the Privacy Layer for Modern SaaS.",
    role: "Founder & Architect",
    stack: ["Next.js App Router", "Prisma", "RBAC", "Redis"],
    keyStat: "Zero-Trust Data Flow",
    description:
      "Architected a privacy-first consent platform with tamper-evident audit logging and GDPR-aligned data isolation.",
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
      title: "schema.prisma",
      languageLabel: "prisma",
      code: `model ConsentRecord {
  id        String   @id @default(cuid())
  userId    String
  purpose   String
  status    Boolean
  timestamp DateTime @default(now())
  metadata  Json?
  
  @@index([userId])
}`
    }
  },
  {
    id: "orchestrate",
    title: "Cyware Orchestrate",
    tagline: "High-Performance Threat Response.",
    role: "Senior Software Engineer II",
    stack: ["Vue.js", "Vite", "Legacy Migration"],
    keyStat: "Bundle Size: 10MB → 4MB",
    description:
      "Led migration to Vue 3 + Vite, implemented code splitting and hardened performance metrics.",
    theme: {
      name: "Fuchsia",
      accentHex: "#880088", // Brand Secondary
      accentRgb: "136 0 136"
    },
    visual: {
      kind: "speedometer"
    },
    codeOverlay: {
      title: "vite.config.ts",
      languageLabel: "ts",
      code: `export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-ui': ['@cyware/ui-kit', 'headless-ui'],
          'orchestrate-core': ['./src/core'],
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})`
    }
  },
  {
    id: "cyware-social",
    title: "Cyware Social",
    tagline: "Real-Time Collaboration at Scale.",
    role: "Senior Frontend Engineer",
    stack: ["Nuxt.js", "Bootstrap", "WebSockets"],
    keyStat: "Lighthouse Score: 60 → 90",
    description:
      "Optimized critical rendering path, improved layout stability and interaction readiness.",
    theme: {
      name: "Indigo",
      accentHex: "#333eee", // Brand Accent
      accentRgb: "51 62 238"
    },
    visual: {
      kind: "phone-frame"
    },
    codeOverlay: {
      title: "nuxt.config.js",
      languageLabel: "js",
      code: `export default {
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }
  },
  experimental: {
    payloadExtraction: false
  }
}`
    }
  }
];
