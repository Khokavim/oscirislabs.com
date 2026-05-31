import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Whitepaper",
  description:
    "Read the OSCIRIS whitepaper overview: Data Shadow Protocol, private enterprise model training, Horizen smart contracts for ZK/privacy proofs, cost efficiency, and deployment evidence.",
};

const sections = [
  {
    id: "abstract",
    title: "Abstract",
    body:
      "OSCIRIS defines a commercial Data Shadow Protocol for training useful enterprise models while reducing raw-data exposure. The thesis combines privacy controls, utility measurement, and cost-to-quality validation for deployable secure compute.",
  },
  {
    id: "protocol",
    title: "Data Shadow Protocol",
    body:
      "DSP transforms enterprise data into controlled training artifacts through keyed projections, guarded feature handling, tensor compression, sharding, and manifest integrity. Each release object is measured against utility, leakage, and operational constraints.",
  },
  {
    id: "privacy",
    title: "Privacy scope",
    body:
      "Privacy is the primary selling point. OSCIRIS tracks reconstruction, property inference, membership inference, collusion, and differential privacy scope so enterprise buyers can inspect what is protected and what remains out of scope.",
  },
  {
    id: "economics",
    title: "Horizen proof layer",
    body:
      "OSCIRIS treats ZK/privacy proof coordination as a required protocol layer. Horizen smart contracts can record proof commitments, verify policy checkpoints, coordinate release conditions, and make decentralized economics accountable to proof outcomes.",
  },
  {
    id: "proof",
    title: "Commercial proof gates",
    body:
      "Commercial viability depends on privacy, training efficiency, and proof discipline. OSCIRIS uses proof gates for CUDA performance, distributed reliability, decentralized GPU cost, smart-contract verification controls, and large-model training advantage so efficient training claims can be verified before scale-out.",
  },
];

export default function WhitepaperPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="Whitepaper" title="The DSP commercial thesis.">
          <p>
            A public overview of the Data Shadow Protocol, private enterprise model
            training, Horizen smart-contract proof coordination, cost-efficient compute
            strategy, and evidence gates behind OSCIRIS.
          </p>
        </PageHero>

        <section className="paper-layout">
          <aside className="paper-index">
            <span>Contents</span>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </aside>
          <article className="paper-body">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </article>
        </section>
      </main>
    </PageShell>
  );
}
