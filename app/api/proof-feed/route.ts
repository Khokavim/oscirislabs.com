import { NextResponse } from "next/server";
import { loadPublishedProofFeed } from "@/lib/published-proof-feed";

export async function GET() {
  return NextResponse.json(await loadPublishedProofFeed(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
