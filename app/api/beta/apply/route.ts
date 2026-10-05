import { NextResponse } from "next/server";
import { eligibilityText, validateSignup } from "@/lib/beta";
import { clientKey, rateLimited, saveApplication } from "@/lib/beta-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BODY = 8 * 1024;

export async function POST(request: Request) {
  if (!(request.headers.get("content-type") || "").includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Send the form as JSON." }, { status: 415 });
  }
  if (rateLimited("apply:" + clientKey(request.headers), 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Wait ten minutes and try again." }, { status: 429 });
  }
  const text = await request.text();
  if (text.length > MAX_BODY) return NextResponse.json({ ok: false, error: "The form is too large." }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(text); } catch { return NextResponse.json({ ok: false, error: "The form could not be read." }, { status: 400 }); }

  // Bots fill the hidden field; accept silently and store nothing.
  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    return NextResponse.json({ ok: true, reference: "OSC-RECEIVED", updated: false, message: "Application received." });
  }
  const result = validateSignup(body);
  if (!result.ok) return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });

  const { application, updated } = await saveApplication(result.value);
  return NextResponse.json({
    ok: true,
    reference: application.reference,
    updated,
    message: eligibilityText(application.eligibility),
  });
}
