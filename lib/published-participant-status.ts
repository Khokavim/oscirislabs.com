import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type PublishedParticipantStatusStage = {
  name: string;
  status: string;
  summary: string;
  facts: string[];
};

export type PublishedParticipantStatusReceiptAvailability = {
  announced_at: string;
  bundle_sha256: string;
  bundle_uri: string;
  execution_receipt_sha256: string;
  job_id: string;
  provider_ed25519_public_key_base64: string;
  provider_node_id: string;
  signature: string;
};

export type PublishedParticipantStatusVerificationReceipt = {
  bundle_sha256: string;
  checks: Record<string, unknown>[];
  failure_reasons: string[];
  job_id: string;
  receipt_id: string;
  receipt_sha256?: string;
  signature: string;
  signing_key_id: string;
  verification_receipt_id: string;
  verification_status: string;
  verified_at: string;
  verifier_id: string;
};

export type PublishedParticipantStatusMilestone = {
  contributing_node_ids: string[];
  evidence_bundle_sha256: string;
  job_id: string;
  job_type: string;
  milestone_id: string;
  published_at: string;
  published_by: string;
  quality_metric_name: string;
  quality_metric_value: number;
  signature: string;
  signing_key_id: string;
  summary: string;
  title: string;
  verification_receipt_sha256_list: string[];
};

export type PublishedParticipantStatusClaim = {
  claim_note: string | null;
  claimed_at: string;
  job_id: string;
  provider_ed25519_public_key_base64: string;
  provider_node_id: string;
  signature: string;
};

export type PublishedParticipantStatusChallenge = {
  challenge_id: string;
  job_id: string;
  status: string;
  reason_code?: string;
  reason_detail?: string | null;
  opened_at?: string;
  resolved_at?: string | null;
};

export type PublishedParticipantStatusSettlement = {
  accepted_verifier_count?: number;
  active_challenge_count?: number;
  assigned_provider_node_id?: string;
  bundle_sha256?: string;
  challenge_window_ends_at?: string | null;
  job_id?: string;
  lifecycle_state?: string;
  quorum_status?: string;
  rejected_challenge_count?: number;
  rejected_verifier_count?: number;
  required_verifier_count?: number;
  settlement_blockers?: string[];
  settlement_ready?: boolean;
  upheld_challenge_count?: number;
};

export type PublishedParticipantStatus = {
  generated_at: string;
  source_path: string | null;
  job_id: string;
  job_type: string;
  privacy_mode: string;
  payment_token: string;
  required_capability: string;
  submitter_node_id: string;
  assigned_provider_node_id: string;
  current_state: string;
  participant_summary: {
    assignment_present: boolean;
    challenge_count: number;
    claim_count: number;
    job_id: string;
    milestone_count: number;
    quorum_status: string;
    receipt_availability_count: number;
    settlement_lifecycle_state: string;
    verification_receipt_count: number;
  };
  counts: {
    claims: number;
    challenges: number;
    milestones: number;
    receipt_availability: number;
    verification_receipts: number;
  };
  stages: PublishedParticipantStatusStage[];
  job_announcement?: Record<string, unknown>;
  job_spec?: Record<string, unknown>;
  assignment?: Record<string, unknown>;
  quorum?: Record<string, unknown>;
  settlement?: PublishedParticipantStatusSettlement;
  receipt_availability?: PublishedParticipantStatusReceiptAvailability[];
  verification_receipts?: PublishedParticipantStatusVerificationReceipt[];
  milestones?: PublishedParticipantStatusMilestone[];
  claims?: PublishedParticipantStatusClaim[];
  challenges?: PublishedParticipantStatusChallenge[];
  published_from?: string;
  published_bundle?: string;
};

export async function loadPublishedParticipantStatus(): Promise<PublishedParticipantStatus | null> {
  const statusPath =
    process.env.OSCIRIS_PUBLISHED_PARTICIPANT_STATUS_PATH?.trim() ||
    join(process.cwd(), "public", "participant-status-summary.json");

  try {
    const raw = await readFile(statusPath, "utf8");
    const payload = JSON.parse(raw) as PublishedParticipantStatus;
    if (!payload || typeof payload !== "object" || !Array.isArray(payload.stages)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
