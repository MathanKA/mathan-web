import { NextResponse } from "next/server";
import { getGitHubActivity } from "@/lib/github-activity";

export const runtime = "nodejs";

export async function GET() {
  const data = await getGitHubActivity();

  return NextResponse.json(data, {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
