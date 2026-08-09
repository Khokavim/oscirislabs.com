import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Technical Review Access",
  description:
    "Request confidential access to OSCIRIS technical validation and review materials.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

const reviewGroups = [
  {
    title: "Customers and partners",
    body: "Review the fit between a bounded workload, operating requirements, and measurable outcomes.",
  },
  {
    title: "Auditors and technical reviewers",
    body: "Evaluate scoped validation evidence and control claims through a confidential review process.",
  },
  {
    title: "Investors and research partners",
    body: "Assess the technology, evidence boundary, and development roadmap with appropriate confidentiality controls.",
  },
];

export default function ResourcesPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="Private resources" title="Technical material is available through controlled review.">
          <p>
            OSCIRIS shares detailed architecture, implementation, evaluation, and
            validation materials with qualified reviewers under confidentiality.
          </p>
        </PageHero>

        <section className="about-grid">
          {reviewGroups.map((group) => (
            <article key={group.title}>
              <h2>{group.title}</h2>
              <p>{group.body}</p>
            </article>
          ))}
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Request access</p>
            <h2>Start with your review purpose and confidentiality requirements.</h2>
            <p>We will scope the material to the reviewer, decision, and permitted use.</p>
          </div>
          <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20confidential%20technical%20review">
            Request review access
          </ButtonLink>
        </section>
      </main>
    </PageShell>
  );
}
