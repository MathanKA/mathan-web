import { fetchWithTimeout } from "@/lib/telemetry/shared";

export interface WakaTimeTelemetry {
  totalText: string;
  topLang?: string;
  topLangPct?: string;
  segments: Array<{ label: string; pct: number; seconds: number }>;
  updatedAtISO: string;
  isPartial?: boolean;
  partialReason?: string;
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

function basicAuth(apiKey: string) {
  return "Basic " + Buffer.from(apiKey).toString("base64");
}

export async function fetchWakaTimeStats(
  apiKey: string | undefined
): Promise<WakaTimeTelemetry> {
  const fallback: WakaTimeTelemetry = {
    totalText: "0h 0m",
    segments: [],
    updatedAtISO: new Date().toISOString(),
    isPartial: true,
    partialReason: "Missing WAKATIME_API_KEY or embed URL"
  };
  const url = process.env.WAKATIME_EMBED_JSON_URL;
  if (!url || !url.startsWith("http")) return fallback;
  if (!apiKey) return fallback;

  try {
    const res = await fetchWithTimeout(url, {
      headers: {
        Authorization: basicAuth(apiKey),
        Accept: "application/json",
        "User-Agent": "mathan-web-telemetry"
      },
      timeout: 8000,
      next: { revalidate: 60 * 30 }
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
      updatedAtISO: new Date().toISOString(),
      isPartial: false
    };
  } catch (error: unknown) {
    console.warn(
      `[Telemetry] WakaTime fetch handled: ${error instanceof Error ? error.message : String(error)}`
    );
    return fallback;
  }
}
