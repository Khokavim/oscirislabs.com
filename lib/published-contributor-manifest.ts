import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type PublishedContributorManifestIdentity = {
  node_id: string;
  role: string;
  display_name: string;
  peer_id: string;
  identity_json: string;
};

export type PublishedContributorManifestWorkflowStep = {
  name: string;
  detail: string;
};

export type PublishedContributorManifestProofLink = {
  label: string;
  url: string;
  detail: string;
};

export type PublishedContributorManifest = {
  generated_at: string;
  source_path: string | null;
  install: string;
  identities: {
    enterprise: PublishedContributorManifestIdentity;
    provider: PublishedContributorManifestIdentity;
    verifier: PublishedContributorManifestIdentity;
  };
  workflow: PublishedContributorManifestWorkflowStep[];
  public_proofs: PublishedContributorManifestProofLink[];
  note: string;
};

export async function loadPublishedContributorManifest(): Promise<PublishedContributorManifest | null> {
  const manifestPath =
    process.env.OSCIRIS_PUBLISHED_CONTRIBUTOR_MANIFEST_PATH?.trim() ||
    join(process.cwd(), "public", "contributor-manifest.json");

  try {
    const raw = await readFile(manifestPath, "utf8");
    const payload = JSON.parse(raw) as PublishedContributorManifest;
    if (!payload || typeof payload !== "object" || !Array.isArray(payload.workflow)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
