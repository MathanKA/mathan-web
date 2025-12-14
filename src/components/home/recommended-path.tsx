import { ViewerMode } from "@/lib/viewer-mode";
import { MODE_CONFIG } from "@/lib/mode/mode.config";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecommendedPathProps {
  mode: ViewerMode;
}

export function RecommendedPath({ mode }: RecommendedPathProps) {
  const path = MODE_CONFIG[mode].recommendedPath;

  return (
    <div className="w-full bg-muted/30 border-y border-border/50 py-3">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground shrink-0 mr-2 uppercase tracking-wider text-xs">
          Recommended Path:
        </span>
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {path.map((step, index) => (
            <div key={step.id} className="flex items-center shrink-0">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/50" />
              )}
              <Link
                href={step.href}
                className={`
                  flex items-center px-3 py-1 rounded-full border transition-colors
                  ${
                    index === 0
                      ? "bg-primary/10 border-primary/20 text-primary font-medium hover:bg-primary/20"
                      : "bg-background border-border hover:border-primary/50 hover:text-foreground"
                  }
                `}
              >
                {step.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
