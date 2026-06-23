import { NextResponse } from "next/server";
import { createSessionToken, validateAccessCode } from "@/lib/mvp-store";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { accessCode?: string };

  if (!validateAccessCode(body.accessCode || "")) {
    return NextResponse.json({ error: "Invalid access code" }, { status: 401 });
  }

  return NextResponse.json({
    token: createSessionToken(),
    profile: {
      organization: "OSCIRIS Private Pilot",
      role: "buyer",
    },
  });
}
