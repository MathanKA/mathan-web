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
    <div className="relative group my-6 overflow-hidden rounded-lg border bg-zinc-950 dark:bg-zinc-900">
      <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 bg-background/50 hover:bg-background/80 backdrop-blur-sm"
          onClick={onCopy}
          aria-label="Copy code"
        >
          {hasCopied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <pre
        ref={preRef}
        {...props}
        className="overflow-x-auto p-4 text-sm text-zinc-50 font-mono leading-relaxed scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent"
      >
        {children}
      </pre>
    </div>
  );
}
