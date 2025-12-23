import Link from "next/link";
import { ArrowRight, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { ViewerMode } from "@/lib/viewer-mode";
import { MODE_CONFIG } from "@/lib/mode/mode.config";

export function FeaturedCaseStudy({ mode }: { mode: ViewerMode }) {
  const config = MODE_CONFIG[mode].featuredCaseStudy;

  // Inventory for chips/badges
  const CHIPS: Record<string, string> = {
    outcome: "Legacy to Modern",
    role: "Senior Engineer",
    stack: "React / Next.js",
    scope: "End-to-End Ownership",
    tradeoff: "Performance vs. Speed",
    perf: "WebSockets + Signals",
    arch: "Micro-frontends"
  };

  return (
    <section
      id="case-studies"
      className="relative w-full py-24 bg-[#050505] overflow-hidden"
    >
      <h2 className="text-2xl font-bold mb-6">Featured Case Study</h2>
      <Card className="overflow-hidden border-2 border-primary/10">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                FinTech Corp • Senior Engineer • 2023-2024
              </p>
              <CardTitle className="text-2xl md:text-3xl">
                Real-time Trading Dashboard
              </CardTitle>
            </div>
          </div>
          <CardDescription className="text-base mt-2">
            Migrated a legacy monolith to a micro-frontend architecture,
            enabling 10ms data updates.
          </CardDescription>

          <div className="flex gap-2 mt-4">
            {config.chips.map((chipId) => (
              <Badge key={chipId} variant="secondary">
                {CHIPS[chipId] || chipId}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2 col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              The Challenge
            </h3>
            <p>
              Users experienced 500ms+ latency on price updates, causing missed
              trading opportunities during high volume periods.
            </p>
          </div>
          <div className="space-y-4 col-span-2 md:col-span-3 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-yellow-500" /> Impact
              </h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Reduced latency to under 50ms (p99)</li>
                <li>Increased concurrent user capacity by 300%</li>
              </ul>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-500" /> Solution
              </h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Implemented WebSocket consolidation layer</li>
                <li>Optimized React re-renders with signals</li>
              </ul>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-4 bg-muted/20 p-6">
          <Button asChild>
            <Link href={config.primaryCTA.href}>
              {config.primaryCTA.label} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              href={config.secondaryCTA.href}
              target={config.secondaryCTA.external ? "_blank" : undefined}
            >
              {config.secondaryCTA.label}
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
