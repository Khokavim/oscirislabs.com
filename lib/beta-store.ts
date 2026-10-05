import { createHash, randomBytes, randomUUID, timingSafeEqual } from "node:crypto";
import { appendFile, chmod, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  CONSENT_VERSION, STATUSES, eligibility,
  type ApplicationStatus, type Eligibility, type SignupInput,
} from "./beta";

// Closed-beta applications live only on this server, in an append-only JSON
// Lines log under OSCIRIS_DATA_DIR (default: <site>/.data, which git ignores).
// Every change is a new line, so nothing is overwritten and the history stays.

const DATA_DIR = join(process.env.OSCIRIS_DATA_DIR || join(process.cwd(), ".data"), "beta");
const LOG = join(DATA_DIR, "applications.jsonl");
const TOKEN_FILE = join(DATA_DIR, "admin-token");

export type Application = SignupInput & {
  id: string;
  reference: string;
  createdAt: string;
  updatedAt: string;
  eligibility: Eligibility;
  status: ApplicationStatus;
  note: string;
  consentVersion: string;
};

type Event =
  | { type: "apply"; at: string; application: Application }
  | { type: "update"; at: string; id: string; fields: SignupInput; eligibility: Eligibility }
  | { type: "status"; at: string; id: string; status: ApplicationStatus; note: string };

let queue: Promise<unknown> = Promise.resolve();
function serial<T>(task: () => Promise<T>): Promise<T> {
  const run = queue.then(task, task);
  queue = run.catch(() => undefined);
  return run;
}

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true, mode: 0o700 });
}

async function readEvents(): Promise<Event[]> {
  try {
    const text = await readFile(LOG, "utf8");
    return text.split("\n").filter(Boolean).flatMap((line) => {
      try { return [JSON.parse(line) as Event]; } catch { return []; }
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

async function append(event: Event) {
  await ensureDir();
  await appendFile(LOG, JSON.stringify(event) + "\n", { mode: 0o600 });
}

function fold(events: Event[]): Application[] {
  const byId = new Map<string, Application>();
  for (const event of events) {
    if (event.type === "apply") byId.set(event.application.id, { ...event.application });
    const current = event.type !== "apply" ? byId.get(event.id) : undefined;
    if (!current) continue;
    if (event.type === "update") Object.assign(current, event.fields, { eligibility: event.eligibility, updatedAt: event.at });
    if (event.type === "status") Object.assign(current, { status: event.status, note: event.note, updatedAt: event.at });
  }
  return [...byId.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

function reference(): string {
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  const bytes = randomBytes(6);
  return "OSC-" + [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
}

/** Record an application. The same email updates the earlier application. */
export function saveApplication(input: SignupInput): Promise<{ application: Application; updated: boolean }> {
  return serial(async () => {
    const at = new Date().toISOString();
    const fit = eligibility(input.platform, input.memoryGb);
    const existing = fold(await readEvents()).find((a) => a.email === input.email);
    if (existing) {
      await append({ type: "update", at, id: existing.id, fields: input, eligibility: fit });
      return { application: { ...existing, ...input, eligibility: fit, updatedAt: at }, updated: true };
    }
    const application: Application = {
      ...input, id: randomUUID(), reference: reference(), createdAt: at, updatedAt: at,
      eligibility: fit, status: "new", note: "", consentVersion: CONSENT_VERSION,
    };
    await append({ type: "apply", at, application });
    return { application, updated: false };
  });
}

export async function listApplications(): Promise<Application[]> {
  return fold(await readEvents());
}

export function setStatus(id: string, status: ApplicationStatus, note: string): Promise<Application | null> {
  return serial(async () => {
    if (!STATUSES.includes(status)) return null;
    const current = fold(await readEvents()).find((a) => a.id === id);
    if (!current) return null;
    const at = new Date().toISOString();
    const clean = note.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, 500);
    await append({ type: "status", at, id, status, note: clean });
    return { ...current, status, note: clean, updatedAt: at };
  });
}

// ---- Admin token: generated on this server on first use, never committed. ----

async function adminToken(): Promise<string> {
  if (process.env.OSCIRIS_BETA_ADMIN_TOKEN && process.env.OSCIRIS_BETA_ADMIN_TOKEN.length >= 32) {
    return process.env.OSCIRIS_BETA_ADMIN_TOKEN;
  }
  try {
    const token = (await readFile(TOKEN_FILE, "utf8")).trim();
    if (token.length >= 32) return token;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }
  return serial(async () => {
    await ensureDir();
    const token = randomBytes(32).toString("base64url");
    await writeFile(TOKEN_FILE, token + "\n", { mode: 0o600, flag: "wx" }).catch(async (error) => {
      if ((error as NodeJS.ErrnoException).code !== "EEXIST") throw error;
    });
    await chmod(TOKEN_FILE, 0o600);
    return (await readFile(TOKEN_FILE, "utf8")).trim();
  });
}

const digest = (value: string) => createHash("sha256").update(value).digest();

export async function isAdmin(candidate: string | undefined | null): Promise<boolean> {
  if (!candidate) return false;
  return timingSafeEqual(digest(candidate), digest(await adminToken()));
}

// ---- Abuse limits (memory only; nothing about the visitor is stored). ----

const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (hits.get(key) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return recent.length > limit;
}

export function clientKey(headers: Headers): string {
  const ip = headers.get("cf-connecting-ip") || headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  return createHash("sha256").update(ip).digest("hex").slice(0, 16);
}
