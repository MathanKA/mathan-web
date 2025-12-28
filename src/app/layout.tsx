import type { Metadata, Viewport } from "next";
import { Geist, IBM_Plex_Mono } from "next/font/google";

import { HeaderResizable } from "@/components/header-resizable";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/seo/json-ld";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { PostHogProvider } from "./providers";
import { getPersonJsonLd, getWebSiteJsonLd } from "@/lib/seo/json-ld";
import { SITE } from "@/lib/seo/site";
import { buildMetadataBase } from "@/lib/seo/metadata";

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
  metadataBase: buildMetadataBase(),
  title: {
    default: SITE.defaultTitle,
    template: SITE.titleTemplate
  },
  description: SITE.defaultDescription,
  keywords: SITE.keywords,
  authors: [{ name: SITE.name, url: SITE.canonicalBase }],
  creator: SITE.name,
  openGraph: {
    type: "website",
    locale: SITE.locale,
    url: "/",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    siteName: SITE.siteName
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.defaultTitle,
    description: SITE.defaultDescription,
    creator: SITE.social.twitter
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
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[url('/noise.jpg')] mix-blend-overlay"></div>

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
