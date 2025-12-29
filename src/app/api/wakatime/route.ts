import { NextResponse } from "next/server";
import { fetchWakaTimeStats } from "@/lib/wakatime-activity";

export const runtime = "nodejs";

export async function GET() {
  const key = process.env.WAKATIME_API_KEY;
  const data = await fetchWakaTimeStats(key);

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600"
    }
  });
}
