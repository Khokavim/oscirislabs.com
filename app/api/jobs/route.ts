import { NextResponse } from "next/server";
import { createJob, listJobs, requireToken, type JobInput } from "@/lib/mvp-store";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!requireToken(request.headers.get("authorization"))) return unauthorized();
  return NextResponse.json({ jobs: await listJobs() });
}

export async function POST(request: Request) {
  if (!requireToken(request.headers.get("authorization"))) return unauthorized();

  const body = (await request.json().catch(() => ({}))) as Partial<JobInput>;
  const required: Array<keyof JobInput> = [
    "organization",
    "workload",
    "dataPolicy",
    "jurisdiction",
    "model",
  ];

  for (const key of required) {
    if (!body[key]) {
      return NextResponse.json({ error: `Missing ${key}` }, { status: 400 });
    }
  }

  const job = await createJob(body as JobInput);
  return NextResponse.json({ job }, { status: 201 });
}
