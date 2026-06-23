# OSCIRIS MVP Next Steps

Date: 2026-06-23

## Current State

The website now has a server-backed buyer pilot flow:

```text
Submit Job -> Job Status -> Evidence Receipt -> Verifier Result
```

It includes pilot access, persisted job records, evidence receipts, verifier
results, and protocol status stubs. It proves product shape and buyer journey.
It does not yet prove production authentication, live provider execution, durable
managed database storage, or onchain settlement.

## Build Order

### 1. Production Hosting

Fix production routing before inviting reviewers.

- Make `https://oscirislabs.com/` serve the homepage.
- Make `https://oscirislabs.com/app/` serve the pilot app.
- Preferred path: point Cloudflare DNS to GitHub Pages.
- Current code path: Railway should build this repo and run `npm run start`.

### 2. Authentication

Current MVP status: implemented as a signed pilot session token.

Production hardening:

- Add passwordless email login or allowlisted wallet login.
- Store buyer organization profiles.
- Gate `/app` behind authenticated sessions.
- Set `OSCIRIS_PILOT_ACCESS_CODE` and `OSCIRIS_APP_SECRET` in Railway.

### 3. Job Persistence

Current MVP status: implemented as file-backed server records.

Production hardening:

- `jobs`: organization, workload, model target, policy, jurisdiction, status.
- `job_events`: submitted, prepared, assigned, running, completed, challenged.
- `artifacts`: manifest hash, evidence root, receipt bundle URL, verifier result.
- Move from file-backed storage to Postgres before real pilots.

### 4. Receipt API

Current MVP status: implemented as authenticated JSON receipt export.

Production hardening:

- Create job receipt IDs.
- Store manifest and evidence hashes.
- Export JSON receipt.
- Export buyer-readable PDF receipt later.

### 5. Verifier API

Current MVP status: implemented as verifier-result endpoint attached to each job.

Production hardening:

- Accept verifier decisions from the OSCIRIS protocol repo.
- Show accepted, rejected, challenged, and pending states.
- Preserve rejection reasons and challenge-window timestamps.

### 6. Protocol Integration

Current MVP status: implemented as protocol-status stubs on each job.

Production hardening:

- Submit job from web app.
- Trigger DSP preparation.
- Assign provider.
- Ingest provider receipt.
- Ingest verifier result.
- Anchor receipt state to Horizen testnet when ready.

## Immediate Engineering Decision

Use a small backend next. The fastest practical stack is:

```text
Next.js app + Postgres + object storage + receipt JSON exports
```

Do not build a full marketplace yet. The MVP should prove one controlled buyer
job, one provider path, one verifier path, and one exportable evidence receipt.

## Done Criteria

- Buyer can log in with pilot access.
- Buyer can submit a job.
- Job status is stored server-side.
- Evidence receipt is persisted and downloadable.
- Verifier result is attached to the same job.
- Protocol status is visible for DSP, provider, verifier, and Horizen anchor.
- The receipt contains enough data for a technical reviewer to inspect the claim
  boundary.
