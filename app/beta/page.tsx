import type { Metadata } from "next";
import { BetaSignupForm } from "@/components/BetaSignupForm";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "Kimi 48B GPU closed beta",
  description:
    "Host one shard of the open Kimi Linear 48B model on your Mac or NVIDIA PC. Invite-only closed beta: check what your machine can host and apply.",
  openGraph: {
    title: "OSCIRIS closed beta: host a piece of Kimi 48B on your GPU",
    description: "Invite-only. Apple Silicon Macs with 16 GB or more and Ubuntu PCs with an NVIDIA GPU of 8 GB or more. Windows PCs with an NVIDIA GPU: test kit now, joining later.",
    images: [{ url: "/beta/osciris-closed-beta-flier.jpg", width: 1080, height: 1350 }],
  },
};

const machines = [
  { machine: "Mac, Apple Silicon", memory: "16–23 GB", shards: "20 of 27" },
  { machine: "Mac, Apple Silicon", memory: "24 GB or more", shards: "All 27" },
  { machine: "Ubuntu PC, NVIDIA GPU", memory: "8–11 GB VRAM", shards: "20 of 27" },
  { machine: "Ubuntu PC, NVIDIA GPU", memory: "12 GB VRAM or more", shards: "All 27" },
  { machine: "Windows PC, NVIDIA GPU (test kit now, joining later)", memory: "8–12 GB VRAM", shards: "20 of 27 once joining opens" },
  { machine: "Windows PC, NVIDIA GPU (test kit now, joining later)", memory: "More than 12 GB VRAM", shards: "All 27 once joining opens" },
];

const steps = [
  { title: "Apply", body: "Tell us your machine and its memory. The form shows what it can host." },
  { title: "Get your invite", body: "We pick machines in small rounds and send the download for your platform." },
  { title: "Install by hand", body: "Follow the guide. Every file comes with a SHA-256 checksum you can check." },
  { title: "See what fits", body: "The desktop app shows which Kimi shards this machine can host." },
  { title: "Join and serve", body: "We assign one shard. The app downloads and verifies it, then serves it." },
];

const questions = [
  { q: "Do I need a GPU?", a: "Yes, for this beta: an Apple Silicon Mac, or an NVIDIA GPU on Ubuntu. Windows PCs with an NVIDIA GPU can apply and run the test kit now; joining from Windows comes later. CPU-only machines, Intel Macs, WSL and AMD or Intel GPUs are coming soon." },
  { q: "Which part of the model do I get?", a: "We assign one shard that fits your memory, so the whole model stays covered. You don't pick it." },
  { q: "Why is the install manual?", a: "The beta isn't distributed through an app store. The release lists a checksum for every file so you can verify what you install. On a Mac, the guide shows how to allow the app the first time you open it." },
  { q: "What does it download?", a: "The app, then one shard of 1 to 5 GB, once. Kimi Linear 48B is an open model released under the MIT licence." },
  { q: "Can I still use my computer?", a: "Yes. Games and video export use the same GPU memory, so stop the worker from the app first. You can stop or leave at any time." },
  { q: "What happens to my details?", a: "They are stored on our own server, used only to run the beta and contact you about it, and deleted when you ask." },
];

export default function BetaPage() {
  return (
    <PageShell>
      <main id="main-content" className="beta-main">
        <section className="beta-hero" aria-labelledby="beta-title">
          <div className="beta-hero-copy">
            <p className="beta-badge">Closed beta · Invite only</p>
            <h1 id="beta-title">Host a piece of <em>Kimi 48B</em> on your GPU.</h1>
            <p className="beta-lede">The open Kimi Linear 48B model is split into 27 shards, one per layer. Your machine hosts one. Together, members&apos; machines serve the whole model.</p>
            <div className="landing-actions">
              <a className="button primary" href="#apply">Apply for the beta</a>
              <a className="button secondary beta-on-dark" href="/beta/osciris-closed-beta-flier.png" download>Download the flier</a>
            </div>
          </div>
          <a className="beta-flier" href="/beta/osciris-closed-beta-flier.png" aria-label="Open the closed beta flier at full size">
            <img src="/beta/osciris-closed-beta-flier.jpg" alt="OSCIRIS closed beta flier: host a piece of Kimi 48B on your GPU. Apple Silicon Macs with 16 GB or more and Ubuntu PCs with an NVIDIA GPU of 8 GB or more can join. Windows PCs with an NVIDIA GPU can run the test kit now and join later." width={1080} height={1350} />
          </a>
        </section>

        <section className="beta-section beta-two" aria-labelledby="who-title">
          <div>
            <p className="landing-label">WHO CAN JOIN</p>
            <h2 id="who-title">Two kinds of machine, measured shard by shard.</h2>
            <p>We measured every shard&apos;s memory on Apple Metal, NVIDIA CUDA on Ubuntu and NVIDIA CUDA on Windows at 4,096 tokens of context. A Mac keeps 8 GB of its memory free for macOS, and a Windows PC keeps 1 GB of GPU memory free for the desktop.</p>
          </div>
          <div className="beta-table-wrap">
            <table className="beta-table">
              <thead><tr><th scope="col">Machine</th><th scope="col">Memory</th><th scope="col">Shards it can host</th></tr></thead>
              <tbody>
                {machines.map((m) => (
                  <tr key={m.machine + m.memory}><td>{m.machine}</td><td className="num">{m.memory}</td><td className="num">{m.shards}</td></tr>
                ))}
                <tr className="soon"><td>WSL 2, Linux ARM, Intel Mac, AMD or Intel GPU, CPU only</td><td className="num">—</td><td>Coming soon</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="beta-section" aria-labelledby="flow-title">
          <p className="landing-label">HOW JOINING WORKS</p>
          <h2 id="flow-title">From application to serving, in five steps.</h2>
          <ol className="beta-steps">
            {steps.map((step) => (<li key={step.title}><h3>{step.title}</h3><p>{step.body}</p></li>))}
          </ol>
        </section>

        <section className="beta-section beta-apply" id="apply" aria-labelledby="apply-title">
          <div className="beta-apply-intro">
            <p className="landing-label">APPLY</p>
            <h2 id="apply-title">Apply for the closed beta.</h2>
            <p>Places are limited and we invite in small rounds. Applying for a machine that is coming soon is fine: we will contact you when it opens.</p>
            <p className="beta-small">Please don&apos;t include passwords, keys or private data. We never ask for them.</p>
          </div>
          <BetaSignupForm />
        </section>

        <section className="beta-section beta-two" aria-labelledby="faq-title">
          <div>
            <p className="landing-label">QUESTIONS</p>
            <h2 id="faq-title">What people ask before they join.</h2>
          </div>
          <dl className="beta-faq">
            {questions.map((item) => (<div key={item.q}><dt>{item.q}</dt><dd>{item.a}</dd></div>))}
          </dl>
        </section>
      </main>
    </PageShell>
  );
}
