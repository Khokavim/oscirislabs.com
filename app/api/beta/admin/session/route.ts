import { NextResponse } from "next/server";
import { clientKey, isAdmin, rateLimited } from "@/lib/beta-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const COOKIE = "osciris_beta_admin";

export async function POST(request: Request) {
  if (rateLimited("admin:" + clientKey(request.headers), 10, 15 * 60 * 1000)) {
    return NextResponse.json({ ok: false, error: "Too many attempts. Wait fifteen minutes." }, { status: 429 });
  }
  const body = (await request.json().catch(() => ({}))) as { token?: unknown };
  const token = typeof body.token === "string" ? body.token.trim() : "";
  if (!(await isAdmin(token))) return NextResponse.json({ ok: false, error: "That admin token is not right." }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, token, {
    httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV === "production",
    path: "/api/beta/admin", maxAge: 12 * 60 * 60,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE, "", { httpOnly: true, sameSite: "strict", path: "/api/beta/admin", maxAge: 0 });
  return response;
}
