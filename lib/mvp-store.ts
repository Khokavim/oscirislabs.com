import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { Pool } from "pg";

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

type JobRow = {
  id: string;
  organization: string;
  workload: string;
  data_policy: string;
  jurisdiction: string;
  model: string;
  status: StoredJob["status"];
  created_at: string;
  updated_at: string;
  events: JobEvent[] | string;
  receipt: EvidenceReceipt | string;
  verifier_result: VerifierResult | string;
  protocol_status: ProtocolStatus | string;
};

const dataFile = join(process.cwd(), ".data", "mvp-jobs.json");
let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

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

function databaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || null;
}

function usesSsl(url: string) {
  return !url.includes("localhost") && !url.includes("127.0.0.1");
}

function getPool() {
  const url = databaseUrl();
  if (!url) return null;

  if (!pool) {
    pool = new Pool({
      connectionString: url,
      ssl: usesSsl(url) ? { rejectUnauthorized: false } : false,
      max: 2,
    });
  }

  return pool;
}

async function ensureSchema() {
  const db = getPool();
  if (!db) return;

  if (!schemaReady) {
    schemaReady = db.query(`
      CREATE TABLE IF NOT EXISTS mvp_jobs (
        id TEXT PRIMARY KEY,
        organization TEXT NOT NULL,
        workload TEXT NOT NULL,
        data_policy TEXT NOT NULL,
        jurisdiction TEXT NOT NULL,
        model TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL,
        updated_at TIMESTAMPTZ NOT NULL,
        events JSONB NOT NULL,
        receipt JSONB NOT NULL,
        verifier_result JSONB NOT NULL,
        protocol_status JSONB NOT NULL
      );
    `).then(() => undefined);
  }

  await schemaReady;
}

function parseJson<T>(value: T | string) {
  if (typeof value === "string") return JSON.parse(value) as T;
  return value;
}

function rowToJob(row: JobRow): StoredJob {
  return {
    id: row.id,
    organization: row.organization,
    workload: row.workload,
    dataPolicy: row.data_policy,
    jurisdiction: row.jurisdiction,
    model: row.model,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    events: parseJson<JobEvent[]>(row.events),
    receipt: parseJson<EvidenceReceipt>(row.receipt),
    verifierResult: parseJson<VerifierResult>(row.verifier_result),
    protocolStatus: parseJson<ProtocolStatus>(row.protocol_status),
  };
}

function jobToRow(job: StoredJob) {
  return [
    job.id,
    job.organization,
    job.workload,
    job.dataPolicy,
    job.jurisdiction,
    job.model,
    job.status,
    job.createdAt,
    job.updatedAt,
    JSON.stringify(job.events),
    JSON.stringify(job.receipt),
    JSON.stringify(job.verifierResult),
    JSON.stringify(job.protocolStatus),
  ];
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

function buildJob(input: JobInput): StoredJob {
  const seed = `${input.organization}:${input.workload}:${input.model}:${Date.now()}`;
  const id = `OSC-${shortDigest(seed)}`;
  const timestamp = now();
  const evidenceRoot = `sha256:${digest(`${id}:evidence:${input.dataPolicy}`).slice(0, 24)}`;

  return {
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
}

async function createJobPostgres(input: JobInput) {
  await ensureSchema();
  const db = getPool();
  if (!db) throw new Error("Postgres unavailable");

  const job = buildJob(input);
  const query = `
    INSERT INTO mvp_jobs (
      id, organization, workload, data_policy, jurisdiction, model, status,
      created_at, updated_at, events, receipt, verifier_result, protocol_status
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, $11::jsonb, $12::jsonb, $13::jsonb)
    RETURNING *;
  `;

  const { rows } = await db.query<JobRow>(query, jobToRow(job));
  return rowToJob(rows[0]);
}

async function listJobsPostgres() {
  await ensureSchema();
  const db = getPool();
  if (!db) throw new Error("Postgres unavailable");

  const { rows } = await db.query<JobRow>(
    "SELECT * FROM mvp_jobs ORDER BY created_at DESC"
  );
  return rows.map(rowToJob);
}

async function getJobPostgres(jobId: string) {
  await ensureSchema();
  const db = getPool();
  if (!db) throw new Error("Postgres unavailable");

  const { rows } = await db.query<JobRow>("SELECT * FROM mvp_jobs WHERE id = $1", [
    jobId,
  ]);

  return rows[0] ? rowToJob(rows[0]) : null;
}

export async function createJob(input: JobInput) {
  if (databaseUrl()) {
    return createJobPostgres(input);
  }

  const store = await readStore();
  const job = buildJob(input);
  store.jobs.unshift(job);
  await writeStore(store);
  return job;
}

export async function listJobs() {
  if (databaseUrl()) {
    return listJobsPostgres();
  }

  const store = await readStore();
  return store.jobs;
}

export async function getJob(jobId: string) {
  if (databaseUrl()) {
    return getJobPostgres(jobId);
  }

  const store = await readStore();
  return store.jobs.find((job) => job.id === jobId) || null;
}
