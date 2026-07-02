import { ButtonLink } from "@/components/ButtonLink";
import { FeatureCard } from "@/components/FeatureCard";
import { PageShell } from "@/components/PageShell";

const whitepaperPdf = "/osciris-protocol-whitepaper.pdf";

const outcomeMetrics = [
  {
    label: "Private AI workloads",
    value: "Controlled",
    detail: "Training, inference, evaluation, and document intelligence under policy.",
  },
  {
    label: "Compute access",
    value: "Verified",
    detail: "Capacity routed by provider fit, jurisdiction, and operating controls.",
  },
  {
    label: "Operations",
    value: "Audit-ready",
    detail: "Receipts, review packs, and accountable delivery for sensitive teams.",
  },
  {
    label: "Developer beta",
    value: "3 platforms",
    detail: "macOS, Linux, and Windows release assets are available for reviewers.",
  },
];

const businessOutcomes = [
  {
    title: "Use AI without exposing the whole operation",
    body:
      "Prepare sensitive data into controlled workload surfaces before it reaches external compute, vendors, or review environments.",
  },
  {
    title: "Know where work runs and why",
    body:
      "Route AI jobs by policy, jurisdiction, provider capability, review requirements, and operating constraints.",
  },
  {
    title: "Give compliance teams something usable",
    body:
      "Package delivery with receipts, hashes, reviewer notes, and evidence bundles that support internal approval.",
  },
];

const useCases = [
  {
    title: "Banking & Fintech",
    body:
      "Private retrieval, compliance assistance, fraud analysis, records intelligence, and controlled model evaluation.",
  },
  {
    title: "Telecoms",
    body:
      "Customer intelligence, support automation, local-language analytics, and privacy-aware operational workflows.",
  },
  {
    title: "Public Sector",
    body:
      "Jurisdiction-aware AI workflows for policy analysis, case review, records processing, and controlled data operations.",
  },
  {
    title: "Enterprise AI Teams",
    body:
      "Pilot private training, inference, benchmarking, and synthetic-data workflows before broader rollout.",
  },
];

const serviceModel = [
  {
    title: "Private AI workload execution",
    body:
      "Package training, inference, evaluation, and synthetic-data jobs with privacy controls and buyer-visible delivery requirements.",
  },
  {
    title: "Verified compute routing",
    body:
      "Coordinate distributed compute supply as assignable capacity instead of asking buyers to trust raw infrastructure.",
  },
  {
    title: "Audit-ready delivery",
    body:
      "Return a reviewable evidence pack for internal stakeholders, technical reviewers, and regulated operating teams.",
  },
];

const deploymentPath = [
  {
    step: "01",
    title: "Private review",
    body:
      "Review the workload, data sensitivity, policy boundaries, and buyer requirements before any pilot is scoped.",
  },
  {
    step: "02",
    title: "Controlled pilot",
    body:
      "Run one bounded AI workflow with clear inputs, provider requirements, evidence expectations, and success criteria.",
  },
  {
    step: "03",
    title: "Operational rollout",
    body:
      "Expand only after the buyer can inspect quality, privacy controls, delivery artifacts, and operating boundaries.",
  },
];

const trustItems = [
  {
    label: "Release integrity",
    title: "Public beta assets are checksum verified",
    body:
      "The current developer beta publishes macOS, Linux, and Windows assets through a manifest with matching SHA-256 checks.",
    href: "/beta-release-manifest.json",
    linkLabel: "View manifest",
  },
  {
    label: "Technical validation",
    title: "Bounded evidence is available for reviewers",
    body:
      "OSCIRIS publishes protocol evidence, workload benchmarks, and review resources without turning the sales page into a proof dump.",
    href: "/resources",
    linkLabel: "Open resources",
  },
  {
    label: "Reviewer console",
    title: "Proof console remains public",
    body:
      "Technical evaluators can inspect the read-only proof console, participant snapshot, and supporting artifacts from the trust library.",
    href: "/app",
    linkLabel: "Open proof console",
  },
];

const heroSignals = [
  { label: "Workload", value: "Private review packet" },
  { label: "Policy", value: "Jurisdiction and data controls" },
  { label: "Compute", value: "Verified provider routing" },
];

