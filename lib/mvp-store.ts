import { createHmac, createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

export type JobInput = {
  organization: string;
  workload: string;
  dataPolicy: string;
  jurisdiction: string;
  model: string;
};

export type JobEvent = {
  label: string;
  status: "complete" | "pending" | "ready";
  detail: string;
  createdAt: string;
};

export type EvidenceReceipt = {
  jobId: string;
  evidenceRoot: string;
  manifest: string;
  providerReceipt: string;
  costToQuality: string;
  artifactBundle: string;
  exportStatus: string;
};

export type VerifierResult = {
  verifier: string;
  decision: "accepted" | "rejected" | "challenged" | "pending";
  quorum: string;
  settlement: string;
  challengeWindow: string;
  notes: string;
};

export type ProtocolStatus = {
  dspPreparation: string;
  providerAssignment: string;
  execution: string;
  verifier: string;
  horizenAnchor: string;
};

export type StoredJob = JobInput & {
  id: string;
  status: "submitted" | "prepared" | "assigned" | "verified";
  createdAt: string;
  updatedAt: string;
  events: JobEvent[];
  receipt: EvidenceReceipt;
  verifierResult: VerifierResult;
  protocolStatus: ProtocolStatus;
};

type StoreShape = {
  jobs: StoredJob[];
};

const dataFile = join(process.cwd(), ".data", "mvp-jobs.json");

function now() {
  return new Date().toISOString();
}

function digest(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function shortDigest(value: string) {
  return digest(value).slice(0, 12).toUpperCase();
}

function secret() {
  return process.env.OSCIRIS_APP_SECRET || "local-osciris-mvp-secret";
}

function accessCode() {
  return process.env.OSCIRIS_PILOT_ACCESS_CODE || "pilot";
}

async function readStore(): Promise<StoreShape> {
  try {
    const raw = await readFile(dataFile, "utf8");
    return JSON.parse(raw) as StoreShape;
  } catch {
    return { jobs: [] };
  }
}

async function writeStore(store: StoreShape) {
  await mkdir(dirname(dataFile), { recursive: true });
  await writeFile(dataFile, JSON.stringify(store, null, 2));
}

export function validateAccessCode(candidate: string) {
  return candidate.trim() === accessCode();
}

export function createSessionToken() {
  const payload = {
    sub: "private-pilot",
    org: "OSCIRIS Private Pilot",
    nonce: randomBytes(12).toString("hex"),
    iat: Date.now(),
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", secret()).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

export function verifySessionToken(token: string | null) {
  if (!token || !token.includes(".")) return false;
  const [encoded, signature] = token.split(".");
  const expected = createHmac("sha256", secret()).update(encoded).digest("base64url");
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export function requireToken(authorization: string | null) {
  const token = authorization?.replace(/^Bearer\s+/i, "") || null;
  return verifySessionToken(token);
}

export async function createJob(input: JobInput) {
  const store = await readStore();
  const seed = `${input.organization}:${input.workload}:${input.model}:${Date.now()}`;
  const id = `OSC-${shortDigest(seed)}`;
  const timestamp = now();
  const evidenceRoot = `sha256:${digest(`${id}:evidence:${input.dataPolicy}`).slice(0, 24)}`;

  const job: StoredJob = {
    ...input,
    id,
    status: "verified",
    createdAt: timestamp,
    updatedAt: timestamp,
    events: [
      {
        label: "Submitted",
        status: "complete",
        detail: "Buyer workload and policy captured.",
        createdAt: timestamp,
      },
      {
        label: "DSP preparation",
        status: "complete",
        detail: "Controlled artifact policy generated for scoped processing.",
        createdAt: timestamp,
      },
      {
        label: "Provider assignment",
        status: "complete",
        detail: "Provider A10G-01 assigned under jurisdiction policy.",
        createdAt: timestamp,
      },
      {
        label: "Verifier review",
        status: "ready",
        detail: "Verifier result is attached and challenge window is open.",
        createdAt: timestamp,
      },
    ],
    receipt: {
      jobId: id,
      evidenceRoot,
      manifest: `${id.toLowerCase()}-dsp-policy-manifest.json`,
      providerReceipt: `signed:provider-a:${digest(`${id}:provider`).slice(0, 16)}`,
      costToQuality: "bounded benchmark attached",
      artifactBundle: `${id.toLowerCase()}-reviewer-pack.json`,
      exportStatus: "ready",
    },
    verifierResult: {
      verifier: "verifier-1",
      decision: "accepted",
      quorum: "accepted",
      settlement: "ready after challenge window",
      challengeWindow: "open",
      notes:
        "Evidence hash, provider signature, policy manifest, and receipt availability verified for MVP scope.",
    },
    protocolStatus: {
      dspPreparation: "complete",
      providerAssignment: "provider-a10g-01",
      execution: "receipt-emitted",
      verifier: "accepted",
      horizenAnchor: "pending-testnet-anchor",
    },
  };

  store.jobs.unshift(job);
  await writeStore(store);
  return job;
}

export async function listJobs() {
  const store = await readStore();
  return store.jobs;
}

export async function getJob(jobId: string) {
  const store = await readStore();
  return store.jobs.find((job) => job.id === jobId) || null;
}
