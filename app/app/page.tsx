import type { Metadata } from "next";
import { ButtonLink } from "@/components/ButtonLink";
import { PageShell } from "@/components/PageShell";
import { loadPublishedProofFeed } from "@/lib/published-proof-feed";

export const metadata: Metadata = {
  title: "Public Proof Status",
  description:
    "A limited, read-only OSCIRIS credibility surface showing reviewed execution and receipt status.",
};

export default async function ProofStatusPage() {
  const feed = await loadPublishedProofFeed();
  const leadProof = feed.proofs[0];

  return (
    <PageShell>
      <main className="app-shell">
        <section className="app-header">
          <div>
            <p className="eyebrow">Public credibility layer</p>
            <h1>Reviewed proof status.</h1>
            <p>
              This limited, read-only surface confirms reviewed outcomes without
              exposing participant identities, job metadata, operational endpoints, or
              implementation workflow.
            </p>
          </div>
          <div className="header-actions">
            <a className="button primary" href="#proof-status">
              View status
            </a>
          </div>
        </section>

        <section className="status-grid" id="proof-status" aria-label="OSCIRIS public proof status">
          <Status label="Execution" value={feed.status.execution} />
          <Status label="Receipt" value={feed.status.receipt} />
          <Status label="Review" value={feed.status.review} />
          <Status label="Mode" value="Read-only" />
        </section>

        <section className="app-card">
          <div className="jobs-header">
            <div>
              <p className="eyebrow">Commitment</p>
              <h2>Public proof of existence.</h2>
            </div>
            <p className="demo-note">
              The commitment supports public verification without publishing the
              underlying evidence package or operational metadata.
            </p>
          </div>

          <div className="receipt-ledger">
            <ReceiptRow label="Status" value={leadProof?.status ?? "Unavailable"} />
            <ReceiptRow
              label="Commitment hash"
              value={leadProof?.commitmentHash ?? "No public commitment"}
            />
          </div>
        </section>

        <section className="cta-panel">
          <div>
            <p className="eyebrow">Qualified review</p>
            <h2>Need the supporting technical evidence?</h2>
            <p>
              Detailed mechanisms and validation material are available to qualified
              reviewers under confidentiality.
            </p>
          </div>
          <ButtonLink href="mailto:info@oscirislabs.com?subject=OSCIRIS%20proof%20review">
            Request private review
          </ButtonLink>
        </section>
      </main>
    </PageShell>
  );
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
