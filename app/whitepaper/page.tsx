import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

const whitepaperPdf = "/osciris-protocol-whitepaper.pdf";

export const metadata: Metadata = {
  title: "Whitepaper",
  description:
    "Read the OSCIRIS whitepaper overview: Data Shadow Protocol, private enterprise training and inference, Horizen smart contracts for verification coordination, cost-to-quality validation, and deployment evidence.",
};

const sections = [
  {
    id: "abstract",
    title: "Abstract",
    body:
      "OSCIRIS defines a commercial Data Shadow Protocol for useful enterprise AI workloads while reducing raw-data exposure. The thesis combines privacy controls, utility measurement, training economics, inference economics, and cost-to-quality validation for deployable secure compute.",
  },
  {
    id: "protocol",
    title: "Data Shadow Protocol",
    body:
      "DSP transforms enterprise data into controlled training artifacts through keyed projections, guarded feature handling, tensor compression, sharding, and manifest integrity. Each release object is measured against utility, leakage, and operational constraints.",
  },
  {
    id: "privacy",
    title: "Privacy scope",
    body:
      "Privacy is the primary selling point. OSCIRIS tracks reconstruction, property inference, membership inference, collusion, and differential privacy scope so enterprise buyers can inspect what is protected and what remains out of scope.",
  },
  {
    id: "economics",
    title: "Training and inference economics",
    body:
      "OSCIRIS measures cost-to-quality rather than raw speed alone. Current evidence includes bounded AWS 7B QLoRA adaptation, AWS L40S inference telemetry, and AWS Bedrock managed-inference procurement baselines for DSP-projected enterprise prompts.",
  },
  {
    id: "aws",
    title: "AWS evidence status",
    body:
      "The latest AWS evidence supports the commercial direction: bounded 7B QLoRA adaptation showed positive cost-to-quality for Qwen and Mistral training workloads, AWS L40S tests showed Qwen-family DSP-projected inference can improve quality-adjusted economics, and AWS Bedrock managed inference produced positive 100-case procurement baselines for Qwen3-Coder 480B and 30B. These are benchmark-backed claims for controlled workloads, not broad production or decentralized-market guarantees.",
  },
  {
    id: "verification",
    title: "Horizen verification layer",
    body:
      "OSCIRIS treats verification coordination as a required protocol layer. Horizen smart contracts can record proof receipts, track policy checkpoints, coordinate release conditions, and make decentralized economics accountable to verification outcomes.",
  },
  {
    id: "storage",
    title: "Filecoin evidence availability",
    body:
      "The OSCIRIS storage roadmap separates receipt coordination from evidence persistence. Horizen coordinates proof receipts and settlement state, while Filecoin is a candidate decentralized storage layer for encrypted, content-addressed evidence bundles such as manifests, logs, benchmark outputs, verifier receipts, and audit packs.",
  },
  {
    id: "proof",
    title: "Commercial validation gates",
    body:
      "Commercial viability depends on privacy, training utility, inference quality, storage availability, and validation discipline. OSCIRIS uses validation gates for CUDA performance, distributed reliability, cost-to-quality validation, smart-contract verification controls, evidence persistence, and large-model assumptions so efficiency claims can be tested before scale-out.",
  },
];

export default function WhitepaperPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="Whitepaper" title="The DSP commercial thesis.">
          <p>
            A public overview of the Data Shadow Protocol, private enterprise model
            training and inference, Horizen smart-contract verification coordination,
            Filecoin evidence availability path, cost-to-quality validation strategy,
            and evidence gates behind OSCIRIS.
          </p>
          <div className="page-hero-actions">
            <ButtonLink href={whitepaperPdf}>Download full PDF</ButtonLink>
          </div>
        </PageHero>

        <section className="paper-layout">
          <aside className="paper-index">
            <span>Contents</span>
            {sections.map((section) => (
              <a key={section.id} href={`#${section.id}`}>
                {section.title}
              </a>
            ))}
          </aside>
          <article className="paper-body">
            {sections.map((section) => (
              <section key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </article>
        </section>
      </main>
    </PageShell>
  );
}
