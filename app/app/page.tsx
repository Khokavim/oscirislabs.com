import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { loadPublishedContributorManifest } from "@/lib/published-contributor-manifest";
import { loadPublishedParticipantStatus } from "@/lib/published-participant-status";
import { loadPublishedProofFeed } from "@/lib/published-proof-feed";

export const metadata: Metadata = {
  title: "Proof Console",
  description:
    "OSCIRIS published proof console for Horizen testnet receipts, verifier decisions, and asynchronous evidence publication.",
};

export const dynamic = "force-dynamic";

export default async function ProofConsolePage() {
  const feed = await loadPublishedProofFeed();
  const participantStatus = await loadPublishedParticipantStatus();
  const contributorManifest = await loadPublishedContributorManifest();
  const leadAnchor = feed.anchors[0];

  return (
    <PageShell>
      <main className="app-shell">
        <section className="app-header">
          <div>
            <p className="eyebrow">Published testnet feed</p>
            <h1>Horizen testnet proof console.</h1>
            <p>
              The OSCIRIS MVP app is a read-only proof surface. It publishes
              asynchronous anchor snapshots from reviewed snapshot state rather than
              exposing a live operational dashboard.
            </p>
            <p className="demo-note">
              Current source of truth: reviewed participant snapshot bundles,
              verifier decisions, and published testnet anchors.
            </p>
          </div>
          <div className="header-actions">
            <a className="button primary" href="#published-anchors">
              View anchors
            </a>
            <a className="button secondary" href="/api/proof-feed">
              Proof feed JSON
            </a>
          </div>
        </section>

        <section className="app-note-band">
          <strong>Publishing mode</strong>
          <p>
            Source: {feed.source.label}. Last synced: {feed.source.lastSyncedAt}. Public
            state is published daily or weekly from reviewed testnet contract events.
          </p>
        </section>

        {participantStatus ? (
          <section className="app-card" id="participant-snapshot">
            <div className="jobs-header">
              <div>
                <p className="eyebrow">Participant snapshot</p>
                <h2>Submit Job → Job Status → Evidence Receipt → Verifier Result.</h2>
              </div>
              <p className="demo-note">
                Published from <a href="/participant-status-summary.json">participant-status-summary.json</a>,{" "}
                exposed through <a href="/api/participant-status">/api/participant-status</a>, and mirrored as a read-only HTML snapshot at{" "}
                <a href="/participant-status.html">participant-status.html</a>.
              </p>
            </div>

            <div className="status-grid">
              <Status label="Job type" value={participantStatus.job_type} />
              <Status label="Current state" value={participantStatus.current_state} />
              <Status label="Assigned provider" value={participantStatus.assigned_provider_node_id} />
              <Status
                label="Verification receipts"
                value={String(participantStatus.counts.verification_receipts)}
              />
            </div>

            <div className="participant-flow">
              {participantStatus.stages.map((stage, index) => (
                <article key={stage.name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{stage.name}</h2>
                  <p>{stage.summary}</p>
                  <ul>
                    {stage.facts.map((fact) => (
                      <li key={fact}>{fact}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {contributorManifest ? (
          <section className="app-card" id="contributor-manifest">
            <div className="jobs-header">
              <div>
                <p className="eyebrow">Contributor manifest</p>
                <h2>GPU peer workflow manifest.</h2>
              </div>
              <p className="demo-note">
                Published from <a href="/contributor-manifest.json">contributor-manifest.json</a>, exposed through{" "}
                <a href="/api/contributor-manifest">/api/contributor-manifest</a>, and kept read-only for public review.
              </p>
            </div>

            <div className="status-grid">
              <Status label="Install" value="cargo install --path crates/osciris-cli" />
              <Status label="Identities" value="3 peers" />
              <Status label="Workflow steps" value={String(contributorManifest.workflow.length)} />
              <Status label="Public proofs" value={String(contributorManifest.public_proofs?.length ?? 0)} />
            </div>

            <div className="jobs-grid">
              {Object.entries(contributorManifest.identities).map(([role, identity]) => (
                <article key={role} className="job-summary">
                  <span>{identity.role}</span>
                  <strong>{identity.display_name}</strong>
                  <p>{identity.node_id}</p>
                  <div className="proof-link-list">
                    <small>peer: {identity.peer_id}</small>
                    <small>artifact: {identity.identity_json}</small>
                  </div>
                </article>
              ))}
            </div>

            <div className="participant-flow">
              {contributorManifest.workflow.map((step, index) => (
                <article key={step.name}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h2>{step.name}</h2>
                  <p>{step.detail}</p>
                </article>
              ))}
            </div>

            <div className="proof-link-list">
              {(contributorManifest.public_proofs ?? []).map((proof) => (
                <small key={proof.url}>
                  <a href={proof.url}>{proof.label}</a> - {proof.detail}
                </small>
              ))}
            </div>
          </section>
        ) : null}

        <section className="status-grid" aria-label="Proof console overview">
          {feed.overview.map((item) => (
            <article key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.detail}</p>
            </article>
          ))}
        </section>

        <section className="app-card" id="published-anchors">
          <div className="jobs-header">
            <div>
              <p className="eyebrow">Published anchors</p>
              <h2>Recent hash-led proof updates.</h2>
            </div>
            <p className="demo-note">
              This view is intentionally read-only. Each row is a published anchor
              snapshot, not an in-browser job session.
            </p>
          </div>

          <div className="jobs-grid">
            {feed.anchors.map((anchor) => (
              <article key={anchor.id} className="job-summary">
                <span>{anchor.id}</span>
                <strong>{anchor.anchorType.replaceAll("_", " ")}</strong>
                <p>{anchor.note}</p>
                <div className="job-summary-meta">
                  <small>{anchor.status}</small>
                  <small>{anchor.publishedAt}</small>
                </div>
                <div className="proof-link-list">
                  <small>commitment: {truncate(anchor.commitmentHash)}</small>
                  <small>bundle: {truncate(anchor.bundleHash)}</small>
                </div>
                <a className="button secondary" href={`#${anchor.id}`}>
                  Open proof
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="app-card" id="proof-detail">
          <div>
            <p className="eyebrow">Proof detail</p>
            <h2>{leadAnchor ? leadAnchor.subject : "No published anchors"}</h2>
            <p className="demo-note">
              Lead published anchor. Reviewer-facing fields are surfaced directly
              from the published snapshot bundle.
            </p>
          </div>

          <div className="receipt-ledger">
            <ReceiptRow label="Anchor type" value={leadAnchor?.anchorType ?? "snapshot"} />
            <ReceiptRow label="Subject" value={leadAnchor?.subject ?? "unknown"} />
            <ReceiptRow label="Commitment hash" value={leadAnchor?.commitmentHash ?? "n/a"} />
            <ReceiptRow label="Bundle hash" value={leadAnchor?.bundleHash ?? "n/a"} />
            <ReceiptRow label="Reviewer" value={leadAnchor?.reviewer ?? "n/a"} />
            <ReceiptRow label="Published at" value={leadAnchor?.publishedAt ?? "n/a"} />
            <ReceiptRow label="Note" value={leadAnchor?.note ?? "n/a"} />
          </div>

          <div className="status-grid">
              <Status label="Current state" value={participantStatus?.current_state ?? "unknown"} />
              <Status label="Anchor count" value={String(feed.anchors.length)} />
              <Status label="Publisher" value={participantStatus?.assigned_provider_node_id ?? "unknown"} />
              <Status label="Cadence" value="async publish" />
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
            {feed.publishingModel.map((item) => (
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
              <p className="eyebrow">Published anchor index</p>
              <h2>Hash commitments by snapshot.</h2>
            </div>
          </div>

          <div className="proof-feed-grid">
            {feed.anchors.map((anchor) => (
              <article key={anchor.id} id={anchor.id} className="receipt-preview">
                <span>{anchor.id}</span>
                <strong>{truncate(anchor.commitmentHash)}</strong>
                <p>
                  {anchor.status}. Published {anchor.publishedAt}. Bundle {truncate(anchor.bundleHash)}.
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
