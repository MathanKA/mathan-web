import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getMode } from "@/lib/viewer-mode";
import { ModeSwitcher } from "@/components/mode-switcher";
import { Nav } from "@/components/nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio Product",
  description: "A tailored portfolio experience.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mode = await getMode();

  return (
    <html lang="en">
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

        <footer className="p-4 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
          <p>© 2024 Portfolio Product. Work in Progress.</p>
        </footer>
      </body>
    </html>
  );
}
