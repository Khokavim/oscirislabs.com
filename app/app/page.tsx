"use client";

import { FormEvent, useMemo, useState } from "react";
import { PageShell } from "@/components/PageShell";

const steps = ["Submit Job", "Job Status", "Evidence Receipt", "Verifier Result"];

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
  const [submittedJob, setSubmittedJob] = useState<JobForm | null>(null);

  const jobId = useMemo(() => {
    if (!submittedJob) return "OSC-PILOT-DRAFT";
    const seed = `${submittedJob.organization}-${submittedJob.workload}-${submittedJob.model}`;
    let hash = 0;
    for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    return `OSC-${hash.toString(16).toUpperCase().slice(0, 8)}`;
  }, [submittedJob]);

  function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (accessCode.trim().toLowerCase() === "pilot") {
      setAuthenticated(true);
    }
  }

  function submitJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittedJob(job);
    setStep(1);
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
              <button className="button primary" type="submit">
                Enter pilot app
              </button>
            </form>
            <span className="demo-note">Demo code: pilot. Backend authentication comes next.</span>
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
              </div>
              <button
                className="button secondary"
                type="button"
                onClick={() => {
                  setAuthenticated(false);
                  setStep(0);
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
                  <button className="button primary" type="submit">
                    Submit pilot job
                  </button>
                </form>
              </section>
            ) : null}

            {step === 1 && submittedJob ? (
              <section className="app-card">
                <div>
                  <p className="eyebrow">Job status</p>
                  <h2>{jobId}</h2>
                </div>
                <div className="status-grid">
                  <Status label="DSP preparation" value="Complete" />
                  <Status label="Provider assignment" value="Provider A10G-01" />
                  <Status label="Execution" value="Receipt emitted" />
                  <Status label="Challenge window" value="Open" />
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
                  <ReceiptRow label="Job ID" value={jobId} />
                  <ReceiptRow label="Evidence root" value="sha256:8f22...c91a" />
                  <ReceiptRow label="Manifest" value="dsp-policy-manifest.json" />
                  <ReceiptRow label="Provider receipt" value="signed: provider-a" />
                  <ReceiptRow label="Cost-to-quality" value="bounded benchmark attached" />
                </div>
                <button className="button primary" type="button" onClick={() => setStep(3)}>
                  Review verifier result
                </button>
              </section>
            ) : null}

            {step === 3 && submittedJob ? (
              <section className="app-card verifier-result">
                <div>
                  <p className="eyebrow">Verifier result</p>
                  <h2>Accepted with scoped evidence.</h2>
                </div>
                <div className="verifier-panel">
                  <strong>Quorum: accepted</strong>
                  <p>
                    Verifier confirms evidence hash, provider signature, policy manifest,
                    and receipt availability. Settlement remains testnet/demo scoped.
                  </p>
                </div>
                <div className="status-grid">
                  <Status label="Verifier" value="verifier-1" />
                  <Status label="Decision" value="Accepted" />
                  <Status label="Settlement" value="Ready after challenge window" />
                  <Status label="Export" value="Reviewer pack available" />
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
