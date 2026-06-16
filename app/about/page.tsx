import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "About OSCIRIS, a commercial Data Shadow Protocol for privacy-preserving enterprise AI training and inference with smart-contract verification coordination.",
};

const aboutCards = [
  {
    title: "Mission",
    body:
      "Make private enterprise AI workloads commercially practical: less raw-data exposure, auditable release objects, and cost-to-quality validation tied to model outcomes.",
  },
  {
    title: "Protocol",
    body:
      "DSP is the core product layer: guarded transformations, model-release paths, projected inference prompts, sharding, manifests, and empirical leakage tests around enterprise workloads.",
  },
  {
    title: "Commercial path",
    body:
      "OSCIRIS is built for commercial deployment while keeping validation gates explicit for GPU economics, Horizen smart-contract verification, Filecoin evidence availability, distributed reliability, and independent privacy review.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="About" title="A commercial protocol for private enterprise AI.">
          <p>
            OSCIRIS brings the Data Shadow Protocol to enterprise teams that need privacy,
            cost-to-quality validation, and smart-contract verification coordination before
            moving sensitive training or inference workflows into AI pipelines.
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