export default function Home() {
  return (
    <PageShell>
      <main className="home-main">
        <section className="hero">
          <div className="hero-copy">
            <p className="hero-kicker">Private AI infrastructure for regulated teams</p>
            <h1>Run sensitive AI workloads without surrendering operational control.</h1>
            <p className="hero-text">
              OSCIRIS helps institutions use AI with controlled data exposure,
              verified compute execution, and audit-ready delivery for internal
              review.
            </p>
            <div className="hero-actions">
              <ButtonLink href="mailto:info@oscirislabs.com">Request private review</ButtonLink>
              <ButtonLink href="#platform" variant="secondary">
                Explore platform
              </ButtonLink>
              <ButtonLink href="#trust" variant="secondary">
                Review validation
              </ButtonLink>
            </div>
          </div>

          <aside className="hero-visual" aria-label="OSCIRIS private AI control plane preview">
            <div className="hero-visual-shell">
              <div className="hero-visual-header">
                <span>OSCIRIS Control Plane</span>
                <strong>Private AI workload</strong>
              </div>
              <div className="hero-visual-path" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div className="hero-signal-grid">
                {heroSignals.map((signal) => (
                  <article key={signal.label}>
                    <span>{signal.label}</span>
                    <strong>{signal.value}</strong>
                  </article>
                ))}
              </div>
              <div className="hero-review-card">
                <span>Review pack</span>
                <strong>Audit-ready delivery</strong>
                <p>
                  Receipts, policy notes, workload boundaries, and reviewer-facing
                  evidence packaged for internal approval.
                </p>
              </div>
            </div>
          </aside>
        </section>

        <section className="metrics-strip" aria-label="OSCIRIS business capabilities">
          {outcomeMetrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.value}</strong>
              <p>{metric.detail}</p>
            </div>
          ))}
        </section>

        <section className="statement-band">
          <p>
            Designed for organizations that need AI capability, privacy discipline,
            and accountable delivery before sensitive workloads move into production.
          </p>
        </section>

        <section className="split-section" id="platform">
          <div className="section-copy">
            <p className="eyebrow">Platform</p>
            <h2>Enterprise AI operations with privacy, routing, and review built in.</h2>
            <p>
              OSCIRIS packages the parts regulated teams need before they can rely on
              external AI compute: controlled workload preparation, policy-aware routing,
              and evidence that can be reviewed after execution.
            </p>
          </div>
          <div className="feature-grid">
            {businessOutcomes.map((outcome, index) => (
              <FeatureCard
                key={outcome.title}
                tone={index === 0 ? "cyan" : index === 1 ? "green" : "amber"}
                title={outcome.title}
                body={outcome.body}
              />
            ))}
          </div>
        </section>

        <section className="use-case-section" id="solutions" aria-label="OSCIRIS buyer use cases">
          <div className="section-copy">
            <p className="eyebrow">Solutions</p>
            <h2>Where buyers can start with a controlled pilot.</h2>
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

        <section className="split-section business-stack">
          <div className="section-copy">
            <p className="eyebrow">Service model</p>
            <h2>A practical path from sensitive workload to reviewed delivery.</h2>
            <p>
              OSCIRIS is built as a productized service layer for teams that need
              useful AI outcomes with control over data handling, compute selection,
              and review artifacts.
            </p>
            <ButtonLink href="mailto:info@oscirislabs.com" variant="secondary">
              Discuss a private workload
            </ButtonLink>
          </div>
          <div className="feature-grid">
            {serviceModel.map((offer, index) => (
              <FeatureCard
                key={offer.title}
                tone={index === 0 ? "cyan" : index === 1 ? "green" : "amber"}
                title={offer.title}
                body={offer.body}
              />
            ))}
          </div>
        </section>

        <section className="architecture-section" aria-label="OSCIRIS deployment path">
          <div className="section-copy">
            <p className="eyebrow">Deployment path</p>
            <h2>Start with review. Prove one workflow. Expand with evidence.</h2>
          </div>
          <div className="architecture-flow deployment-flow">
            {deploymentPath.map((item) => (
              <article key={item.step}>
                <span>{item.step}</span>
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="evidence-section trust-section" id="trust" aria-label="OSCIRIS trust and technical validation">
          <div className="section-copy">
            <p className="eyebrow">Trust & Technical Validation</p>
            <h2>Technical evidence is available without making it the sales story.</h2>
            <p>
              OSCIRIS publishes technical validation for qualified reviewers. Current
              materials cover release integrity, beta platform coverage, protocol
              evidence, and controlled workload benchmarks. Windows developer support is
              available in beta; Windows NVIDIA provider behavior still requires host
              smoke testing before stronger production claims.
            </p>
          </div>
          <div className="trust-grid">
            {trustItems.map((item) => (
              <article key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={item.href}>{item.linkLabel}</a>
              </article>
            ))}
          </div>
          <div className="trust-actions">
            <ButtonLink href="/resources" variant="secondary">
              Technical resources
            </ButtonLink>
            <ButtonLink href={whitepaperPdf} variant="secondary">
              Whitepaper
            </ButtonLink>
            <ButtonLink href="https://github.com/oscirisprotocol/core/releases/tag/v0.1.2" variant="secondary">
              Developer beta
            </ButtonLink>
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Private review</p>
            <h2>Evaluate OSCIRIS for sensitive AI operations.</h2>
            <p>
              Bring one workload, one operating boundary, and one review requirement.
              OSCIRIS will help scope a controlled pilot around buyer-visible outcomes.
            </p>
          </div>
          <ButtonLink href="mailto:info@oscirislabs.com">Request private review</ButtonLink>
        </section>
      </main>
    </PageShell>
  );
}
