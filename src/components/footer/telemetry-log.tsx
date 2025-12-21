"use client";

import { useEffect, useState } from "react";
import { GitBranch, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { type TelemetryData } from "@/lib/telemetry";
import { cn } from "@/lib/utils";

export function TelemetryLog() {
  const [data, setData] = useState<TelemetryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/telemetry");
        const telemetry = await res.json();
        setData(telemetry);
      } catch (err) {
        console.error("Telemetry fetch failed:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="font-mono text-xs text-zinc-500 flex items-center gap-2">
        <span className="animate-pulse">_</span>
        Connecting to Activity Status...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="font-mono text-xs text-red-400 flex items-center gap-2">
        <AlertCircle size={12} />
        Activity Status Offline
      </div>
    );
  }

  const latestShip = data.github.items[0];
  const waka = data.wakatime;

  return (
    <div className="grid grid-rows-2 gap-4 font-mono text-xs">
      {/* Row 1: Last Ship (GitHub) */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-400">
          <GitBranch size={12} />
          <span className="uppercase tracking-widest opacity-70">
            Last Commit
          </span>
        </div>
        <div className="group relative w-fit">
          {latestShip ? (
            <a
              href={latestShip.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-zinc-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <span className="truncate max-w-[250px]">{latestShip.text}</span>
              <ExternalLink
                size={10}
                className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shrink-0"
              />
              <span className="text-zinc-600 ml-1">
                ({latestShip.whenRelative})
              </span>
            </a>
          ) : (
            <p className="text-zinc-500">No recent activity</p>
          )}

          {/* Tooltip */}
          {latestShip && (
            <div className="absolute bottom-full left-0 mb-2 p-2 bg-zinc-900 border border-white/10 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 min-w-[150px]">
              <div className="text-zinc-500 uppercase mb-1">Repository</div>
              <div className="text-white mb-2">{latestShip.repoFull}</div>
              <div className="text-zinc-500 uppercase mb-1">Commit Hash</div>
              <div className="text-emerald-400">{latestShip.hash}</div>
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Energy Monitor (Wakatime) */}
      <div className="space-y-1.5 relative group/waka">
        <div className="flex items-center gap-2 text-fuchsia-400">
          <Clock size={12} />
          <span className="uppercase tracking-widest opacity-70">
            Focus Monitor
          </span>
        </div>

        {/* WakaTime Tooltip */}
        {waka.segments.length > 0 && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-zinc-900 border border-white/10 rounded text-[10px] font-mono text-white opacity-0 group-hover/waka:opacity-100 transition-opacity pointer-events-none z-20 min-w-[140px]">
            <div className="space-y-1">
              <div className="text-zinc-500 uppercase text-[9px] mb-1">
                Languages
              </div>
              {waka.segments.slice(0, 3).map((seg, i) => (
                <div key={seg.label} className="flex justify-between gap-4">
                  <span
                    className={cn(
                      i === 0
                        ? "text-brand-primary/80"
                        : i === 1
                          ? "text-brand-secondary/80"
                          : "text-brand-accent/90",
                      "font-semibold tracking-wider"
                    )}
                  >
                    {seg.label}
                  </span>
                  <span>{Math.round(seg.pct)}%</span>
                </div>
              ))}
              {waka.segments.length > 3 && (
                <div className="text-zinc-500 italic pt-1 mt-1 border-t border-white/5">
                  + {waka.segments.length - 3} others
                </div>
              )}
            </div>
          </div>
        )}

        <div className="space-y-1">
          <div className="flex justify-between items-baseline">
            <span className="text-white font-bold">{waka.totalText} Focus</span>
            <span className="text-zinc-500 text-[10px]">Last 7 Days</span>
          </div>

          {/* The 2px Bar */}
          <div className="h-0.5 w-full bg-zinc-800 rounded-full overflow-hidden flex">
            {waka.segments.slice(0, 3).map((seg, i) => (
              <div
                key={seg.label}
                className={cn(
                  "h-full",
                  i === 0
                    ? "bg-brand-primary/50"
                    : i === 1
                      ? "bg-brand-secondary/50"
                      : "bg-brand-accent/50"
                )}
                style={{ width: `${seg.pct}%` }}
              />
            ))}
          </div>

          <div className="text-zinc-500 text-[10px]">
            Top: {waka.topLang} ({waka.topLangPct})
          </div>
        </div>
      </div>
    </div>
  );
}
