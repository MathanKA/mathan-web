import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getMode } from "@/lib/viewer-mode";
import { ModeSwitcher } from "@/components/mode-switcher";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://mathan.pro"),
  title: {
    default: "Mathan K A | Senior Front-end Engineer",
    template: "%s | Mathan K A",
  },
  description:
    "Senior Front-end Engineer and Solo Founder specializing in high-performance Next.js applications, scalable architecture, and user-centric design.",
  keywords: [
    "Senior Front-end Engineer",
    "Next.js Developer",
    "React Specialist",
    "Web Performance",
    "Tailwind CSS",
    "Software Architecture",
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
        alt: "Mathan K A - Portfolio Hero",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mathan K A | Senior Front-end Engineer",
    description:
      "Building high-performance web applications that scale. Expert in React, Next.js, and modern web technologies.",
    images: ["/og/home.png"],
    creator: "@MathanKA", // Replace with actual handle if different
  },
  alternates: {
    canonical: "https://mathan.pro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = await getMode();

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <header className="border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-sm sticky top-0 z-10 transition-colors">
          <div className="container mx-auto p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-bold tracking-tight">Portfolio Product</h1>
              <ModeSwitcher initialMode={mode} />
            </div>
            
            <Nav mode={mode} />
          </div>
        </header>

        <main className="grow container mx-auto p-4">{children}</main>

        <Footer />
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Mathan K A | Senior Front-end Engineer",
              url: "https://mathan.pro",
              alternateName: ["MathanHA Portfolio", "Mathan.pro"],
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
                  "https://linkedin.com/in/mathanka",
                ],
                jobTitle: "Senior Front-end Engineer",
                knowsAbout: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Web Performance",
                  "Software Architecture",
                ],
              },
            },
          ]}
        />
      </body>
    </html>
  );
}
