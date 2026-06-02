import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "About OSCIRIS, a commercial Data Shadow Protocol for privacy-preserving enterprise model training with smart-contract verification coordination.",
};

const aboutCards = [
  {
    title: "Mission",
    body:
      "Make private enterprise AI training commercially practical: less raw-data exposure, auditable release objects, and cost-to-quality validation tied to model outcomes.",
  },
  {
    title: "Protocol",
    body:
      "DSP is the core product layer: guarded transformations, model-release paths, sharding, manifests, and empirical leakage tests around enterprise workloads.",
  },
  {
    title: "Commercial path",
    body:
      "OSCIRIS is built for commercial deployment while keeping validation gates explicit for GPU economics, Horizen smart-contract verification, distributed reliability, and independent privacy review.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="About" title="A commercial protocol for private AI training.">
          <p>
            OSCIRIS brings the Data Shadow Protocol to enterprise teams that need privacy,
            cost-to-quality validation, and smart-contract verification coordination before moving
            sensitive data into AI pipelines.
          </p>
        </PageHero>
        <section className="about-grid">
          {aboutCards.map((card) => (
            <article key={card.title}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </article>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
