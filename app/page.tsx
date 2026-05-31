import { ButtonLink } from "@/components/ButtonLink";
import { FeatureCard } from "@/components/FeatureCard";
import { PageShell } from "@/components/PageShell";

const proofMetrics = [
  { label: "Privacy layer", value: "DSP", detail: "Data Shadow Protocol" },
  { label: "Proof layer", value: "ZK", detail: "Horizen smart contracts" },
  { label: "Enterprise value", value: "Lower", detail: "data exposure and training waste" },
];

export default function Home() {
  return (
    <PageShell>
      <main className="home-main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-light" />
              dsp protocol / zk proof contracts
            </p>
            <h1>Private AI training. Verifiable by design.</h1>
            <p className="hero-text">
              OSCIRIS combines Data Shadow Protocol privacy with Horizen smart contracts
              for ZK proof coordination, policy enforcement, and decentralized economics.
            </p>
            <div className="hero-actions">
              <ButtonLink href="/whitepaper">Read protocol whitepaper</ButtonLink>
              <ButtonLink href="/resources" variant="secondary">
                View proof resources
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
            DSP protects the training layer. Smart contracts manage the decentralized
            proof and economics layer.
          </p>
        </section>

        <section className="split-section">
          <div className="section-copy">
            <p className="eyebrow">Protocol stack</p>
            <h2>Privacy, efficient training, and onchain economics in one system.</h2>
            <p>
              The OSCIRIS thesis connects three layers: DSP transforms for privacy,
              efficient model training for enterprise adoption, and Horizen smart
              contracts for ZK/privacy proof coordination.
            </p>
            <ButtonLink href="/whitepaper" variant="secondary">
              Open whitepaper
            </ButtonLink>
          </div>
          <div className="feature-grid">
            <FeatureCard
              tone="cyan"
              title="Data Shadow Protocol"
              body="Convert enterprise data into controlled training artifacts that preserve useful signal while reducing raw exposure."
              href="/whitepaper"
              linkLabel="Read thesis"
            />
            <FeatureCard
              tone="green"
              title="Private model training"
              body="Privacy is the primary product value: measure reconstruction, property, membership, and DP model-release scope."
              href="/resources"
              linkLabel="View resources"
            />
            <FeatureCard
              tone="amber"
              title="ZK proof contracts"
              body="Use Horizen smart contracts to coordinate proof receipts, policy checks, provider accountability, and decentralized cost management."
              href="/resources"
              linkLabel="View proof layer"
            />
          </div>
        </section>

        <section className="blockchain-layer" aria-label="Horizen smart-contract proof layer">
          <div>
            <p className="eyebrow">Horizen Thrive alignment</p>
            <h2>Why the blockchain layer matters.</h2>
          </div>
          <div className="chain-grid">
            <article>
              <span>01</span>
              <h3>ZK proof registry</h3>
              <p>Record privacy proof commitments, verification status, and policy checkpoints onchain.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Smart-contract controls</h3>
              <p>Contracts define proof requirements, job terms, provider accountability, and release conditions.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Proof-aware economics</h3>
              <p>Cost-to-quality, retry overhead, and worker reputation become measurable protocol state.</p>
            </article>
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Review access</p>
            <h2>Evaluate OSCIRIS for Horizen Thrive.</h2>
            <p>
              Review DSP privacy, enterprise training economics, and Horizen smart-contract
              design for ZK/privacy proof management.
            </p>
          </div>
          <ButtonLink href="mailto:hello@oscirislabs.com">Contact OSCIRIS</ButtonLink>
        </section>
      </main>
    </PageShell>
  );
}
