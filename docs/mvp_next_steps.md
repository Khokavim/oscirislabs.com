# OSCIRIS MVP Next Steps

Date: 2026-06-23

## Current State

The website now has a buyer-facing pilot flow:

```text
Submit Job -> Job Status -> Evidence Receipt -> Verifier Result
```

It is a static demo. It proves product shape and buyer journey, not production
authentication, persistence, live provider execution, or onchain settlement.

## Build Order

### 1. Production Hosting

Fix production routing before adding backend state.

- Make `https://oscirislabs.com/` serve the homepage.
- Make `https://oscirislabs.com/app/` serve the pilot app.
- Preferred path: point Cloudflare DNS to GitHub Pages.
- Alternative path: keep Railway, but ensure it builds this repo and serves
  `out/` from the repo root.

### 2. Authentication

Replace the demo access code with real private-pilot authentication.

- Add passwordless email login or allowlisted wallet login.
- Store buyer organization profiles.
- Gate `/app` behind authenticated sessions.
- Keep the public website static where possible.

### 3. Job Persistence

Replace local React state with durable job records.

- `jobs`: organization, workload, model target, policy, jurisdiction, status.
- `job_events`: submitted, prepared, assigned, running, completed, challenged.
- `artifacts`: manifest hash, evidence root, receipt bundle URL, verifier result.

### 4. Receipt API

Expose evidence as product-grade records.

- Create job receipt IDs.
- Store manifest and evidence hashes.
- Export JSON receipt.
- Export buyer-readable PDF receipt later.

### 5. Verifier API

Connect verifier output to the app.

- Accept verifier decisions from the OSCIRIS protocol repo.
- Show accepted, rejected, challenged, and pending states.
- Preserve rejection reasons and challenge-window timestamps.

### 6. Protocol Integration

Connect the web app to the existing OSCIRIS MVP evidence flow.

- Submit job from web app.
- Trigger DSP preparation.
- Assign provider.
- Ingest provider receipt.
- Ingest verifier result.
- Anchor receipt state to Horizen testnet when ready.

## Immediate Engineering Decision

Use a small backend first. The fastest practical stack is:

```text
Next.js app + Postgres + object storage + receipt JSON exports
```

Do not build a full marketplace yet. The MVP should prove one controlled buyer
job, one provider path, one verifier path, and one exportable evidence receipt.

## Done Criteria

- Buyer can log in.
- Buyer can submit a job.
- Job status survives refresh.
- Evidence receipt is persisted and downloadable.
- Verifier result is attached to the same job.
- The receipt contains enough data for a technical reviewer to reproduce the
  claim boundary.
