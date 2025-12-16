import type { Metadata, Viewport } from "next";
import Image from "next/image";
import icon from "./icon.png";
import { Geist, Geist_Mono } from "next/font/google";
import { getMode } from "@/lib/viewer-mode";
import { ModeSwitcher } from "@/components/mode-switcher";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
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
  const mode = await getMode();
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-[5px] sticky top-0 z-10 transition-colors ">
            <div className="container mx-auto p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Image
                  src={icon}
                  alt="Mathan K A"
                  width={37}
                  height={37}
                  className="rounded-full"
                />
                <h1 className="text-xl font-bold tracking-tight">Mathan K A</h1>
              </div>

              <Nav mode={mode} />
            </div>
          </header>

          <main className="grow container mx-auto p-4">{children}</main>

          <Footer />
          <Toaster />
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
