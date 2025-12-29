// telemetry original
import { fetchGitHubEvents, type GitHubTelemetry } from "@/lib/github-activity";
import {
  fetchWakaTimeStats,
  type WakaTimeTelemetry
} from "@/lib/wakatime-activity";
export interface TelemetryData {
  github: GitHubTelemetry;
  wakatime: WakaTimeTelemetry;
  updatedAtISO: string;
}
export async function getTelemetry(key?: string): Promise<TelemetryData> {
  const defaultData: TelemetryData = {
    github: { items: [] },
    wakatime: {
      totalText: "0h 0m",
      segments: [],
      updatedAtISO: new Date().toISOString()
    },
    updatedAtISO: new Date().toISOString()
  };
  try {
    const username = process.env.GITHUB_USERNAME || "MathanKA";
    const [github, wakatime] = await Promise.all([
      fetchGitHubEvents(username),
      fetchWakaTimeStats(key)
    ]);
    return {
      github,
      wakatime,
      updatedAtISO: new Date().toISOString()
    };
  } catch (error) {
    console.warn("[Telemetry] Global catch triggered", error);
    return defaultData;
  }
}
