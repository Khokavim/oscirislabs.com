import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "DSP Private Review",
  description:
    "A commercial overview of the OSCIRIS Data Shadow Protocol. Detailed mechanisms are available under confidential review.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function WhitepaperPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="DSP private review" title="Workload-aware privacy for external AI execution.">
          <p>
            DSP prepares workload-specific controlled representations designed to reduce
            raw-data exposure while preserving task utility. Technical implementation is
            available under private review.
          </p>
        </PageHero>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Confidential access</p>
            <h2>Review the detailed technical material under confidentiality.</h2>
            <p>
              Qualified customers, auditors, investors, and research partners can request
              a scoped technical review after the appropriate confidentiality terms are in place.
            </p>
          </div>
          <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20DSP%20private%20review">
            Request private review
          </ButtonLink>
        </section>
      </main>
    </PageShell>
  );
}
