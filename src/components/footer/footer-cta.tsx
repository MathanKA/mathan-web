"use client";

import { useState, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function FooterCTA() {
  const shouldReduceMotion = useReducedMotion();
  const [isCopied, setIsCopied] = useState(false);
  const email = "hello@mathan.pro";

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = email;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      toast.success("Email copied to clipboard!");

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
      toast.error("Failed to copy email.");
    }
  }, [email]);

  const itemVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    whileInView: { opacity: 1, y: 0 }
  };

  return (
    <div className="col-span-12 flex flex-col items-center text-center space-y-8">
      <motion.h2
        variants={itemVariants}
        className="text-3xl md:text-5xl font-sans font-bold tracking-tight text-white"
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/50 drop-shadow-2xl">
          Open to roles, collaborations, and shared learning.
        </span>
      </motion.h2>

      <motion.div variants={itemVariants} className="group relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-zinc-900 border border-white/10 rounded text-[10px] font-sans uppercase tracking-wider text-foreground opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity pointer-events-none mb-2 z-10">
          {isCopied ? "Copied!" : "Copy to clipboard"}
        </div>

        <button
          type="button"
          data-ph-capture-attribute-cta_location="footer_cta"
          data-ph-capture-attribute-cta_name="mail_copy"
          onClick={copyToClipboard}
          onKeyDown={(e) => e.key === "Enter" && copyToClipboard()}
          className={cn(
            "flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300",
            "backdrop-blur-2xl bg-zinc-900/50 border border-white/10",
            "hover:border-white/20 hover:bg-zinc-800/50 focus-visible:ring-2 focus-visible:ring-white/30 outline-none",
            "group/btn text-lg md:text-xl font-mono text-zinc-300 hover:text-white tracking-widest"
          )}
          aria-label={`Copy email address: ${email}`}
        >
          <span>{email}</span>
          {isCopied ? (
            <Check className="w-5 h-5 text-green-400 shrink-0" />
          ) : (
            <Copy className="w-5 h-5 group-hover/btn:scale-110 transition-transform shrink-0" />
          )}
        </button>
      </motion.div>
      <div className="mt-0">
        <a
          href={`mailto:${email}`}
          className="text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-brand-accent transition-colors"
        >
          Or email me directly
        </a>
      </div>
    </div>
  );
}
