"use client";

import { FormEvent, useEffect, useState } from "react";
import { PageShell } from "@/components/PageShell";
import type { StoredJob } from "@/lib/mvp-store";

const steps = ["Submit Job", "Job Status", "Evidence Receipt", "Verifier Result"];

type RuntimeHealth = {
  ok: boolean;
  runtime: string;
  store: {
    mode: "postgres" | "file";
    databaseConfigured: boolean;
    databaseReachable: boolean;
  };
};

type JobForm = {
  organization: string;
  workload: string;
  dataPolicy: string;
  jurisdiction: string;
  model: string;
};

const initialJob: JobForm = {
  organization: "Tier-1 Bank Pilot",
  workload: "Private compliance assistant evaluation",
  dataPolicy: "DSP prepared artifacts only",
  jurisdiction: "Nigeria / controlled cloud region",
  model: "Qwen 7B policy QA baseline",
};

export default function PilotAppPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [step, setStep] = useState(0);
  const [job, setJob] = useState<JobForm>(initialJob);
  const [submittedJob, setSubmittedJob] = useState<StoredJob | null>(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [runtimeHealth, setRuntimeHealth] = useState<RuntimeHealth | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadHealth() {
      try {
        const response = await fetch("/api/health", { cache: "no-store" });
        if (!response.ok) return;
        const data = (await response.json()) as RuntimeHealth;
        if (!cancelled) {
          setRuntimeHealth(data);
        }
      } catch {
        // Keep the app usable even if health introspection fails.
      }
    }

    loadHealth();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accessCode }),
    });

    if (response.ok) {
      const data = (await response.json()) as { token: string };
      setToken(data.token);
      setAuthenticated(true);
    } else {
      setError("Access code rejected.");
    }

    setLoading(false);
  }

  async function submitJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });

    if (response.ok) {
      const data = (await response.json()) as { job: StoredJob };
      setSubmittedJob(data.job);
      setStep(1);
    } else {
      setError("Job submission failed.");
    }

    setLoading(false);
  }

  async function downloadReceipt() {
    if (!submittedJob) return;
    setLoading(true);
    setError("");

    const response = await fetch(`/api/jobs/${submittedJob.id}/receipt`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      setError("Receipt export failed.");
      setLoading(false);
      return;
    }

    const data = await response.json();
    const blob = new Blob([JSON.stringify(data.receipt, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${submittedJob.id.toLowerCase()}-receipt.json`;
    link.click();
    URL.revokeObjectURL(url);
    setLoading(false);
  }

  return (
    <PageShell>
      <main className="app-shell">
        {!authenticated ? (
          <section className="auth-panel">
            <p className="eyebrow">Private pilot</p>
            <h1>Access the OSCIRIS workflow.</h1>
            <p>
              Demo access shows the buyer journey: submit a private AI workload,
              track status, inspect evidence, and review verifier output.
            </p>
            <form onSubmit={handleAuth}>
              <label htmlFor="access-code">Access code</label>
              <input
                id="access-code"
                value={accessCode}
                onChange={(event) => setAccessCode(event.target.value)}
                placeholder="pilot"
              />
              <button className="button primary" type="submit" disabled={loading}>
                {loading ? "Checking..." : "Enter pilot app"}
              </button>
            </form>
            {error ? <span className="demo-note">{error}</span> : null}
            <span className="demo-note">Private pilot access enabled.</span>
            {runtimeHealth ? (
              <div className="receipt-preview">
                <span>Runtime storage</span>
                <strong>{runtimeHealth.store.mode === "postgres" ? "Postgres" : "File fallback"}</strong>
                <p>
                  {runtimeHealth.store.mode === "postgres"
                    ? runtimeHealth.store.databaseReachable
                      ? "Database configured and reachable."
                      : "Database configured but not reachable."
                    : "No database configured yet. Jobs persist in local runtime storage."}
                </p>
              </div>
            ) : null}
          </section>
        ) : (
          <>
            <section className="app-header">
              <div>
                <p className="eyebrow">Authenticated demo</p>
                <h1>Private workload control room.</h1>
                <p>
                  One buyer flow. Four screens. Clear proof state.
                </p>
                {runtimeHealth ? (
                  <p className="demo-note">
                    Storage:{" "}
                    {runtimeHealth.store.mode === "postgres"
                      ? runtimeHealth.store.databaseReachable
                        ? "Postgres live"
                        : "Postgres configured, connection pending"
                      : "file fallback"}
                  </p>
                ) : null}
              </div>
              <button
                className="button secondary"
                type="button"
                onClick={() => {
                  setAuthenticated(false);
                  setStep(0);
                  setToken("");
                  setSubmittedJob(null);
                }}
              >
                Sign out
              </button>
            </section>

            <nav className="app-steps" aria-label="Pilot workflow">
              {steps.map((label, index) => (
                <button
                  key={label}
                  className={index === step ? "active" : ""}
                  type="button"
                  onClick={() => setStep(index)}
                  disabled={index > 0 && !submittedJob}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {label}
                </button>
              ))}
            </nav>

            {step === 0 ? (
              <section className="app-card">
                <div>
                  <p className="eyebrow">Submit job</p>
                  <h2>Define the workload and policy.</h2>
                </div>
                <form className="job-form" onSubmit={submitJob}>
                  <Field label="Organization">
                    <input
                      value={job.organization}
                      onChange={(event) => setJob({ ...job, organization: event.target.value })}
                    />
                  </Field>
                  <Field label="Workload">
                    <input
                      value={job.workload}
                      onChange={(event) => setJob({ ...job, workload: event.target.value })}
                    />
                  </Field>
                  <Field label="Data policy">
                    <select
                      value={job.dataPolicy}
                      onChange={(event) => setJob({ ...job, dataPolicy: event.target.value })}
                    >
                      <option>DSP prepared artifacts only</option>
                      <option>Permissioned raw-data enclave</option>
                      <option>Synthetic-data benchmark only</option>
                    </select>
                  </Field>
                  <Field label="Jurisdiction">
                    <input
                      value={job.jurisdiction}
                      onChange={(event) => setJob({ ...job, jurisdiction: event.target.value })}
                    />
                  </Field>
                  <Field label="Model target">
                    <select
                      value={job.model}
                      onChange={(event) => setJob({ ...job, model: event.target.value })}
                    >
                      <option>Qwen 7B policy QA baseline</option>
                      <option>Mistral 7B adaptation check</option>
                      <option>Bedrock Qwen3-Coder procurement baseline</option>
                    </select>
                  </Field>
                  {error ? <span className="demo-note">{error}</span> : null}
                  <button className="button primary" type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit pilot job"}
                  </button>
                </form>
              </section>
            ) : null}

            {step === 1 && submittedJob ? (
              <section className="app-card">
                <div>
                  <p className="eyebrow">Job status</p>
                  <h2>{submittedJob.id}</h2>
                </div>
                <div className="status-grid">
                  {submittedJob.events.map((event) => (
                    <Status key={event.label} label={event.label} value={event.detail} />
                  ))}
                </div>
                <div className="receipt-preview">
                  <span>Workload</span>
                  <strong>{submittedJob.workload}</strong>
                  <p>{submittedJob.dataPolicy}. Routed for {submittedJob.jurisdiction}.</p>
                </div>
                <button className="button primary" type="button" onClick={() => setStep(2)}>
                  View evidence receipt
                </button>
              </section>
            ) : null}

            {step === 2 && submittedJob ? (
              <section className="app-card">
                <div>
                  <p className="eyebrow">Evidence receipt</p>
                  <h2>Audit-ready package.</h2>
                </div>
                <div className="receipt-ledger">
                  <ReceiptRow label="Job ID" value={submittedJob.receipt.jobId} />
                  <ReceiptRow label="Evidence root" value={submittedJob.receipt.evidenceRoot} />
                  <ReceiptRow label="Manifest" value={submittedJob.receipt.manifest} />
                  <ReceiptRow label="Provider receipt" value={submittedJob.receipt.providerReceipt} />
                  <ReceiptRow label="Cost-to-quality" value={submittedJob.receipt.costToQuality} />
                </div>
                <div className="hero-actions">
                  <button className="button secondary" type="button" onClick={downloadReceipt}>
                    Download JSON receipt
                  </button>
                  <button className="button primary" type="button" onClick={() => setStep(3)}>
                    Review verifier result
                  </button>
                </div>
              </section>
            ) : null}

            {step === 3 && submittedJob ? (
              <section className="app-card verifier-result">
                <div>
                  <p className="eyebrow">Verifier result</p>
                  <h2>Accepted with scoped evidence.</h2>
                </div>
                <div className="verifier-panel">
                  <strong>Quorum: {submittedJob.verifierResult.quorum}</strong>
                  <p>
                    {submittedJob.verifierResult.notes}
                  </p>
                </div>
                <div className="status-grid">
                  <Status label="Verifier" value={submittedJob.verifierResult.verifier} />
                  <Status label="Decision" value={submittedJob.verifierResult.decision} />
                  <Status label="Settlement" value={submittedJob.verifierResult.settlement} />
                  <Status label="Horizen anchor" value={submittedJob.protocolStatus.horizenAnchor} />
                </div>
              </section>
            ) : null}
          </>
        )}
      </main>
    </PageShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <article>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
