import type { Metadata } from "next";
import { UsesContent } from "@/components/uses/uses-content";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "A professional manifesto of the hardware, software, and systems used to build high-performance web applications.",
  openGraph: {
    title: "Mathan K A | Uses",
    description: "The tools, hardware, and configurations behind the work.",
    images: [
      { url: "/og/uses.png", width: 1200, height: 630, alt: "Uses Page" }
    ]
  }
};

export default function UsesPage() {
  return (
    <div className=" min-h-screen relative w-full">
      <div className="absolute inset-0 pointer-events-none">
        {/* Fixed "Aurora" Gradient at Top Center */}
        {/* <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[conic-gradient(from_90deg_at_50%_50%,var(--color-brand-primary)_0%,var(--color-brand-secondary)_50%,var(--color-brand-primary)_100%)] opacity-10 blur-[120px]" /> */}

        {/* Subtle Grid Texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
      <UsesContent />
    </div>
  );
}
