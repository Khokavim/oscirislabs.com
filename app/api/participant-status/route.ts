import { NextResponse } from "next/server";
import { loadPublishedParticipantStatus } from "@/lib/published-participant-status";

export async function GET() {
  const snapshot = await loadPublishedParticipantStatus();
  if (!snapshot) {
    return NextResponse.json(
      { error: "Published participant snapshot unavailable" },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return NextResponse.json(snapshot, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
