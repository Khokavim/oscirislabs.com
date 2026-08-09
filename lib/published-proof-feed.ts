import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type PublicProof = {
  status: string;
  commitmentHash: string;
};

export type PublishedProofFeed = {
  status: {
    execution: string;
    receipt: string;
    review: string;
  };
  proofs: PublicProof[];
};

const emptyFeed: PublishedProofFeed = {
  status: {
    execution: "Unavailable",
    receipt: "Unavailable",
    review: "Unavailable",
  },
  proofs: [],
};

function isProof(value: unknown): value is PublicProof {
  if (!value || typeof value !== "object") return false;
  const proof = value as Record<string, unknown>;
  return (
    typeof proof.status === "string" &&
    typeof proof.commitmentHash === "string" &&
    /^[a-f0-9]{64}$/i.test(proof.commitmentHash)
  );
}

export async function loadPublishedProofFeed(): Promise<PublishedProofFeed> {
  try {
    const raw = await readFile(join(process.cwd(), "public", "proof-feed.json"), "utf8");
    const payload = JSON.parse(raw) as Partial<PublishedProofFeed>;
    const status = payload.status;
    const proofs = Array.isArray(payload.proofs) ? payload.proofs.filter(isProof) : [];

    if (
      !status ||
      typeof status.execution !== "string" ||
      typeof status.receipt !== "string" ||
      typeof status.review !== "string"
    ) {
      return emptyFeed;
    }

    return { status, proofs };
  } catch {
    return emptyFeed;
  }
}
