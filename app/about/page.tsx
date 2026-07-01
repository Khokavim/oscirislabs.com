import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "About OSCIRIS, private AI infrastructure for regulated teams that need controlled data exposure, verified compute execution, and audit-ready delivery.",
};

const aboutCards = [
  {
    title: "What OSCIRIS does",
    body:
      "OSCIRIS helps organizations run sensitive AI workloads with clearer control over data handling, compute selection, and delivery review.",
  },
  {
    title: "Who it serves",
    body:
      "The product is built for banks, telecoms, public institutions, and enterprise AI teams that need AI capability without blind infrastructure assumptions.",
  },
  {
    title: "How it is adopted",
    body:
      "Adoption starts with a private review and a bounded pilot, then expands only when quality, controls, and review artifacts satisfy the buyer.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="About" title="Private AI infrastructure for serious operating teams.">
          <p>
            OSCIRIS is built for organizations that want the benefits of advanced AI
            without giving up control of sensitive data, execution policy, or review
            obligations. The public technical material is available for evaluators, but
            the product path starts with business risk and operational fit.
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
