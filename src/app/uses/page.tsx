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
    <div className="bg-[#050505] min-h-screen">
      <UsesContent />
    </div>
  );
}
