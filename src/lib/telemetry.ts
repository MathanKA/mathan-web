// telemetry original
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
export interface GitHubTelemetry {
  items: Array<{
    text: string;
    repoShort: string;
    repoFull: string;
    url: string;
    hash?: string;
    whenISO: string;
    whenRelative: string;
  }>;
}
export interface WakaTimeTelemetry {
  totalText: string;
  topLang?: string;
  topLangPct?: string;
  segments: Array<{ label: string; pct: number; seconds: number }>;
  updatedAtISO: string;
}
export interface TelemetryData {
  github: GitHubTelemetry;
  wakatime: WakaTimeTelemetry;
  updatedAtISO: string;
}
interface GitHubEvent {
  type: string;
  created_at: string;
  repo: { name: string };
  payload: {
    commits?: Array<{ message: string }>;
    head?: string;
    pull_request?: { title: string; html_url: string; number: number };
    release?: { name: string; tag_name: string; html_url: string };
  };
}
interface WakaTimeLanguage {
  name: string;
  percent: number;
  total_seconds: number;
}
interface WakaTimeData {
  data: {
    human_readable_total_including_other_language: string;
    languages: WakaTimeLanguage[];
  };
}

const enUSNoAbout = {
  ...enUS,
  formatDistance: (token: any, count: any, options: any) => {
    const s = enUS.formatDistance(token, count, options);
    return s.replace(/^about\s+/, "");
  }
};

async function fetchWithTimeout(
  url: string,
  options: RequestInit & { timeout?: number } = {}
) {
  const { timeout = 10000, ...fetchOptions } = options; // Increased to 10s
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}
async function fetchGitHubEvents(username: string): Promise<GitHubTelemetry> {
  const fallback: GitHubTelemetry = { items: [] };
  if (!username) return fallback;
  try {
    const res = await fetchWithTimeout(
      `https://api.github.com/users/${username}/events/public?per_page=10`,
      {
        timeout: 8000,
        next: { revalidate: 3600 },
        headers: process.env.GITHUB_TOKEN
          ? {
              Authorization: `token ${process.env.GITHUB_TOKEN}`
            }
          : {}
      }
    );
    if (!res.ok) return fallback;
    const data = (await res.json()) as GitHubEvent[];
    if (!Array.isArray(data)) return fallback;
    const items = data
      .filter((event) =>
        ["PushEvent", "PullRequestEvent", "ReleaseEvent"].includes(event.type)
      )
      .slice(0, 2)
      .map((event) => {
        let text = "";
        let url = "";
        let hash = "";
        if (event.type === "PushEvent") {
          text =
            event.payload.commits?.[0]?.message ||
            "Pushed to " + event.repo.name;
          url = `https://github.com/${event.repo.name}/commit/${event.payload.head}`;
          hash = event.payload.head?.substring(0, 7) || "";
        } else if (event.type === "PullRequestEvent") {
          text =
            event.payload.pull_request?.title ||
            "Pull request in " + event.repo.name;
          url = event.payload.pull_request?.html_url || "";
          hash = `#${event.payload.pull_request?.number}`;
        } else if (event.type === "ReleaseEvent") {
          text =
            event.payload.release?.name ||
            event.payload.release?.tag_name ||
            "Released in " + event.repo.name;
          url = event.payload.release?.html_url || "";
        }
        return {
          text,
          repoShort: event.repo.name.split("/")[1],
          repoFull: event.repo.name,
          url,
          hash,
          whenISO: event.created_at,
          whenRelative: `~ ${formatDistanceToNow(new Date(event.created_at), {
            addSuffix: true,
            locale: enUSNoAbout
          })}`
        };
      });
    return { items };
  } catch (error: unknown) {
    console.warn(
      `[Telemetry] GitHub fetch handled: ${error instanceof Error ? error.message : String(error)}`
    );
    return fallback;
  }
}

function basicAuth(apiKey: string) {
  // WakaTime docs show base64(apiKey) (not apiKey:password) :contentReference[oaicite:5]{index=5}
  return "Basic " + Buffer.from(apiKey).toString("base64");
}

async function fetchWakaTimeStats(apiKey: string): Promise<WakaTimeTelemetry> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);

  const fallback: WakaTimeTelemetry = {
    totalText: "0h 0m",
    segments: [],
    updatedAtISO: new Date().toISOString()
  };
  const url = process.env.WAKATIME_EMBED_JSON_URL;
  if (!url || !url.startsWith("http")) return fallback;

  try {
    const res = await fetchWithTimeout(url, {
      headers: {
        Authorization: basicAuth(apiKey),
        Accept: "application/json",
        "User-Agent": "mathan-web-telemetry"
      },
      timeout: 8000,
      next: { revalidate: 60 * 30 },
      signal: controller.signal
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`WakaTime HTTP ${res.status}: ${text.slice(0, 180)}`);
    }

    const json = (await res.json()) as WakaTimeData;
    if (!json?.data) return fallback;
    const { data } = json;
    const totalText =
      data.human_readable_total_including_other_language || "0h 0m";
    const languages = data.languages || [];
    const segments = languages.map((lang) => ({
      label: lang.name,
      pct: lang.percent,
      seconds: lang.total_seconds
    }));
    const topLang = languages[0]?.name;
    const topLangPct = languages[0]?.percent
      ? `${Math.round(languages[0].percent)}%`
      : undefined;
    return {
      totalText,
      topLang,
      topLangPct,
      segments,
      updatedAtISO: new Date().toISOString()
    };
  } catch (error: unknown) {
    console.warn(
      `[Telemetry] WakaTime fetch handled: ${error instanceof Error ? error.message : String(error)}`
    );
    return fallback;
  } finally {
    clearTimeout(timeout);
  }
}
export async function getTelemetry(key: string): Promise<TelemetryData> {
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
