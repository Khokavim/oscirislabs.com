import { ButtonLink } from "@/components/ButtonLink";
import { FeatureCard } from "@/components/FeatureCard";
import { PageShell } from "@/components/PageShell";

const whitepaperPdf = "/osciris-protocol-whitepaper.pdf";

const proofMetrics = [
  { label: "Category", value: "Sovereign AI", detail: "Infrastructure-as-a-Service" },
  { label: "Protocol proof", value: "4 hosts", detail: "AWS settlement-ready run" },
  { label: "Training evidence", value: "7B", detail: "bounded QLoRA adaptation" },
  { label: "Inference evidence", value: "100 cases", detail: "Bedrock procurement baseline" },
];

const useCases = [
  {
    title: "Banking & Fintech",
    body: "Private RAG, compliance assistants, fraud analysis, document intelligence, and audit receipts.",
  },
  {
    title: "Telcos",
    body: "Support automation, local-language analytics, customer intelligence, and privacy-aware inference.",
  },
  {
    title: "Public Sector",
    body: "Sovereign AI workflows, policy analysis, records intelligence, and controlled data processing.",
  },
  {
    title: "Research & Universities",
    body: "Affordable evaluation, fine-tuning, synthetic data, and model benchmarking.",
  },
];

const architectureFlow = [
  "Institution data",
  "DSP policy artifact",
  "Verified provider",
  "Verifier node",
  "Audit receipt",
  "Buyer dashboard",
];

const sovereigntyControls = [
  {
    title: "Data sovereignty",
    body:
      "Reduce raw-data exposure before workloads reach external compute through DSP-controlled training and inference surfaces.",
  },
  {
    title: "Compute sovereignty",
    body:
      "Route workloads by jurisdiction, privacy tier, provider class, evidence requirement, and operating policy.",
  },
  {
    title: "Model sovereignty",
    body:
      "Track checkpoints, adapters, outputs, manifests, hashes, and release objects across the AI workload lifecycle.",
  },
  {
    title: "Operational sovereignty",
    body:
      "Export audit receipts, retention records, challenge status, incident evidence, and provider accountability data.",
  },
  {
    title: "Economic sovereignty",
    body:
      "Use stable-value customer billing while providers post economic collateral for accountable participation.",
  },
];

const businessOffers = [
  {
    title: "Private AI workload execution",
    body:
      "Package enterprise training, inference, evaluation, and synthetic-data workloads with DSP privacy controls and measurable quality gates.",
  },
  {
    title: "Verified provider coordination",
    body:
      "Turn distributed GPU supply into assignable capacity with signed capabilities, job receipts, verifier checks, challenges, and settlement readiness.",
  },
  {
    title: "Audit-ready evidence layer",
    body:
      "Give buyers a proof trail: manifests, hashes, logs, receipts, benchmark outputs, challenge records, and policy checkpoints.",
  },
];

