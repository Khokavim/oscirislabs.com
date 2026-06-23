import { NextResponse } from "next/server";

export function unavailableStorageResponse() {
  return NextResponse.json(
    {
      error: "Storage unavailable",
      detail:
        "Configured job storage is not reachable. Check DATABASE_URL and database connectivity.",
    },
    { status: 503 }
  );
}

export async function withStorageGuard(
  operation: () => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    return await operation();
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (
      message.includes("Postgres unavailable") ||
      message.includes("connect") ||
      message.includes("ECONN") ||
      message.includes("timeout")
    ) {
      return unavailableStorageResponse();
    }

    throw error;
  }
}
