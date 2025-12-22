import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";

import { HeaderResizable } from "@/components/header-resizable";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
  metadataBase: new URL("https://mathan.pro"),
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
  authors: [{ name: "Mathan K A", url: "https://mathan.pro" }],
  creator: "Mathan K A",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mathan.pro",
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
    canonical: "https://mathan.pro"
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
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${ibmPlexMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
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
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mathan K A | Senior Front-end Engineer",
              url: "https://mathan.pro",
              alternateName: ["MathanHA Portfolio", "Mathan.pro"]
            },
            {
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: "Mathan K A",
                url: "https://mathan.pro",
                sameAs: [
                  "https://github.com/MathanKA",
                  "https://linkedin.com/in/mathanka"
                ],
                jobTitle: "Senior Front-end Engineer",
                knowsAbout: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Web Performance",
                  "Software Architecture"
                ]
              }
            }
          ]}
        />
      </body>
    </html>
  );
}
