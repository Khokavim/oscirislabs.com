import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { STATUSES, type ApplicationStatus } from "@/lib/beta";
import { isAdmin, listApplications, setStatus, type Application } from "@/lib/beta-store";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

async function authorised(): Promise<boolean> {
  return isAdmin((await cookies()).get("osciris_beta_admin")?.value);
}

const COLUMNS: Array<[string, (a: Application) => string | number | null]> = [
  ["reference", (a) => a.reference], ["created_at", (a) => a.createdAt], ["status", (a) => a.status],
  ["name", (a) => a.name], ["email", (a) => a.email], ["whatsapp", (a) => a.whatsapp], ["country", (a) => a.country],
  ["platform", (a) => a.platform], ["device", (a) => a.device], ["memory_gb", (a) => a.memoryGb],
  ["os", (a) => a.os], ["hours", (a) => a.hours], ["eligibility", (a) => a.eligibility.status],
  ["hostable_shards", (a) => a.eligibility.hostableShards], ["source", (a) => a.source], ["note", (a) => a.note],
  ["updated_at", (a) => a.updatedAt],
];

function csvCell(value: string | number | null): string {
  let text = value == null ? "" : String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = "'" + text; // keep spreadsheet formulas inert
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export async function GET(request: Request) {
  if (!(await authorised())) return NextResponse.json({ ok: false, error: "Sign in again." }, { status: 401 });
  const applications = await listApplications();
  if (new URL(request.url).searchParams.get("format") === "csv") {
    const rows = [COLUMNS.map(([name]) => name).join(","), ...applications.map((a) => COLUMNS.map(([, get]) => csvCell(get(a))).join(","))];
    return new NextResponse(rows.join("\r\n") + "\r\n", {
      headers: {
        "content-type": "text/csv; charset=utf-8",
        "content-disposition": `attachment; filename="osciris-beta-applications-${new Date().toISOString().slice(0, 10)}.csv"`,
        "cache-control": "no-store",
      },
    });
  }
  return NextResponse.json({ ok: true, applications }, { headers: { "cache-control": "no-store" } });
}

export async function PATCH(request: Request) {
  if (!(await authorised())) return NextResponse.json({ ok: false, error: "Sign in again." }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as { id?: unknown; status?: unknown; note?: unknown };
  if (typeof body.id !== "string" || !STATUSES.includes(body.status as ApplicationStatus)) {
    return NextResponse.json({ ok: false, error: "Choose an application and a status." }, { status: 400 });
  }
  const updated = await setStatus(body.id, body.status as ApplicationStatus, typeof body.note === "string" ? body.note : "");
  if (!updated) return NextResponse.json({ ok: false, error: "That application no longer exists." }, { status: 404 });
  return NextResponse.json({ ok: true, application: updated });
}
