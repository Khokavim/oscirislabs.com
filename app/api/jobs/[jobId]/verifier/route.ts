import { NextResponse } from "next/server";
import { withStorageGuard } from "@/lib/mvp-api";
import { getJob, requireToken } from "@/lib/mvp-store";

type RouteContext = {
  params: Promise<{ jobId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  if (!requireToken(request.headers.get("authorization"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return withStorageGuard(async () => {
    const { jobId } = await context.params;
    const job = await getJob(jobId);
    if (!job) return NextResponse.json({ error: "Job not found" }, { status: 404 });

    return NextResponse.json({ verifierResult: job.verifierResult });
  });
}
