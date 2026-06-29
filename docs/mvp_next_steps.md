# OSCIRIS MVP Next Steps

Date: 2026-06-23

## Current State

The website now has a blockchain-published proof surface:

```text
Published contract event -> receipt snapshot -> verifier state -> reviewer proof view
```

It includes published receipt snapshots, verifier decisions, contract hashes,
block references, and proof-detail views. It proves product shape and public
reviewability. It does not yet prove live provider execution, fully automated
testnet syncing, or production settlement.

## Build Order

### 1. Production Hosting

Fix production routing before inviting reviewers.

- Make `https://oscirislabs.com/` serve the homepage.
- Make `https://oscirislabs.com/app/` serve the proof console.
- Preferred path: point Cloudflare DNS to GitHub Pages.
- Current code path: Railway should build this repo and run `npm run start`.

### 2. Published Proof Feed

Current MVP status: implemented as a read-only published proof console.

Production hardening:

- Replace static receipt snapshots with published testnet event ingestion.
- Publish contract address, tx hash, block number, receipt hash, and verifier decision.
- Add last-sync metadata for daily or weekly publication windows.
- Use `OSCIRIS_HORIZEN_TESTNET_FEED_URL` or `OSCIRIS_PUBLISHED_FEED_URL` to switch from the fixture feed to a real publication endpoint.
- Use `OSCIRIS_PUBLISHED_FEED_PATH` for a local published bundle when the feed is exported as a static JSON artifact.
- Keep private reviewer workflows off the public path until needed.

### 3. Optional Private Operations

Current MVP status: deferred from the public MVP surface.

Production hardening:

- Only reintroduce a private operational store if OSCIRIS needs drafts, private
  reviewer state, or non-public orchestration controls.
- If that happens later, keep it separate from the published proof surface.
- Postgres is optional infrastructure, not part of the current blockchain-first
  website MVP.

### 4. Receipt Publication

Current MVP status: implemented as published receipt detail rendering.

Production hardening:

- Read reviewed receipt bundles from testnet publication output.
- Export buyer-readable JSON and PDF views later if needed.
- Preserve hash fidelity between contract publication and website rendering.

### 5. Verifier API

Current MVP status: implemented as published verifier-state presentation.

Production hardening:

- Accept verifier decisions from the OSCIRIS protocol repo.
- Show accepted, rejected, challenged, and pending states.
- Preserve rejection reasons and challenge-window timestamps.

### 6. Protocol Integration

Current MVP status: implemented as static published protocol references.

Production hardening:

- Replace static snapshot data with asynchronous ingestion from published
  Horizen testnet events.
- Render the latest reviewed contract state on the website.
- Link verifier decisions and contract anchors into the same proof view.

## Immediate Engineering Decision

Use a small publishing layer next. The fastest practical stack is:

```text
Next.js app + published testnet event snapshots + receipt JSON exports
```

Do not build a full marketplace yet. The MVP should prove that one reviewed
receipt path can be published from testnet state into a credible buyer-facing
proof console.

## Done Criteria

- The proof console shows published testnet receipts.
- Verifier state, contract address, tx hash, and block number are visible.
- Receipt hashes and evidence roots are shown consistently.
- Publication cadence and last-sync context are visible.
- The proof view contains enough data for a technical reviewer to inspect the
  claim boundary.
