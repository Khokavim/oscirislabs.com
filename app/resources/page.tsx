import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PageShell } from "@/components/PageShell";

const whitepaperPdf = "/osciris-protocol-whitepaper.pdf";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "OSCIRIS resources: Data Shadow Protocol thesis, training and inference evidence, privacy threat model, Horizen smart contracts for verification coordination, validation program, and contact.",
};

const resources = [
  {
    number: "01",
    title: "Privacy threat model",
    body: "Protected secrets, adversary classes, release objects, and threshold gates for DSP deployments.",
  },
  {
    number: "02",
    title: "Training evidence",
    body: "AWS QLoRA adaptation benchmarks track wall-clock, quality retention, retry overhead, and cost-to-quality for bounded 7B enterprise workloads, including positive Qwen and Mistral evidence.",
  },
  {
    number: "03",
    title: "Inference evidence",
    body: "AWS L40S and Bedrock runs compare raw prompts against DSP-projected prompts with quality, token, runtime, and request-cost telemetry, including positive 100-case Qwen3-Coder Bedrock baselines.",
  },
  {
    number: "04",
    title: "Proof-aware contracts",
    body: "Horizen smart-contract design for proof receipts, verification checkpoints, escrow, provider accountability, and cost-to-quality validation.",
  },
  {
    number: "05",
    title: "Evidence availability",
    body: "Filecoin is the storage-layer roadmap for encrypted, content-addressed audit bundles: manifests, logs, verifier receipts, benchmark outputs, and review packs.",
  },
  {
    number: "06",
    title: "Protocol whitepaper",
    body: "Download the latest OSCIRIS Protocol whitepaper for the full DSP, verification-layer, evidence-storage, and decentralized compute thesis.",
    href: whitepaperPdf,
    linkLabel: "Download PDF",
  },
];

export default function ResourcesPage() {
  return (
    <PageShell>
      <main className="page-main">
        <PageHero eyebrow="Resources" title="Protocol evidence and enterprise validation.">
          <p>
            Start with the materials that define how DSP protects data, preserves model
            utility, validates training and inference economics, and connects
            cost-to-quality evidence to smart-contract verification coordination.
          </p>
        </PageHero>
        <section className="resource-grid">
          {resources.map((resource) => (
            <article key={resource.number}>
              <span>{resource.number}</span>
              <h2>{resource.title}</h2>
              <p>{resource.body}</p>
              {resource.href && resource.linkLabel ? (
                <a href={resource.href}>{resource.linkLabel}</a>
              ) : null}
            </article>
          ))}
        </section>
      </main>
    </PageShell>
  );
}
