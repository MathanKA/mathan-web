// app/api/telemetry/route.ts
import { NextResponse } from "next/server";
import { getTelemetry } from "@/lib/telemetry";

export const runtime = "nodejs"; // avoid edge runtime surprises

export async function GET() {
  const key = process.env.WAKATIME_API_KEY;
  const stats = await getTelemetry(key);
  return NextResponse.json(stats, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600"
    }
  });
}