const evidenceCards = [
  {
    label: "Protocol proof",
    value: "Accepted",
    title: "AWS multi-host settlement-ready run",
    body:
      "Four separate AWS hosts proved provider claims, enterprise assignment, assigned-provider execution, P2P evidence transfer, verifier acceptance/rejection, quorum, and challenge-gated settlement readiness.",
  },
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

export default function Home() {
  return (
    <PageShell>
      <main className="home-main">
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-kicker">Sovereignty-enabling AI infrastructure</p>
            <h1>Sovereign AI Infrastructure-as-a-Service.</h1>
            <p className="hero-text">
              Keep sensitive data under institutional control. Run AI workloads on
              verified compute. Export audit-ready receipts.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/app">Open pilot app</ButtonLink>
              <ButtonLink href="mailto:info@oscirislabs.com" variant="secondary">
                Request private review
              </ButtonLink>
              <ButtonLink href={whitepaperPdf} variant="secondary">
                Download whitepaper
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
            Built for banks, telcos, public institutions, and research teams that need
            privacy, auditability, and jurisdiction-aware execution.
          </p>
        </section>

        <section className="use-case-section" aria-label="OSCIRIS use cases">
          <div className="section-copy">
            <p className="eyebrow">Use cases</p>
            <h2>What buyers can pilot in 30-60 days.</h2>
          </div>
          <div className="use-case-grid">
            {useCases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="architecture-section" aria-label="OSCIRIS architecture">
          <div className="section-copy">
            <p className="eyebrow">Architecture</p>
            <h2>One path from private data to verifiable receipt.</h2>
          </div>
          <div className="architecture-flow">
            {architectureFlow.map((item, index) => (
              <article key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="sovereignty-section" aria-label="OSCIRIS sovereignty controls">
          <div className="section-copy">
            <p className="eyebrow">Sovereign AI controls</p>
            <h2>Cloud-like access to AI compute with institutional control retained.</h2>
            <p>
              Sovereign AI infrastructure means institutions keep control over data
              location, privacy policy, execution jurisdiction, audit evidence, provider
              accountability, and model governance while using distributed compute.
            </p>
          </div>
          <div className="sovereignty-grid">
            {sovereigntyControls.map((control) => (
              <article key={control.title}>
                <h3>{control.title}</h3>
                <p>{control.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="split-section business-stack">
          <div className="section-copy">
            <p className="eyebrow">The business</p>
            <h2>Private, auditable, jurisdiction-aware AI compute for buyers who cannot use blind infrastructure.</h2>
            <p>
              OSCIRIS is not another raw GPU marketplace. It is the orchestration,
              privacy, verification, and accountability layer that can make distributed
              GPU supply usable for sensitive enterprise and sovereign workloads.
            </p>
            <ButtonLink href="/resources" variant="secondary">
              View proof resources
            </ButtonLink>
          </div>
          <div className="feature-grid">
            {businessOffers.map((offer, index) => (
              <FeatureCard
                key={offer.title}
                tone={index === 0 ? "cyan" : index === 1 ? "green" : "amber"}
                title={offer.title}
                body={offer.body}
                href="/resources"
                linkLabel="See evidence"
              />
            ))}
          </div>
        </section>

        <section className="split-section">
          <div className="section-copy">
            <p className="eyebrow">Protocol stack</p>
            <h2>DSP privacy controls, verified execution, and stable-value procurement.</h2>
            <p>
              DSP reduces raw-data exposure before execution. Verifier receipts and
              challenge windows make outcomes inspectable. Horizen coordinates proof
              receipts, escrow, provider accountability, and settlement state.
            </p>
          </div>
          <div className="proof-strip" aria-label="OSCIRIS operating model">
            <article>
              <span>01</span>
              <h3>Prepare</h3>
              <p>Transform sensitive data into controlled training or inference surfaces.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Route</h3>
              <p>Assign work by provider capability, jurisdiction, policy, and evidence tier.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Verify</h3>
              <p>Generate receipts, verify artifacts, resolve challenges, and export audit trails.</p>
            </article>
          </div>
        </section>

        <section className="evidence-section" aria-label="Latest OSCIRIS validation evidence">
          <div className="section-copy">
            <p className="eyebrow">Proof-backed credibility</p>
            <h2>Built from measured evidence, not narrative alone.</h2>
            <p>
              Current results support bounded enterprise AI workloads and a working
              multi-host protocol proof. The evidence is intentionally scoped: it proves
              specific workloads and off-chain protocol behavior, not broad public
              production network economics.
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
            single-host inference, AWS Bedrock managed-inference procurement baselines,
            and an off-chain AWS multi-host settlement-ready protocol run. Horizen
            testnet anchoring and decentralized market pricing remain next-step evidence.
          </p>
        </section>

        <section className="blockchain-layer" aria-label="Horizen smart-contract verification layer">
          <div>
            <p className="eyebrow">Why blockchain fits</p>
            <h2>Open compute networks need neutral economic state.</h2>
          </div>
          <div className="chain-grid">
            <article>
              <span>01</span>
              <h3>Proof receipt registry</h3>
              <p>Record job receipts, verification status, policy checkpoints, and provider accountability onchain.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Accountable providers</h3>
              <p>Providers stake collateral for participation while customers use stable-value procurement rails.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Challengeable settlement</h3>
              <p>Escrow, verifier status, challenge windows, and reputation become shared protocol state.</p>
            </article>
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Private review</p>
            <h2>Evaluate OSCIRIS for regulated AI workloads.</h2>
            <p>
              Review DSP privacy controls, jurisdiction-aware routing, verified execution,
              stable-value procurement, and audit receipts for sensitive AI operations.
            </p>
          </div>
          <ButtonLink href="mailto:info@oscirislabs.com">Contact OSCIRIS</ButtonLink>
        </section>
      </main>
    </PageShell>
  );
}
