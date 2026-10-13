import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { ShardStrip } from "@/components/ShardStrip";

export const metadata: Metadata = {
  title: "OSCIRIS | AI compute, connected",
  description:
    "OSCIRIS splits open AI models into shards that everyday Macs and NVIDIA PCs can host, and runs them as one model with signed records of every step. The Kimi 48B GPU closed beta is taking applications.",
};

const measured = [
  { label: "Model", value: "Kimi Linear 48B, MIT licence" },
  { label: "Shards", value: "27, one per layer" },
  { label: "Smallest shard needs", value: "3.9 GB on NVIDIA · 4.8 GB on a Mac" },
  { label: "GPU result vs CPU result", value: "Cosine 0.99999 on Apple M4 Pro · 0.9999998 on Tesla T4" },
];

const steps = [
  { title: "Split the model", body: "Each layer of an open model becomes its own package, pinned by a content hash so every machine loads exactly the same weights." },
  { title: "Assign shards that fit", body: "The coordinator gives each machine one shard its GPU memory can hold, using memory measured shard by shard on Apple Metal and NVIDIA CUDA." },
  { title: "Run and check", body: "Activations pass from machine to machine over pinned, encrypted connections. Every step comes back signed, so the work can be reviewed." },
];

export default function Home() {
  return (
    <PageShell>
      <main id="main-content" className="lp-main">
        <section className="lp-hero" aria-labelledby="landing-title">
          <div className="lp-hero-copy">
            <Link className="lp-pill" href="/beta/"><span aria-hidden="true" />Kimi 48B GPU closed beta · Applications open</Link>
            <h1 id="landing-title">Run big open models on the machines people <em>already own.</em></h1>
            <p className="lp-lede">
              OSCIRIS splits a model like Kimi Linear 48B into shards that everyday Macs and NVIDIA PCs can host,
              then runs them together as one model.
            </p>
            <div className="landing-actions">
              <ButtonLink href="/beta/">Apply for the GPU beta <span aria-hidden="true">↗</span></ButtonLink>
              <a className="button secondary lp-on-dark" href="#how-it-works">How it works</a>
            </div>
            <p className="lp-who">Open to Apple Silicon Macs with 16 GB or more and Ubuntu PCs with an NVIDIA GPU of 8 GB or more. Windows PCs with an NVIDIA GPU: test kit now, joining later.</p>
          </div>

          <div className="lp-proof-card" aria-labelledby="proof-card-title">
            <p className="lp-card-label" id="proof-card-title">Measured in development · October 2026</p>
            <ShardStrip />
            <dl className="lp-measured">
              {measured.map((m) => (<div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>))}
            </dl>
          </div>
        </section>

        <section className="lp-section" id="how-it-works" aria-labelledby="method-title">
          <div className="lp-head">
            <p className="landing-label">HOW IT WORKS</p>
            <h2 id="method-title">One model, spread across many machines.</h2>
            <p>No single computer has to hold all 48 billion parameters. Each one holds the part it can, and the network runs the parts in order.</p>
          </div>
          <ol className="lp-steps">
            {steps.map((step) => (<li key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>))}
          </ol>
        </section>

        <section className="lp-section lp-paths" aria-labelledby="path-title">
          <div className="lp-head">
            <p className="landing-label">WHO IT IS FOR</p>
            <h2 id="path-title">Bring a machine, or bring a workload.</h2>
          </div>
          <div className="lp-path-grid">
            <article className="lp-path lp-path-people">
              <p className="landing-label">INDIVIDUALS &amp; BUILDERS</p>
              <h3>Put your Mac or GPU to work.</h3>
              <p>Host one shard of Kimi 48B in the closed beta, and get early access to models bigger than any one of our machines.</p>
              <div className="lp-path-links">
                <Link href="/beta/">Apply for the GPU beta <span aria-hidden="true">↗</span></Link>
                <Link href="/individuals/">More for individuals <span aria-hidden="true">↗</span></Link>
              </div>
            </article>
            <article className="lp-path lp-path-enterprise">
              <p className="landing-label">ENTERPRISE &amp; INSTITUTIONS</p>
              <h3>Run a pilot your security team can review.</h3>
              <p>Scope one bounded workload with a declared data boundary, quality target and latency budget, and keep the signed evidence for review.</p>
              <div className="lp-path-links">
                <Link href="/enterprise/">Explore enterprise pilots <span aria-hidden="true">↗</span></Link>
                <a href="mailto:info@oscirislabs.com?subject=OSCIRIS%20pilot%20review">info@oscirislabs.com</a>
              </div>
            </article>
          </div>
        </section>

        <section className="lp-section lp-status" id="trust" aria-labelledby="proof-title">
          <div>
            <p className="landing-label">WHERE WE ARE</p>
            <h2 id="proof-title">What works today, and what doesn&apos;t yet.</h2>
          </div>
          <div className="lp-status-grid">
            <div>
              <h3>Working in development</h3>
              <ul>
                <li>Inference across several machines, with signed execution receipts</li>
                <li>Every Kimi 48B shard measured for memory on Apple Metal, and on NVIDIA CUDA on Ubuntu and Windows</li>
                <li>GPU builds for Mac and Ubuntu that reproduce byte for byte</li>
              </ul>
            </div>
            <div>
              <h3>Not open yet</h3>
              <ul>
                <li>Open sign-up for anyone. The beta is invite only</li>
                <li>Intel Macs, WSL, AMD and Intel GPUs, and CPU-only machines</li>
                <li>Rewards or payment for hosting</li>
              </ul>
            </div>
          </div>
          <Link className="lp-text-link" href="/app/">See the public proof status <span aria-hidden="true">↗</span></Link>
        </section>

        <section className="lp-final" aria-labelledby="final-title">
          <a className="lp-final-flier" href="/beta/osciris-closed-beta-flier.png" aria-label="Open the closed beta flier">
            <img src="/beta/osciris-closed-beta-flier.jpg" alt="OSCIRIS closed beta flier" width={1080} height={1350} loading="lazy" />
          </a>
          <div>
            <p className="landing-label">CLOSED BETA</p>
            <h2 id="final-title">Host a piece of Kimi 48B.</h2>
            <p>Check what your machine can host and apply in two minutes. We invite in small rounds.</p>
            <div className="landing-actions">
              <ButtonLink href="/beta/">Apply for the GPU beta</ButtonLink>
              <a className="button secondary" href="/beta/osciris-closed-beta-flier.png" download>Download the flier</a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
