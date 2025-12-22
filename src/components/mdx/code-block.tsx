"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children: React.ReactNode;
}

export function CodeBlock({ children, ...props }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = React.useState(false);
  const preRef = React.useRef<HTMLPreElement>(null);

  const onCopy = React.useCallback(() => {
    if (preRef.current) {
      // Extract text content from the pre element
      const code = preRef.current.innerText;
      navigator.clipboard.writeText(code).then(() => {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
      });
    }
  }, []);

  return (
    <div className="relative group my-8 overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] shadow-2xl">
      {/* VS Code Header */}
      <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
        </div>
        <div className="font-sans text-[10px] uppercase tracking-widest text-zinc-500">
          Source_Code
        </div>
        <div className="absolute right-4 top-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-zinc-500 hover:bg-white/5 hover:text-white"
            onClick={onCopy}
            aria-label="Copy code"
          >
            {hasCopied ? (
              <Check className="h-3 w-3 text-brand-primary" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>
        </div>
      </div>
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto p-6 text-[13px] md:text-sm text-zinc-300 font-mono leading-relaxed scrollbar-thin scrollbar-thumb-white/5 scrollbar-track-transparent"
      >
        {children}
      </pre>
    </div>
  );
}
