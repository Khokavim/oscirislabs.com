import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type PublishedProofAnchor = {
  id: string;
  anchorType: "receipt_availability" | "verification_receipt" | "milestone" | "snapshot";
  subject: string;
  status: string;
  commitmentHash: string;
  bundleHash: string;
  reviewer: string;
  publishedAt: string;
  note: string;
};

export type PublishedProofFeed = {
  source: {
    label: string;
    mode: "bundle";
    url?: string;
    lastSyncedAt: string;
  };
  overview: typeof publishedProofOverview;
  publishingModel: typeof publishingModel;
  anchors: PublishedProofAnchor[];
  receipts: PublishedProofAnchor[];
};

export const publishedProofOverview = [
  {
    label: "Source of truth",
    value: "Reviewed participant snapshot",
    detail: "The public proof feed is published from the participant snapshot bundle.",
  },
  {
    label: "Anchoring mode",
    value: "Hashes and receipts first",
    detail: "The surface publishes commitments, verifier results, and milestone hashes rather than raw payloads.",
  },
  {
    label: "Operational storage",
    value: "OSCIRISLABS/public",
    detail: "The website consumes the read-only bundle from the public directory.",
  },
  {
    label: "Current mode",
    value: "Read-only proof console",
    detail: "Reviewers can inspect status and proof anchors without mutating protocol state.",
  },
] as const;

export const publishingModel = [
  {
    title: "Published asynchronously",
    body: "OSCIRIS publishes reviewed snapshots after the local protocol state is finalized for the current evidence window.",
  },
  {
    title: "Hash-led public surface",
    body: "The public feed carries commitments, receipt hashes, verifier status, and milestone hashes instead of raw evidence bundles.",
  },
  {
    title: "Read-only review path",
    body: "The website is a public proof surface, not an operational control plane.",
  },
] as const;

function isPublishedProofAnchor(value: unknown): value is PublishedProofAnchor {
  if (!value || typeof value !== "object") return false;
  const anchor = value as Record<string, unknown>;
  const stringFields = [
    "id",
    "anchorType",
    "subject",
    "status",
    "commitmentHash",
    "bundleHash",
    "reviewer",
    "publishedAt",
    "note",
  ] as const;
  return stringFields.every((field) => typeof anchor[field] === "string");
}

function normalizeAnchors(value: unknown): PublishedProofAnchor[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isPublishedProofAnchor);
}

function emptyFeed(): PublishedProofFeed {
  return {
    source: {
      label: "No published bundle",
      mode: "bundle",
      lastSyncedAt: new Date().toISOString(),
    },
    anchors: [],
    receipts: [],
    overview: publishedProofOverview,
    publishingModel,
  };
}

async function loadPublishedBundle(): Promise<PublishedProofFeed | null> {
  const bundlePath =
    process.env.OSCIRIS_PUBLISHED_FEED_PATH?.trim() ||
    join(process.cwd(), "public", "proof-feed.json");

  try {
    const raw = await readFile(bundlePath, "utf8");
    const payload = JSON.parse(raw) as {
      source?: { label?: string; url?: string; lastSyncedAt?: string };
      lastSyncedAt?: string;
      anchors?: unknown;
      receipts?: unknown;
    };

    const anchors = normalizeAnchors(payload.anchors ?? payload.receipts);
    if (!anchors.length) return null;

    return {
      source: {
        label: payload.source?.label || "Published proof bundle",
        mode: "bundle",
        url: payload.source?.url || bundlePath,
        lastSyncedAt: payload.source?.lastSyncedAt || payload.lastSyncedAt || new Date().toISOString(),
      },
      anchors,
      receipts: anchors,
      overview: publishedProofOverview,
      publishingModel,
    };
  } catch {
    return null;
  }
}

export async function loadPublishedProofFeed(): Promise<PublishedProofFeed> {
  const publishedBundle = await loadPublishedBundle();
  if (publishedBundle) {
    return publishedBundle;
  }

  return emptyFeed();
}
