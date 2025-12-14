import { ViewerMode } from "@/lib/viewer-mode";

export interface CTA {
  label: string;
  href: string;
  external?: boolean;
}

export interface RecommendedStep {
  label: string;
  href: string;
  id: string;
}

export interface ModeConfig {
  hero: {
    primaryCTA: CTA;
    secondaryCTA: CTA;
    bullets: string[]; // IDs of bullets to show/order
  };
  featuredCaseStudy: {
    chips: string[]; // IDs of chips
    primaryCTA: CTA;
    secondaryCTA: CTA;
  };
  skills: {
    emphasis: "stack" | "delivery" | "leadership";
    proofLinkLabel: string;
  };
  recommendedPath: RecommendedStep[];
}

export const MODE_CONFIG: Record<ViewerMode, ModeConfig> = {
  recruiter: {
    hero: {
      primaryCTA: { label: "View Resume", href: "/resume" },
      secondaryCTA: {
        label: "Contact Me",
        href: "mailto:hello@mathan.pro",
        external: true,
      },
      bullets: ["role-breadth", "delivery", "proof-metrics"],
    },
    featuredCaseStudy: {
      chips: ["outcome", "role", "stack"],
      primaryCTA: { label: "Read Case Study", href: "#case-studies" }, // Link to specific if available
      secondaryCTA: { label: "View Resume", href: "/resume" },
    },
    skills: {
      emphasis: "stack",
      proofLinkLabel: "View Skills in Resume",
    },
    recommendedPath: [
      { id: "resume", label: "Resume", href: "/resume" },
      { id: "highlights", label: "Highlights", href: "/#case-studies" },
      { id: "contact", label: "Contact", href: "mailto:hello@mathan.pro" },
    ],
  },
  manager: {
    hero: {
      primaryCTA: { label: "View Case Studies", href: "/projects" },
      secondaryCTA: { label: "View Resume", href: "/resume" },
      bullets: ["impact", "scope", "risk"],
    },
    featuredCaseStudy: {
      chips: ["outcome", "scope", "tradeoff"],
      primaryCTA: { label: "Read Case Study", href: "#case-studies" },
      secondaryCTA: { label: "Impact Summary", href: "#case-studies" }, // Anchor logic to be refined
    },
    skills: {
      emphasis: "delivery",
      proofLinkLabel: "View Impact",
    },
    recommendedPath: [
      { id: "case-studies", label: "Case Studies", href: "/projects" },
      { id: "impact", label: "Impact", href: "/projects" },
      { id: "process", label: "Process", href: "/about" }, // Placeholder
    ],
  },
  engineer: {
    hero: {
      primaryCTA: { label: "View Case Studies", href: "/projects" },
      secondaryCTA: {
        label: "GitHub",
        href: "https://github.com/MathanKA",
        external: true,
      },
      bullets: ["architecture", "performance", "correctness"],
    },
    featuredCaseStudy: {
      chips: ["perf", "arch", "tradeoff"],
      primaryCTA: { label: "Read Case Study", href: "#case-studies" },
      secondaryCTA: {
        label: "View Architecture",
        href: "https://github.com/MathanKA",
        external: true,
      },
    },
    skills: {
      emphasis: "leadership", // Actually engineer emphasis is systems/perf, reusing "leadership" key or rename?
      // "emphasis" map: stack -> stack-keywords, delivery -> delivery/ownership, leadership -> systems/perf?
      // Let's stick to the prompt's mapping: engineer -> systems/perf.
      proofLinkLabel: "View Approach",
    },
    recommendedPath: [
      { id: "architecture", label: "Architecture", href: "/projects" },
      { id: "case-studies", label: "Case Studies", href: "/projects" },
      { id: "github", label: "GitHub", href: "https://github.com/MathanKA" },
    ],
  },
};

// Content Inventory
export const HERO_BULLETS: Record<
  string,
  { icon: string; text: string; color: string }
> = {
  "role-breadth": {
    icon: "Check",
    text: "9+ years Full-Stack Engineer (Frontend Specialist)",
    color: "text-green-500",
  },
  delivery: {
    icon: "Globe",
    text: "End-to-end delivery from design to deploy",
    color: "text-purple-500",
  },
  "proof-metrics": {
    icon: "Zap",
    text: "Proven track record: Lighthouse 90+, WCAG 2.1 AA",
    color: "text-yellow-500",
  },
  impact: {
    icon: "Zap",
    text: "Reduced load times by 40% in previous roles",
    color: "text-yellow-500",
  },
  scope: {
    icon: "Globe",
    text: "Led frontend for multi-tenant SaaS platforms",
    color: "text-blue-500",
  },
  risk: {
    icon: "Shield",
    text: "Enterprise-grade security & privacy (GDPR/DPDP)",
    color: "text-red-500",
  },
  architecture: {
    icon: "Globe",
    text: "Scalable Micro-frontend & Monorepo Architectures",
    color: "text-purple-500",
  },
  performance: {
    icon: "Zap",
    text: "Performance Obsessed: Core Web Vitals Optimization",
    color: "text-yellow-500",
  },
  correctness: {
    icon: "Shield",
    text: "Type-safe, Tested, and Accessible by default",
    color: "text-green-500",
  },
};
