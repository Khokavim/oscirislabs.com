import { NextResponse } from "next/server";
import { withStorageGuard } from "@/lib/mvp-api";
import { createJob, listJobs, requireToken, type JobInput } from "@/lib/mvp-store";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function GET(request: Request) {
  if (!requireToken(request.headers.get("authorization"))) return unauthorized();
  return withStorageGuard(async () => NextResponse.json({ jobs: await listJobs() }));
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

  return withStorageGuard(async () => {
    const job = await createJob(body as JobInput);
    return NextResponse.json({ job }, { status: 201 });
  });
}
