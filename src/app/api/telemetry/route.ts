// app/api/telemetry/route.ts
import { NextResponse } from "next/server";
import { getTelemetry } from "@/lib/telemetry";

export const runtime = "nodejs"; // avoid edge runtime surprises

export async function GET() {
  const key = process.env.WAKATIME_API_KEY;
  if (!key)
    return NextResponse.json(
      { error: "Missing WAKATIME_API_KEY" },
      { status: 500 }
    );

  const stats = await getTelemetry(key);
  return NextResponse.json(stats, { status: 200 });
}
