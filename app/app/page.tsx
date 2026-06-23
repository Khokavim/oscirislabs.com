import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import {
  publishedProofOverview,
  publishedReceipts,
  publishingModel,
} from "@/lib/published-proof-feed";

export const metadata: Metadata = {
  title: "Proof Console",
  description:
    "OSCIRIS published proof console for Horizen testnet receipts, verifier decisions, and asynchronous evidence publication.",
};

export default function ProofConsolePage() {
  const leadReceipt = publishedReceipts[0];

  return (
    <PageShell>
      <main className="app-shell">
        <section className="app-header">
          <div>
            <p className="eyebrow">Published testnet feed</p>
            <h1>Horizen testnet proof console.</h1>
            <p>
              The OSCIRIS MVP app is a blockchain-backed proof surface. It publishes
              asynchronous receipt snapshots from smart-contract state rather than
              exposing a live operational dashboard.
            </p>
            <p className="demo-note">
              Current source of truth: contract receipts, verifier decisions, and
              published testnet anchors.
            </p>
          </div>
          <div className="header-actions">
            <a className="button primary" href="#published-receipts">
              View receipts
            </a>
            <a className="button secondary" href="#proof-detail">
              Inspect proof detail
            </a>
          </div>
        </section>

        <section className="app-note-band">
          <strong>Publishing mode</strong>
          <p>
            Public state is published daily or weekly from reviewed testnet contract
            events. The website does not represent live private job orchestration.
          </p>
        </section>

        <section className="status-grid" aria-label="Proof console overview">
          {publishedProofOverview.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="app-card" id="published-receipts">
          <div className="jobs-header">
            <div>
              <p className="eyebrow">Published receipts</p>
              <h2>Recent blockchain-backed updates.</h2>
            </div>
            <p className="demo-note">
              This view is intentionally read-only. Each row is a published receipt
              snapshot, not an in-browser job session.
            </p>
          </div>

          <div className="jobs-grid">
            {publishedReceipts.map((receipt) => (
              <article key={receipt.id} className="job-summary">
                <span>{receipt.id}</span>
                <strong>{receipt.modelTarget}</strong>
                <p>{receipt.jurisdiction}</p>
                <div className="job-summary-meta">
                  <small>{receipt.verifierDecision}</small>
                  <small>{receipt.publicationWindow}</small>
                </div>
                <div className="proof-link-list">
                  <small>tx: {truncate(receipt.transactionHash)}</small>
                  <small>block: {receipt.blockNumber}</small>
                </div>
                <a className="button secondary" href={`#${receipt.id}`}>
                  Open proof
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="app-card" id="proof-detail">
          <div>
            <p className="eyebrow">Proof detail</p>
            <h2>{leadReceipt.modelTarget}</h2>
            <p className="demo-note">
              Lead published receipt. Reviewer-facing fields are surfaced directly
              from the testnet publication bundle.
            </p>
          </div>

          <div className="receipt-ledger">
            <ReceiptRow label="Network" value={leadReceipt.network} />
            <ReceiptRow label="Contract" value={leadReceipt.contract} />
            <ReceiptRow label="Transaction hash" value={leadReceipt.transactionHash} />
            <ReceiptRow label="Block number" value={leadReceipt.blockNumber} />
            <ReceiptRow label="Receipt hash" value={leadReceipt.receiptHash} />
            <ReceiptRow label="Job hash" value={leadReceipt.jobHash} />
            <ReceiptRow label="Evidence root" value={leadReceipt.evidenceRoot} />
            <ReceiptRow label="Published at" value={leadReceipt.lastPublishedAt} />
          </div>

          <div className="status-grid">
            <Status label="Verifier decision" value={leadReceipt.verifierDecision} />
            <Status label="Quorum" value={leadReceipt.verifierQuorum} />
            <Status label="Jurisdiction" value={leadReceipt.jurisdiction} />
            <Status label="Cadence" value={leadReceipt.publicationWindow} />
          </div>
        </section>

        <section className="app-card">
          <div className="jobs-header">
            <div>
              <p className="eyebrow">Publishing model</p>
              <h2>What this MVP surface is, and what it is not.</h2>
            </div>
          </div>

          <div className="jobs-grid">
            {publishingModel.map((item) => (
              <article key={item.title} className="job-summary">
                <strong>{item.title}</strong>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="app-card">
          <div className="jobs-header">
            <div>
              <p className="eyebrow">Published anchors</p>
              <h2>Receipt references by snapshot.</h2>
            </div>
          </div>

          <div className="proof-feed-grid">
            {publishedReceipts.map((receipt) => (
              <article key={receipt.id} id={receipt.id} className="receipt-preview">
                <span>{receipt.id}</span>
                <strong>{truncate(receipt.receiptHash)}</strong>
                <p>
                  {receipt.verifierQuorum}. Published {receipt.lastPublishedAt}. Contract{" "}
                  {truncate(receipt.contract)}.
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageShell>
  );
}

function truncate(value: string) {
  return `${value.slice(0, 10)}...${value.slice(-8)}`;
}

function Status({ label, value }: { label: string; value: string }) {
  return (
    <article>
      <span>{label}</span>
      <strong>{value}</strong>
    </article>
  );
}

function ReceiptRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
