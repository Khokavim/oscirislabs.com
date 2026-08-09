import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Controlled Pilot",
  description: "A high-level overview of the OSCIRIS controlled-pilot path.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const pilotStages = [
  {
    step: "01",
    title: "Private review",
    body: "Define the workload, sensitivity boundary, operating requirements, and success criteria.",
  },
  {
    step: "02",
    title: "Controlled pilot",
    body: "Evaluate one bounded use case under agreed controls and review conditions.",
  },
  {
    step: "03",
    title: "Reviewed outcome",
    body: "Assess utility, privacy risk, and auditable evidence before any expansion decision.",
  },
];

export default function MvpPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="Controlled pilot" title="Start narrow, validate outcomes, expand deliberately.">
          <p>
            OSCIRIS pilots begin with a confidential review and a clearly bounded workload.
            Detailed mechanisms and operating procedures are provided only within the
            applicable review agreement.
          </p>
        </PageHero>

        <section className="architecture-section" aria-label="OSCIRIS pilot path">
          <div className="architecture-flow deployment-flow">
            {pilotStages.map((stage) => (
              <article key={stage.step}>
                <span>{stage.step}</span>
                <strong>{stage.title}</strong>
                <p>{stage.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Pilot review</p>
            <h2>Bring one workload and one decision boundary.</h2>
            <p>We will scope a controlled evaluation around buyer-visible outcomes.</p>
          </div>
          <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20controlled%20pilot">
            Discuss a private pilot
          </ButtonLink>
        </section>
      </main>
    </PageShell>
  );
}
