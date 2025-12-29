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
    <div className="grid grid-rows-[auto_auto] gap-6 font-mono text-xs">
      {/* Row 1: GitHub Activity - The "Data Grid" Look */}
      <div className="space-y-2">
        {/* Header */}
        <div className="flex items-center gap-2 text-emerald-400">
          <GitBranch size={12} />
          <span className="uppercase tracking-widest opacity-70 text-[10px]">
            Code Monitor
          </span>
          {github.isPartial && (
            <span className="ml-auto px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] leading-none">
              API Limited
            </span>
          )}
        </div>

        {/* Data Grid */}
        <div className="grid grid-cols-2 gap-4  pl-3 py-0.5">
          {/* 7 Day Stats */}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-none tracking-tighter">
              {github.commitsLast7Days}
            </span>
            <span className="text-[10px] text-zinc-500 tracking-wide mt-1">
              7d Commits
            </span>
          </div>

          {/* 30 Day Stats */}
          <div className="flex flex-col">
            <span className="text-lg font-bold text-white leading-none tracking-tighter">
              {github.commitsLast30Days}
            </span>
            <span className="text-[10px] text-zinc-500 tracking-wide mt-1">
              30d Commits
            </span>
          </div>
        </div>

        {/* Last Commit Footer */}
        <div className="flex items-center gap-2 text-[10px] text-zinc-500 pt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/50 animate-pulse" />
          <span className="truncate max-w-[200px]">
            Last push:{" "}
            <span className="text-zinc-300">{github.lastCommitRelative}</span>
          </span>
        </div>
      </div>

      {/* Row 2: Focus Monitor - The "Visual Bar" Look */}
      <div className="space-y-2 relative group/waka">
        {/* Header */}
        <div className="flex items-center gap-2 text-fuchsia-400">
          <Clock size={12} />
          <span className="uppercase tracking-widest opacity-70 text-[10px]">
            Focus Monitor
          </span>
        </div>

        {/* WakaTime Hover Tooltip (Preserved) */}
        {waka.segments.length > 0 && (
          <div className="absolute bottom-full left-0 mb-3 p-3 bg-zinc-950/90 backdrop-blur-md border border-white/10 rounded-md text-[10px] font-sans text-white opacity-0 group-hover/waka:opacity-100 transition-all duration-300 pointer-events-none z-20 min-w-[160px] shadow-2xl translate-y-2 group-hover/waka:translate-y-0">
            <div className="space-y-2">
              <div className="text-zinc-500 uppercase text-[9px] font-mono border-b border-white/5 pb-1 mb-1">
                Weekly Breakdown
              </div>
              {waka.segments.slice(0, 4).map((seg, i) => (
                <div
                  key={seg.label}
                  className="flex justify-between items-center gap-4"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-1.5 h-1.5 rounded-full",
                        i === 0
                          ? "bg-fuchsia-500"
                          : i === 1
                            ? "bg-blue-500"
                            : "bg-zinc-500"
                      )}
                    />
                    <span className="text-zinc-300">{seg.label}</span>
                  </div>
                  <span className="font-mono text-zinc-500">
                    {Math.round(seg.pct)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Stats */}
        <div className="space-y-2 pl-3">
          <div className="flex justify-between items-baseline">
            <span className="text-lg font-bold text-white leading-none tracking-tighter">
              {waka.totalText}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase">
              Last 7 Days
            </span>
          </div>

          {/* The Visual Bar */}
          <div className="h-1 w-full bg-zinc-800/50 rounded-full overflow-hidden flex">
            {waka.segments.slice(0, 3).map((seg, i) => (
              <div
                key={seg.label}
                className={cn(
                  "h-full transition-all duration-500",
                  i === 0
                    ? "bg-fuchsia-500"
                    : i === 1
                      ? "bg-purple-500"
                      : "bg-indigo-500"
                )}
                style={{ width: `${seg.pct}%` }}
              />
            ))}
          </div>

          <div className="text-[10px] text-zinc-500">
            Most used: <span className="text-zinc-300">{wakaTopText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
