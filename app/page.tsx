import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "OSCIRIS | AI compute, connected",
  description:
    "Explore shared AI compute and provider participation, or scope an evidence-led enterprise pilot with OSCIRIS Labs.",
};

const steps = [
  { number: "01", title: "Bring the workload", body: "Start with a model, a task, and the limits that matter: memory, latency, location, and data handling." },
  { number: "02", title: "Match the machines", body: "OSCIRIS is being built to coordinate suitable compute across participating devices and cloud capacity." },
  { number: "03", title: "Inspect the result", body: "Execution records and receipts give pilot teams a way to review what happened, not just the final answer." },
];

const enterpriseCases = [
  { label: "01 / PRIVATE AI", title: "Set the data boundary", body: "Define what may leave your environment, what a provider may process, and what reviewers need to see." },
  { label: "02 / MODEL CAPACITY", title: "Test distributed inference", body: "Evaluate a bounded open-weight workload against a declared topology, quality target, and latency budget." },
  { label: "03 / GOVERNANCE", title: "Make the pilot reviewable", body: "Agree on acceptance criteria and retain evidence for technical, security, and procurement review." },
];

export default function Home() {
  return (
    <PageShell>
      <main id="main-content" className="landing-main">
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-copy">
            <p className="landing-eyebrow"><span aria-hidden="true" /> AI COMPUTE, CONNECTED</p>
            <h1 id="landing-title">More AI power.<br /><em>More ways to take part.</em></h1>
            <p className="landing-lede">
              OSCIRIS is building a network that coordinates capable machines for open-weight AI.
              Explore access as an individual, contribute compute, or shape a controlled enterprise pilot.
            </p>
            <div className="landing-actions">
              <ButtonLink href="#choose-your-path">Find your path <span aria-hidden="true">↗</span></ButtonLink>
              <ButtonLink href="#how-it-works" variant="secondary">See how it works</ButtonLink>
            </div>
            <p className="landing-hero-footnote">Early access and design-partner pilots. Not a general-availability compute service.</p>
          </div>
          <div className="landing-fabric" role="img" aria-label="Conceptual illustration of one AI workload moving across participating compute nodes to a reviewable result">
            <div className="fabric-topline"><span>OSCIRIS / NETWORK VIEW</span><span>CONCEPTUAL</span></div>
            <div className="fabric-workload"><span className="fabric-dot" /> YOUR AI WORKLOAD <span className="fabric-arrow">↓</span></div>
            <div className="fabric-node-row">
              <div className="fabric-node"><span>01 / DEVICE</span><strong>Personal<br />compute</strong><i /></div>
              <div className="fabric-node"><span>02 / CLOUD</span><strong>GPU<br />capacity</strong><i /></div>
              <div className="fabric-node"><span>03 / NETWORK</span><strong>Provider<br />nodes</strong><i /></div>
            </div>
            <div className="fabric-output"><span className="fabric-output-icon">✓</span><div><small>OUTPUT + EVIDENCE</small><strong>A result you can review</strong></div></div>
            <p className="fabric-caption">Placement depends on workload, capability, and pilot policy. This is an illustration, not a live topology.</p>
          </div>
        </section>

        <section className="landing-intro" id="choose-your-path" aria-labelledby="path-title">
          <div className="landing-section-head">
            <p className="landing-label">TWO WAYS IN</p>
            <h2 id="path-title">Built for people.<br />Built for serious teams.</h2>
            <p>Whether you need AI capacity or have capacity to share, start with the path that fits you.</p>
          </div>
          <div className="landing-path-grid">
            <article className="landing-path-card landing-path-people">
              <span className="path-index">01 / INDIVIDUALS &amp; BUILDERS</span>
              <div className="path-orbit" aria-hidden="true"><span /><span /><span /></div>
              <div className="path-content">
                <h3>AI beyond the machine you own.</h3>
                <p>Request early access to shared open-weight AI. Have a capable computer? Explore the provider pilot and help test a network for diverse hardware.</p>
                <Link href="/individuals/" className="path-link">Explore the individual path <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="landing-path-card landing-path-enterprise">
              <span className="path-index">02 / ENTERPRISE &amp; INSTITUTIONS</span>
              <div className="path-rules" aria-hidden="true"><span /><span /><span /></div>
              <div className="path-content">
                <h3>AI capacity with a clearer line of control.</h3>
                <p>Scope one bounded workload with policy-aware placement, explicit quality targets, and evidence your security and governance teams can inspect.</p>
                <Link href="/enterprise/" className="path-link">Explore enterprise pilots <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
          </div>
        </section>

        <section className="landing-method" id="how-it-works" aria-labelledby="method-title">
          <div className="landing-section-head">
            <p className="landing-label">THE IDEA</p>
            <h2 id="method-title">One workload.<br />The right network around it.</h2>
            <p>OSCIRIS separates what you want to run from the question of which one machine must run it all.</p>
          </div>
          <div className="landing-step-grid">
            {steps.map((step) => (
              <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.body}</p></article>
            ))}
          </div>
        </section>

        <section className="landing-individual" aria-labelledby="individual-title">
          <div className="individual-symbol" aria-hidden="true"><Image src="/brand/osciris/o-blue.svg" alt="" width={190} height={190} /></div>
          <div>
            <p className="landing-label">FOR INDIVIDUALS</p>
            <h2 id="individual-title">Your laptop can be part of something larger.</h2>
            <p>Shared compute should be understandable on both sides: what a user can access, what a provider contributes, and how work is attributed. We are inviting early users and prospective providers into bounded pilots.</p>
            <div className="landing-inline-actions">
              <ButtonLink href="/individuals/">Explore early access</ButtonLink>
              <a href="mailto:info@oscirislabs.com?subject=OSCIRIS%20provider%20pilot">Ask about contributing compute <span aria-hidden="true">↗</span></a>
            </div>
            <p className="landing-small-note">Provider admission and any rewards depend on capability checks, metering, and approved program terms; they are not live public features.</p>
          </div>
        </section>

        <section className="landing-enterprise" id="enterprise" aria-labelledby="enterprise-title">
          <div className="landing-section-head">
            <p className="landing-label">FOR ENTERPRISE</p>
            <h2 id="enterprise-title">A pilot your technical team can actually evaluate.</h2>
            <p>Start with a workload and explicit boundaries. OSCIRIS helps define the compute route, acceptance measures, and review packet before you consider a wider rollout.</p>
            <ButtonLink href="/enterprise/" variant="secondary">See the enterprise path <span aria-hidden="true">↗</span></ButtonLink>
          </div>
          <div className="landing-enterprise-grid">
            {enterpriseCases.map((item) => (
              <article key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></article>
            ))}
          </div>
        </section>

        <section className="landing-proof" id="trust" aria-labelledby="proof-title">
          <div><p className="landing-label">PROOF, NOT PROMISES</p><h2 id="proof-title">Progress you can inspect. Limits we name plainly.</h2></div>
          <div>
            <p>OSCIRIS has demonstrated multi-machine inference and signed execution evidence in development. Production qualification, general self-service access, and open provider rewards are still in progress.</p>
            <p>The public proof console is a reviewed, read-only snapshot—not a live operations dashboard. Detailed pilot evidence is available for qualified review.</p>
            <div className="landing-proof-links">
              <Link href="/app/">View public proof status <span aria-hidden="true">↗</span></Link>
              <a href="mailto:info@oscirislabs.com?subject=OSCIRIS%20technical%20review">Request technical review <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="landing-final" aria-labelledby="final-title">
          <p className="landing-label">LET&apos;S BUILD WHAT COMES NEXT</p>
          <h2 id="final-title">Find your place in the network.</h2>
          <div className="landing-actions">
            <ButtonLink href="/individuals/">I&apos;m an individual</ButtonLink>
            <ButtonLink href="/enterprise/" variant="secondary">I&apos;m evaluating for a team</ButtonLink>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
