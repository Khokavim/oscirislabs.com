import { ButtonLink } from "@/components/ButtonLink";
import { FeatureCard } from "@/components/FeatureCard";
import { PageShell } from "@/components/PageShell";

const whitepaperPdf = "/osciris-protocol-whitepaper.pdf";

const proofMetrics = [
  { label: "Privacy layer", value: "DSP", detail: "Data Shadow Protocol" },
  { label: "Training evidence", value: "7B QLoRA", detail: "bounded enterprise adaptation" },
  { label: "Inference evidence", value: "100 cases", detail: "Bedrock managed baseline" },
];

const evidenceCards = [
  {
    label: "Private training",
    value: "16.08%",
    title: "Qwen 7B adaptation savings",
    body:
      "Measured bounded 7B QLoRA enterprise adaptation showed positive cost-to-quality on AWS for Qwen-family training workloads.",
  },
  {
    label: "Private training",
    value: "12.55%",
    title: "Mistral 7B adaptation savings",
    body:
      "A second 7B-family run reproduced positive training economics while keeping the claim scoped to controlled enterprise adaptation.",
  },
  {
    label: "Managed inference",
    value: "40.49%",
    title: "Qwen3-Coder 480B Bedrock savings",
    body:
      "DSP-projected prompts improved measured cost-to-quality on a deterministic 100-case enterprise policy QA benchmark.",
  },
  {
    label: "Managed inference",
    value: "58.21%",
    title: "Qwen3-Coder 30B Bedrock savings",
    body:
      "The lower-cost Qwen3-Coder managed model showed the strongest bounded inference cost-to-quality result in the current evidence set.",
  },
];

const storageCards = [
  {
    title: "Content-addressed evidence",
    body:
      "OSCIRIS evidence bundles are designed to be hash-addressable so reviewers can verify that receipts, manifests, logs, and benchmark outputs have not changed.",
  },
  {
    title: "Filecoin availability path",
    body:
      "Filecoin is a candidate persistence layer for private or encrypted evidence bundles, adding decentralized storage incentives and storage-proof checks to the OSCIRIS evidence workflow.",
  },
  {
    title: "Chain roles stay separate",
    body:
      "Horizen remains the proof-receipt, escrow, challenge, and provider-accountability layer. Filecoin is positioned for evidence storage and retrieval, not AI execution.",
  },
];

const unlockCards = [
  {
    title: "Enterprise AI without raw-data sprawl",
    body:
      "DSP turns sensitive context into controlled training and inference surfaces so teams can measure utility without distributing raw enterprise data everywhere compute exists.",
  },
  {
    title: "GPU supply becomes auditable capacity",
    body:
      "OSCIRIS is designed to convert fragmented GPU providers into assignable, receipt-backed compute capacity with verifier checks and provider accountability.",
  },
  {
    title: "Cost-to-quality becomes a protocol metric",
    body:
      "Instead of buying opaque acceleration, customers can compare quality, token load, runtime, retries, and evidence availability before scaling workloads.",
  },
];

