"use client";

import { TextAnimate } from "@/components/magicui/text-animate";

export function CaseStudyTitle({ text }: { text: string }) {
  // Use a simple h1 on mobile to avoid performance issues or layout shifts,
  // or just rely on Magic UI's responsiveness if it handles it well.
  // Implementation note says "disable for small screens via Tailwind".
  return (
    <>
      <h1 className="md:hidden text-3xl font-extrabold tracking-tight leading-tight">
        {text}
      </h1>
      <div className="hidden md:block">
        <TextAnimate
          animation="blurIn"
          by="text"
          once
          className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight"
        >
          {text}
        </TextAnimate>
      </div>
    </>
  );
}
