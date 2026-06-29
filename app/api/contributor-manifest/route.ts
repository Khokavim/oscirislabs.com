import { NextResponse } from "next/server";
import { loadPublishedContributorManifest } from "@/lib/published-contributor-manifest";

export async function GET() {
  const manifest = await loadPublishedContributorManifest();
  if (!manifest) {
    return NextResponse.json(
      { error: "Published contributor manifest unavailable" },
      {
        status: 404,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return NextResponse.json(manifest, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