export default function Home() {
  return (
    <PageShell>
      <main className="home-main">
        <section className="hero">
          <div className="hero-copy">
            <h1>Private, Efficient AI Workloads on Decentralized Infrastructure</h1>
            <p className="hero-text">
              OSCIRIS applies the Data Shadow Protocol to enterprise training and
              inference, then wraps execution with verifier-backed receipts,
              provider accountability, and settlement-ready audit records.
            </p>
            <div className="hero-actions">
              <ButtonLink href={whitepaperPdf}>Download whitepaper</ButtonLink>
              <ButtonLink href="/resources" variant="secondary">
                View verification resources
              </ButtonLink>
            </div>
          </div>

          <div className="hero-spacer" aria-hidden="true" />
        </section>

        <section className="metrics-strip" aria-label="OSCIRIS validation highlights">
          {proofMetrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </div>
          ))}
        </section>

        <section className="statement-band">
          <p>
            DSP protects the data surface. Receipts, verifiers, and smart contracts make
            training and inference outcomes measurable before decentralized scale-out.
          </p>
        </section>

        <section className="unlock-section" aria-label="OSCIRIS commercial potential">
          <div className="section-copy">
            <p className="eyebrow">What OSCIRIS unlocks</p>
            <h2>A market for private AI compute that can be inspected, priced, and challenged.</h2>
            <p>
              The opportunity is not just cheaper GPUs. It is a new operating layer for
              enterprise AI: private data handling, measurable model quality, auditable
              execution, persistent evidence, and settlement logic that can make open
              compute usable by serious buyers.
            </p>
          </div>
          <div className="unlock-grid">
            {unlockCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="split-section">
          <div className="section-copy">
            <p className="eyebrow">Protocol stack</p>
            <h2>A protected compute layer for enterprise AI workloads.</h2>
            <p>
              OSCIRIS connects three layers: DSP transforms for privacy, measured
              cost-to-quality for training and inference, and Horizen smart contracts
              for verification coordination, policy checkpoints, escrow, and provider
              accountability.
            </p>
            <ButtonLink href="/whitepaper" variant="secondary">
              Open whitepaper overview
            </ButtonLink>
          </div>
          <div className="feature-grid">
            <FeatureCard
              tone="cyan"
              title="Data Shadow Protocol"
              body="Convert enterprise data into controlled training artifacts that preserve useful signal while reducing raw exposure."
              href={whitepaperPdf}
              linkLabel="Download whitepaper"
            />
            <FeatureCard
              tone="green"
              title="Training and inference"
              body="Run bounded adaptation and inference workloads through measurable privacy, quality, token, runtime, and cost controls."
              href="/resources"
              linkLabel="View resources"
            />
            <FeatureCard
              tone="amber"
              title="Proof-aware contracts"
              body="Use Horizen smart contracts to coordinate proof receipts, policy checks, escrow, provider accountability, and cost-to-quality validation."
              href="/resources"
              linkLabel="View verification layer"
            />
          </div>
        </section>

        <section className="evidence-section" aria-label="Latest OSCIRIS validation evidence">
          <div className="section-copy">
            <p className="eyebrow">Latest evidence</p>
            <h2>Training and inference are now both in the validation track.</h2>
            <p>
              Current results support bounded enterprise AI workloads, not a public
              production network claim. The strongest inference evidence compares DSP
              projected prompts against AWS Bedrock managed inference pricing.
            </p>
          </div>
          <div className="evidence-grid">
            {evidenceCards.map((card) => (
              <article key={card.title}>
                <span>{card.label}</span>
                <strong>{card.value}</strong>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
          <p className="evidence-boundary">
            Boundary: proven evidence covers bounded AWS training adaptation, AWS L40S
            single-host inference, and AWS Bedrock managed-inference procurement baselines.
            Decentralized inference market execution is the next protocol proof.
          </p>
        </section>

        <section className="blockchain-layer" aria-label="Horizen smart-contract verification layer">
          <div>
            <p className="eyebrow">Smart-contract coordination</p>
            <h2>Why the blockchain layer matters.</h2>
          </div>
          <div className="chain-grid">
            <article>
              <span>01</span>
              <h3>Proof receipt registry</h3>
              <p>Record job receipts, verification status, policy checkpoints, and provider accountability onchain.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Smart-contract controls</h3>
              <p>Contracts define verification requirements, job terms, provider accountability, and release conditions.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Cost-to-quality controls</h3>
              <p>Cost-to-quality, retry overhead, and worker reputation become measurable protocol state.</p>
            </article>
          </div>
        </section>

        <section className="storage-layer" aria-label="Filecoin evidence storage layer">
          <div className="section-copy">
            <p className="eyebrow">Evidence availability</p>
            <h2>Filecoin can extend the audit trail beyond the job receipt.</h2>
            <p>
              OSCIRIS uses signed receipts to prove what happened. The next storage
              layer is persistent availability for encrypted evidence bundles: manifests,
              logs, verifier outputs, model metrics, and procurement baselines that
              reviewers can retrieve by hash.
            </p>
          </div>
          <div className="storage-grid">
            {storageCards.map((card) => (
              <article key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Private review</p>
            <h2>Evaluate OSCIRIS for enterprise AI workloads.</h2>
            <p>
              Review DSP privacy controls, decentralized compute coordination,
              verifier-backed execution, and audit records for sensitive AI workloads.
            </p>
          </div>
          <ButtonLink href="mailto:info@oscirislabs.com">Contact OSCIRIS</ButtonLink>
        </section>
      </main>
    </PageShell>
  );
}
