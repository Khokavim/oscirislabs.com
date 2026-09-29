import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "About",
  description:
    "OSCIRIS Labs is building connected AI compute for individuals and organizations through early access, provider exploration, and evidence-led enterprise pilots.",
};

const aboutCards = [
  {
    title: "For individuals",
    body:
      "Explore early access to shared open-weight AI, or ask how capable hardware could join a reviewed provider pilot. Self-serve access, open admission, and rewards are not live.",
    href: "/individuals/",
    linkLabel: "Explore the individual path",
  },
  {
    title: "For organizations",
    body:
      "Scope one controlled workload with declared data and provider boundaries, measurable acceptance criteria, and evidence for technical and risk review.",
    href: "/enterprise/",
    linkLabel: "Explore enterprise pilots",
  },
  {
    title: "Current status",
    body:
      "Development-stage multi-machine inference and signed execution receipts have been demonstrated. The public proof page is a reviewed snapshot, not live service status or production qualification.",
    href: "/app/",
    linkLabel: "View public proof status",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      <main id="main-content" className="page-main">
        <PageHero eyebrow="About" title="Connected AI compute, built with clear boundaries.">
          <p>
            OSCIRIS Labs is developing a network for open-weight AI across participating
            machines. Individuals can express interest in access or contributing compute;
            organizations can shape a bounded, evidence-led pilot. Neither path is a
            generally available compute service today.
          </p>
        </PageHero>
        <section className="about-grid">
          {aboutCards.map((card) => (
            <article key={card.title}>
              <h2>{card.title}</h2>
              <p>{card.body}</p>
              <ButtonLink href={card.href} variant="secondary">{card.linkLabel}</ButtonLink>
            </article>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
