import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "MVP",
  description:
    "OSCIRIS MVP path: private AI job submission, DSP transformation, provider execution, verifier receipts, evidence export, and Horizen testnet coordination.",
};

const mvpFlow = [
  {
    step: "01",
    title: "Submit workload",
    body:
      "A buyer submits an AI training, inference, or evaluation workload with privacy tier, jurisdiction policy, model target, and evidence requirements.",
  },
  {
    step: "02",
    title: "Prepare DSP artifact",
    body:
      "DSP transforms sensitive inputs into controlled training or inference surfaces before they are routed to external compute.",
  },
  {
    step: "03",
    title: "Assign provider",
    body:
      "Provider capability, hardware class, policy fit, collateral status, and workload requirements determine the assigned compute node.",
  },
  {
    step: "04",
    title: "Execute and capture evidence",
    body:
      "The provider runs the workload and emits signed execution receipts, manifests, logs, model metrics, and cost-to-quality telemetry.",
  },
  {
    step: "05",
    title: "Verify result",
    body:
      "Verifier nodes inspect the evidence bundle, accept or reject the result, and produce signed verification receipts for quorum.",
  },
  {
    step: "06",
    title: "Export receipt state",
    body:
      "The MVP exports buyer-visible receipts and testnet-ready records for settlement status, challenge handling, and audit review.",
  },
];

const readiness = [
  {
    label: "Protocol state",
    value: "Working",
    detail: "multi-host provider, verifier, quorum, challenge, and settlement-ready lifecycle",
  },
  {
    label: "Privacy layer",
    value: "Working",
    detail: "DSP benchmark and privacy threat-model artifacts with bounded evidence",
  },
  {
    label: "Buyer surface",
    value: "MVP",
    detail: "static product demo and private-review path before authenticated app buildout",
  },
  {
    label: "Onchain path",
    value: "Testnet",
    detail: "Horizen contracts deployed for provider registry, receipt registry, and job escrow",
  },
];

const artifacts = [
  {
    title: "Job receipt",
    body:
      "Signed provider execution record with job ID, assigned provider, model target, evidence root, runtime metadata, and receipt signature.",
  },
  {
    title: "Verifier receipt",
    body:
      "Signed acceptance or rejection record with verifier identity, policy checks, evidence hash, and quorum contribution.",
  },
  {
    title: "Evidence bundle",
    body:
      "Sanitized package containing manifests, benchmark outputs, logs, hashes, redaction manifest, and reviewer-facing proof index.",
  },
  {
    title: "Settlement status",
    body:
      "Challenge-window and quorum state that shows whether a job is blocked, rejected, accepted, or settlement-ready.",
  },
];

export default function MvpPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="MVP path" title="From private workload to verifiable AI receipt.">
          <p>
            The OSCIRIS MVP is a proof-backed workflow: submit a private AI workload,
            prepare it with DSP, run it on assigned compute, verify the output, and
            export auditable receipts for buyer review and testnet settlement.
          </p>
        </PageHero>

        <section className="mvp-readiness" aria-label="OSCIRIS MVP readiness">
          {readiness.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="mvp-flow" aria-label="OSCIRIS MVP flow">
          {mvpFlow.map((item) => (
            <article key={item.step}>
              <span>{item.step}</span>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section className="split-section">
          <div className="section-copy">
            <p className="eyebrow">What the MVP proves</p>
            <h2>A buyer can inspect the workload result before trusting the network.</h2>
            <p>
              The MVP is intentionally narrow: one controlled private AI job, one assigned
              provider, one or more verifiers, signed receipts, sanitized evidence, and a
              clear settlement status. That is the smallest useful product proof for
              regulated buyers.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/resources/#protocol-proof">View protocol proof</ButtonLink>
              <ButtonLink href="mailto:info@oscirislabs.com" variant="secondary">
                Request MVP demo
              </ButtonLink>
            </div>
          </div>

          <div className="artifact-grid">
            {artifacts.map((artifact) => (
              <article key={artifact.title}>
                <h3>{artifact.title}</h3>
                <p>{artifact.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}
