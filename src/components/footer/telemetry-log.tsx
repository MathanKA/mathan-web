"use client";

import { useEffect, useState } from "react";
import { GitBranch, Clock, AlertCircle, ExternalLink } from "lucide-react";
import { type GitHubActivityResponse } from "@/lib/github-activity";
import { type WakaTimeTelemetry } from "@/lib/wakatime-activity";
import { cn } from "@/lib/utils";

export function TelemetryLog() {
  const [github, setGithub] = useState<GitHubActivityResponse | null>(null);
  const [waka, setWaka] = useState<WakaTimeTelemetry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [ghRes, wakaRes] = await Promise.all([
          fetch("/api/github"),
          fetch("/api/wakatime")
        ]);

        if (!ghRes.ok || !wakaRes.ok) {
          throw new Error("Telemetry endpoints unavailable");
        }

        const [gh, wk] = await Promise.all([ghRes.json(), wakaRes.json()]);
        setGithub(gh);
        setWaka(wk);
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

  if (error || !github || !waka) {
    return (
      <div className="font-mono text-xs text-red-400 flex items-center gap-2">
        <AlertCircle size={12} />
        Activity Status Offline
      </div>
    );
  }

  const topLanguages =
    github.topLanguagesText ||
    github.topLanguages
      ?.slice(0, 3)
      .map((lang) => lang.name)
      .join(", ") ||
    "";
  const wakaTopText = waka.topLang
    ? `${waka.topLang}${waka.topLangPct ? ` (${waka.topLangPct})` : ""}`
    : "No data";

  return (
    <div className="grid grid-rows-2 gap-4 font-mono text-xs">
      {/* Row 1: GitHub activity */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-emerald-400">
          <GitBranch size={12} />
          <span className="uppercase tracking-widest opacity-70">
            Code monitor
          </span>
          {github.isPartial && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
              Limited
            </span>
          )}
        </div>
        <div className="space-y-1 text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">
              {github.commitsLast7Days}
            </span>
            <span className="text-zinc-500">commits (7d)</span>
            <span className="text-white font-semibold ml-4">
              {github.commitsLast30Days}
            </span>
            <span className="text-zinc-500">commits (30d)</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            {/* <ExternalLink size={10} /> */}
            <span className="text-zinc-400">
              Last commit:{" "}
              <span className="text-white">
                {github.lastCommitRelative || "Unknown"}
              </span>
            </span>
          </div>
          {/* <div className="text-zinc-500">
            Top langs:{" "}
            <span className="text-white">{topLanguages || "N/A"}</span>
          </div> */}
        </div>
      </div>

      {/* Row 2: Energy Monitor (Wakatime) */}
      <div className="space-y-1.5 relative group/waka">
        <div className="flex items-center gap-2 text-fuchsia-400">
          <Clock size={12} />
          <span className="uppercase tracking-widest opacity-70">
            Focus Monitor
          </span>
          {waka.isPartial && (
            <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
              Limited
            </span>
          )}
        </div>

        {/* WakaTime Tooltip */}
        {waka.segments.length > 0 && (
          <div className="absolute bottom-full left-0 mb-2 p-2 bg-zinc-900 border border-white/10 rounded text-[10px] font-sans text-white opacity-0 group-hover/waka:opacity-100 transition-opacity pointer-events-none z-20 min-w-[140px]">
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

          <div className="text-zinc-500 text-[10px]">Top: {wakaTopText}</div>
        </div>
      </div>
    </div>
  );
}
