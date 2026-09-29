import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "For individuals",
  description:
    "Explore early access to shared open-weight AI or express interest in contributing capable compute to an OSCIRIS provider pilot.",
};

export default function IndividualsPage() {
  return (
    <PageShell>
      <main id="main-content" className="audience-main audience-people">
        <section className="audience-hero">
          <p className="landing-label">FOR INDIVIDUALS &amp; BUILDERS</p>
          <h1>AI beyond the machine you own.</h1>
          <p>Large open-weight models can demand more memory and compute than one device has. OSCIRIS is exploring how participating machines can work together—while keeping contribution and execution reviewable.</p>
          <div className="landing-actions">
            <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20individual%20early%20access">Request early access</ButtonLink>
            <ButtonLink href="#contribute" variant="secondary">Explore contributing</ButtonLink>
          </div>
          <p className="audience-disclaimer">Early-access interest only. Self-serve inference is not generally available.</p>
        </section>

        <section className="audience-duo" aria-label="Individual participation paths">
          <article>
            <span>01 / USE THE NETWORK</span>
            <h2>Try bigger ideas without buying the biggest machine.</h2>
            <p>Tell us what model or workload you want to run and the quality, privacy, and response-time limits that matter. Early access is scoped to workloads the pilot can actually support.</p>
          </article>
          <article id="contribute">
            <span>02 / CONTRIBUTE CAPACITY</span>
            <h2>Put capable hardware to work.</h2>
            <p>Prospective providers can ask about eligibility, supported hardware, expected availability, attribution, and pilot safeguards. Participation is reviewed before any real workload is assigned.</p>
            <a href="mailto:info@oscirislabs.com?subject=OSCIRIS%20provider%20pilot">Ask about the provider pilot <span aria-hidden="true">↗</span></a>
          </article>
        </section>

        <section className="audience-boundary">
          <div><p className="landing-label">CURRENT STATUS</p><h2>What is—and is not—open today.</h2></div>
          <div>
            <p>OSCIRIS has development-stage demonstrations of distributed inference and signed execution receipts. The public proof surface is a reviewed snapshot.</p>
            <p>General access, open provider admission, rates, and earnings are not live promises. Any future rewards require verified work metering and approved program terms.</p>
            <Link href="/app/">Inspect the public proof snapshot <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="audience-final">
          <p className="landing-label">JOIN THE EARLY CONVERSATION</p>
          <h2>Tell us what you want to run—or what you can contribute.</h2>
          <p>Please describe the idea and hardware at a high level. Do not send private datasets, credentials, or sensitive workloads by email.</p>
          <div className="landing-actions">
            <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20individual%20early%20access">Request early access</ButtonLink>
            <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20provider%20pilot" variant="secondary">Discuss provider pilot</ButtonLink>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
