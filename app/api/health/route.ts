import { NextResponse } from "next/server";
import { getStoreRuntimeStatus } from "@/lib/mvp-store";

export async function GET() {
  const store = await getStoreRuntimeStatus();

  return NextResponse.json({
    ok: true,
    service: "oscirislabs.com",
    runtime: "next-server",
    store,
  });
}
