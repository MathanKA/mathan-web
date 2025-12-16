export interface RequestLink {
  href: string;
  label: string;
}

export interface ResumeHeader {
  name: string;
  titleLine: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  links: RequestLink[];
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
  highlights?: string[];
}

export interface Project {
  title: string;
  description: string;
  role: string;
  tech: string[];
  link?: string;
  highlights?: string[];
}

export interface Education {
  degree: string;
  school: string;
  dates: string;
}

export interface ResumeData {
  header: ResumeHeader;
  summary: string[];
  skills: SkillCategory[];
  experience: Experience[];
  additionalExperience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: string[];
  achievements: string[];
}

/**
 * Resume Data
 * centralized source of truth for the resume page.
 * Edit this file to update resume content.
 */
export const resumeData: ResumeData = {
  header: {
    name: "Mathan K A",
    titleLine:
      "Senior Full-Stack Engineer | TypeScript • React • Next.js • Vue.js • Nuxt.js • PostgreSQL",
    tagline: "Building privacy-first consent & DSAR platform for GDPR/DPDP",
    location: "Bengaluru, India",
    email: "hello@mathan.pro",
    phone: "+91-9790196979",
    links: [
      { label: "mathan.pro", href: "https://mathan.pro" },
      {
        label: "linkedin.com/in/mathanka",
        href: "https://linkedin.com/in/mathanka"
      },
      { label: "github.com/mathanka", href: "https://github.com/mathanka" }
    ]
  },
  summary: [
    "Senior Full-Stack Engineer with over 10 years of experience building scalable web applications and platforms.",
    "Specialized in frontend architecture with React/Next.js and Vue/Nuxt, and privacy-first backend systems.",
    "Proven track record in leading frontend teams, optimizing performance (Lighthouse 90+), and building complex SaaS products from scratch.",
    "Passionate about clean code, accessibility, and delivering exceptional user experiences."
  ],
  skills: [
    {
      category: "Languages & Web",
      items: ["TypeScript", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"]
    },
    {
      category: "Frontend",
      items: [
        "React 18",
        "Next.js (App Router)",
        "Vue.js 2 & 3",
        "Nuxt.js",
        "Tailwind CSS",
        "Bootstrap",
        "Zod"
      ]
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Next.js Route Handlers",
        "Server Actions",
        "REST APIs",
        "Webhooks",
        "Prisma"
      ]
    },
    {
      category: "Databases & Storage",
      items: ["PostgreSQL", "MongoDB", "Redis", "S3 object storage"]
    },
    {
      category: "Auth & Security",
      items: [
        "Auth.js",
        "JWT",
        "sessions",
        "RBAC",
        "OWASP-aligned secure coding",
        "GDPR/DPDP-aware data design"
      ]
    },
    {
      category: "DevOps & Monitoring",
      items: [
        "Docker",
        "Vercel",
        "GitHub Actions CI/CD",
        "Pino",
        "Sentry",
        "Axiom"
      ]
    },
    {
      category: "Dev Tools",
      items: ["Git", "Vite", "Webpack", "npm", "pnpm", "eslint", "prettier"]
    },
    {
      category: "Performance & Optimization",
      items: [
        "code splitting",
        "lazy loading",
        "tree-shaking",
        "Core Web Vitals/Lighthouse"
      ]
    },
    {
      category: "SEO & Accessibility",
      items: [
        "on-page SEO",
        "schema basics",
        "WCAG 2.1 AA",
        "ARIA",
        "semantic HTML",
        "keyboard nav"
      ]
    }
  ],
  experience: [
    {
      company: "Quansentz",
      role: "Senior Full-Stack Engineer & Founder",
      dates: "Sep 2025 – Present",
      location: "Remote",
      bullets: [
        "Building a privacy-first consent + DSAR platform for multi-tenant Next.js teams.",
        "Implemented domain-based tenant resolution with strict isolation.",
        "Developed consent capture, preference center, DSAR intake, and hash-chained audit logs.",
        "Built DSAR export pipeline using Redis-backed workers and S3 streaming for large encrypted exports.",
        "Managed CI/CD pipelines, Vercel/Docker deployments, Prisma migrations, and comprehensive documentation (PRD/Architecture/MVP/QA)."
      ],
      highlights: [
        "Privacy-First Architecture",
        "Multi-tenancy",
        "DSAR Pipeline"
      ]
    },
    {
      company: "Cyware",
      role: "Senior Software Engineer II",
      dates: "Nov 2017 – Mar 2024",
      location: "Bengaluru",
      bullets: [
        "Led threat intel platform frontend development (Angular 2+ then Vue 2).",
        "Revamped cyware.com with Nuxt, achieving significant performance gains (CRP/CLS optimizations, Lighthouse ~60 to ~90).",
        "Led Cyware Social alpha development (posts/likes/comments/follows) with robust security controls.",
        "Conducted WCAG 2.1 AA remediation and supported VPAT certification (~1 month effort).",
        "Refactored legacy codebases to Vue 3 + Vite, reducing bundle size from ~10MB to ~4MB."
      ],
      highlights: ["Lighthouse 90+", "WCAG 2.1 AA", "Bundle Size Reduction"]
    },
    {
      company: "SellerApp",
      role: "Software Lead, Web Dev",
      dates: "Feb 2017 – Sep 2017",
      location: "Bengaluru",
      bullets: [
        "Built early product and marketing site using AngularJS, Jade, and CoffeeScript.",
        "Shipped features rapidly in a startup environment, including dashboards and campaign tools."
      ]
    }
  ],
  additionalExperience: [
    {
      company: "Softzane Solutions",
      role: "Senior Software Tutor (Full Stack MERN)",
      dates: "May 2024 – Jan 2025",
      location: "Remote",
      bullets: [
        "Mentored students and professionals in Full Stack MERN development."
      ]
    },
    {
      company: "Blue Web Solutions",
      role: "UI Developer",
      dates: "Oct 2014 – Nov 2016",
      location: "Coimbatore",
      bullets: ["Web agency work; promoted to lead."]
    }
  ],
  projects: [
    {
      title: "Quansentz / SealForge (Pilot)",
      role: "Founder & Lead Engineer",
      description:
        "A comprehensive privacy engineering platform helping companies automate GDPR/DPDP compliance.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "S3"],
      highlights: ["Privacy Engineering", "Automation", "Compliance"]
    }
  ],
  education: [
    {
      degree: "B.E CSE",
      school: "SVS College of Engineering",
      dates: "2010 – 2014"
    }
  ],
  certifications: ["Udacity Frontend Web Developer Nanodegree (2016)"],
  achievements: [
    "Microsoft Student Partner: organized events; won rewards",
    "Marmalade contest: top 300 globally; won BlackBerry Z10 dev device",
    "Intel App Innovation Contest 2013 finalist; won Lenovo AIO (₹1.36L)"
  ]
};
