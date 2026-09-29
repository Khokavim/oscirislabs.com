import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "For enterprise",
  description:
    "Scope a controlled OSCIRIS AI compute pilot with explicit workload, data, provider, performance, and evidence boundaries.",
};

const reviewPoints = [
  { label: "01 / WORKLOAD", title: "Start narrow", body: "Choose one use case, an open-weight model or evaluation task, and a baseline you can measure against." },
  { label: "02 / CONTROL", title: "Declare boundaries", body: "Specify data classes, allowed providers and regions, security owners, and what may be retained or reviewed." },
  { label: "03 / EVIDENCE", title: "Set pass criteria", body: "Agree on quality, latency, reliability, and execution records before a pilot is called successful." },
];

export default function EnterprisePage() {
  return (
    <PageShell>
      <main id="main-content" className="audience-main audience-enterprise">
        <section className="audience-hero">
          <p className="landing-label">FOR ENTERPRISE &amp; INSTITUTIONS</p>
          <h1>AI pilots with a clearer line of control.</h1>
          <p>OSCIRIS helps teams investigate distributed open-weight inference and controlled external compute without making production claims ahead of workload-specific evidence.</p>
          <div className="landing-actions">
            <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20enterprise%20pilot%20review">Request a private pilot review</ButtonLink>
            <ButtonLink href="#pilot-path" variant="secondary">See the pilot path</ButtonLink>
          </div>
          <p className="audience-disclaimer">Design-partner and bounded pilot conversations—not general enterprise availability.</p>
        </section>

        <section className="audience-pilot" id="pilot-path">
          <div className="landing-section-head">
            <p className="landing-label">A REVIEWABLE START</p>
            <h2>One workload. One declared contract.</h2>
            <p>Bring your AI lead and a risk owner. We will scope what the system must prove, rather than asking you to accept a generic platform claim.</p>
          </div>
          <div className="landing-step-grid">
            {reviewPoints.map((item) => (
              <article key={item.label}><span>{item.label}</span><h3>{item.title}</h3><p>{item.body}</p></article>
            ))}
          </div>
        </section>

        <section className="audience-duo">
          <article>
            <span>WHERE TO BEGIN</span>
            <h2>Capacity for a defined model workload.</h2>
            <p>Evaluate a distributed inference topology or model-serving requirement with measured quality, end-to-end performance, cost, and failure handling. Place geography in the workload policy rather than assuming one route fits every job.</p>
          </article>
          <article>
            <span>WHERE TRUST MATTERS</span>
            <h2>Privacy and proof, with limits stated.</h2>
            <p>Discuss controlled representations for sensitive tasks, provider constraints, and signed execution records. Privacy or security assurances belong to the exact workload and mechanism tested—not to a blanket promise.</p>
            <a href="mailto:info@oscirislabs.com?subject=OSCIRIS%20technical%20review">Request technical review <span aria-hidden="true">↗</span></a>
          </article>
        </section>

        <section className="audience-boundary">
          <div><p className="landing-label">HONEST READINESS</p><h2>What a review can establish.</h2></div>
          <div>
            <p>Development-stage multi-machine execution and signed receipts have been demonstrated. A production deployment still needs release-bound qualification, workload quality thresholds, operational controls, and a buyer-specific acceptance decision.</p>
            <p>The public proof console shows a reviewed snapshot, not a live service-status dashboard or production certification.</p>
            <Link href="/app/">View public proof status <span aria-hidden="true">↗</span></Link>
          </div>
        </section>

        <section className="audience-final">
          <p className="landing-label">PRIVATE PILOT REVIEW</p>
          <h2>Bring a workload. Leave with a testable plan.</h2>
          <p>For an initial conversation, share only a high-level use case, operating jurisdiction, and review objective. Please do not email confidential datasets or credentials.</p>
          <div className="landing-actions">
            <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20enterprise%20pilot%20review">Request private review</ButtonLink>
            <ButtonLink href="/about/" variant="secondary">About OSCIRIS</ButtonLink>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
