"use client";

import { motion, useReducedMotion } from "motion/react";
import { Download, Printer, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resumeData } from "@/data/resume";
import { toast } from "sonner";

export function ResumeControlBar() {
  const shouldReduceMotion = useReducedMotion();
  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(resumeData, null, 2));
    toast.success("Resume JSON copied to clipboard");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 0 } : { y: -100, opacity: 0 }}
      animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-20 z-40 w-full mb-8 print:hidden"
    >
      <div className="container mx-auto px-4">
        <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
            </div>
            <span className="text-sm font-medium text-emerald-400/90 tracking-tight">
              System Status: <span className="text-white">Online</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyJson}
              className="bg-white/5 border-white/10 hover:bg-white/10 text-xs gap-2 h-9 px-4"
            >
              <Terminal className="w-3.5 h-3.5" />
              Copy JSON
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePrint}
              className="bg-white/5 border-white/10 hover:bg-white/10 text-xs gap-2 h-9 px-4"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </Button>

            <Button
              asChild
              size="sm"
              className="bg-brand-primary/10 border border-brand-primary/20 hover:bg-brand-primary/20 text-brand-primary hover:text-white transition-all text-xs gap-2 h-9 px-4"
            >
              <a href="/resume/MathanKA_Resume.pdf" download>
                <Download className="w-3.5 h-3.5" />
                PDF Spec
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
