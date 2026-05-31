import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

const whitepaperPdf = "/osciris-protocol-whitepaper.pdf";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "OSCIRIS resources: Data Shadow Protocol thesis, privacy threat model, benchmark areas, Horizen smart contracts for ZK/privacy proofs, production proof program, and contact.",
};

const resources = [
  {
    number: "01",
    title: "Privacy threat model",
    body: "Protected secrets, adversary classes, release objects, and threshold gates for DSP deployments.",
  },
  {
    number: "02",
    title: "DSP benchmark spec",
    body: "Matrix runs, privacy sweeps, seed stability, tensor releases, model utility, and scoring.",
  },
  {
    number: "03",
    title: "ZK proof contracts",
    body: "Horizen smart-contract design for proof receipts, verification checkpoints, provider accountability, and proof-aware economics.",
  },
  {
    number: "04",
    title: "Protocol whitepaper",
    body: "Download the latest OSCIRIS Protocol whitepaper for the full DSP, proof-layer, and decentralized compute thesis.",
    href: whitepaperPdf,
    linkLabel: "Download PDF",
  },
];

export default function ResourcesPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="Resources" title="Protocol evidence and enterprise proof.">
          <p>
            Start with the materials that define how DSP protects data, preserves model
            utility, and connects cheaper enterprise training to smart-contract proof
            coordination.
          </p>
        </PageHero>
        <section className="resource-grid">
          {resources.map((resource) => (
            <article key={resource.number}>
              <span>{resource.number}</span>
              <h2>{resource.title}</h2>
              <p>{resource.body}</p>
              {resource.href && resource.linkLabel ? (
                <a href={resource.href}>{resource.linkLabel}</a>
              ) : null}
            </article>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
