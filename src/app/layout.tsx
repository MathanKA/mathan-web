import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";

import { HeaderResizable } from "@/components/header-resizable";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "./providers";
import { getPersonJsonLd, getWebSiteJsonLd } from "@/lib/seo/json-ld";
import { CANONICAL_SITE_URL } from "@/lib/seo/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(CANONICAL_SITE_URL),
  title: {
    default: "Mathan K A | Senior Front-end Engineer",
    template: "%s | Mathan K A"
  },
  description:
    "Senior Front-end Engineer and Solo Founder specializing in high-performance Next.js applications, scalable architecture, and user-centric design.",
  keywords: [
    "Senior Front-end Engineer",
    "Next.js Developer",
    "React Developer",
    "Web Performance",
    "Tailwind CSS",
    "Software Architecture",
    "Optimization Expert",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Mathan K A",
    "Mathan.pro",
    "Web Developer",
    "Vue.js",
    "Nuxt.js",
    "SEO Optimization",
    "Web Core Vitals",
    "Lighthouse",
    "Web Acessibility",
    "Progressive Web Apps",
    "PWA"
  ],
  authors: [{ name: "Mathan K A", url: CANONICAL_SITE_URL }],
  creator: "Mathan K A",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CANONICAL_SITE_URL,
    title: "Mathan K A | Senior Front-end Engineer",
    description:
      "Building high-performance web applications that scale. Expert in React, Next.js, and modern web technologies.",
    siteName: "Mathan K A Portfolio",
    images: [
      {
        url: "/og/home.png", // TODO: Generate this image via screenshot
        width: 1200,
        height: 630,
        alt: "Mathan K A - Portfolio Hero"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathan K A | Senior Front-end Engineer",
    description:
      "Building high-performance web applications that scale. Expert in React, Next.js, and modern web technologies.",
    images: ["/og/home.png"],
    creator: "@MathanKA" // Replace with actual handle if different
  },
  alternates: {
    canonical: CANONICAL_SITE_URL
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  }
};

export default async function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${ibmPlexMono.variable} scroll-smooth dark`}
      suppressHydrationWarning
    >
      <body
        className="antialiased flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            forcedTheme="dark"
            disableTransitionOnChange
          >
            <HeaderResizable />

            {/* Grain overlay */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>

            <main className="grow relative flex flex-col min-h-screen font-sans antialiased">
              {children}
            </main>

            <Footer />
          </ThemeProvider>
        </PostHogProvider>
        <JsonLd data={[getWebSiteJsonLd(), getPersonJsonLd()]} />
      </body>
    </html>
  );
}
