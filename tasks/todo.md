# Task Plan

## Authenticated MVP App Flow

- [x] Review conversion critique and extract implementation scope
- [x] Tighten homepage promise with less copy
- [x] Add buyer use cases and simple architecture diagram
- [x] Build `/app` authenticated demo flow
- [x] Implement Submit Job -> Job Status -> Evidence Receipt -> Verifier Result
- [x] Verify static export and production audit
- [x] Push website update and document result

## Production Routing Follow-Up

- [x] Confirm GitHub Pages deployment status
- [x] Confirm current live-domain routing behavior
- [x] Add Railway runtime config for repo-root static export
- [x] Build and verify Railway-compatible start command locally
- [x] Push routing config update
- [x] Re-check live domain after deployment
- [x] Define next MVP implementation steps

## Server-Backed MVP 1-6

- [x] Switch production runtime from static export to Next server
- [x] Add signed pilot authentication API
- [x] Add persisted job API
- [x] Add evidence receipt API
- [x] Add verifier result API
- [x] Add protocol status integration stub
- [x] Build, audit, and verify API flow locally
- [x] Push server-backed MVP update
- [x] Replace file store with Postgres-capable MVP store
- [x] Remove public pilot-code disclosure from the app UI

## Deferred Infrastructure

- [ ] Add Railway Postgres and verify DATABASE_URL wiring if private operational state returns to the public MVP path

## Runtime Storage Visibility

- [x] Expose active MVP storage mode in runtime health output
- [x] Surface storage readiness in the pilot app
- [x] Verify file-mode fallback locally and document the result

## Persistence Verification

- [x] Surface recent authenticated jobs in the pilot app
- [x] Allow reopening a prior job to inspect persisted receipt state
- [x] Verify the recent-jobs flow locally

## Storage Failure Handling

- [x] Return explicit `503` responses when configured storage is unavailable
- [x] Surface actionable storage failure messages in the pilot app
- [x] Verify unreachable-database behavior locally

## Proof Feed Smoke Check

- [x] Add a one-command proof feed verification script
- [x] Wire the script into package scripts
- [x] Verify the proof feed smoke check locally against the running app

## Blockchain-Published App MVP

- [x] Reframe `/app` as a blockchain-published proof console
- [x] Remove private job-console framing from the user-facing `/app`
- [x] Verify the new read-only proof surface locally

## Async Proof Feed

- [x] Add a feed loader for Horizen testnet proof snapshots
- [x] Add a JSON route for the published proof feed
- [x] Render `/app` from the async feed with fixture fallback

## Participant Snapshot Publication

- [x] Publish the OSCIRIS participant snapshot bundle into `public/`
- [x] Expose the snapshot through `/api/participant-status`
- [x] Render the Submit Job -> Job Status -> Evidence Receipt -> Verifier Result
      flow on the proof console
- [x] Add footer links to the participant snapshot HTML and JSON artifacts
- [x] Re-run the website smoke verification against the updated proof surface

### Review

- Added `public/participant-status-summary.json` and
  `public/participant-status.html` as published snapshot artifacts.
- The proof console now renders the participant snapshot flow directly from the
  published JSON bundle and exposes the same data through `/api/participant-status`.
- Footer links now point to both the snapshot HTML and the raw JSON artifact.
- Verification passed:
  - `npm run build`
  - `npm run verify:mvp`

## MVP Execution 1-6

- [x] Verify and document live deployment routing state for `oscirislabs.com`
- [x] Define the OSCIRIS MVP product flow and buyer-facing artifacts
- [x] Add public MVP dashboard/product page to the website
- [x] Add provider-node MVP operating path
- [x] Add verifier/receipt MVP operating path
- [x] Add Horizen testnet MVP integration path
- [x] Build, verify, push, and document completion

## Sovereign AI Business Website Refresh

- [x] Review current landing page, footer, resources, and public proof links
- [x] Apply business-first "Sovereign AI Infrastructure-as-a-Service" positioning
- [x] Add buyer-facing sections for sovereignty controls, business offer, and proof-backed credibility
- [x] Move proof/resource links into an advanced footer proof library
- [x] Run focused Codex Security review and dependency/static-site checks
- [x] Build and verify rendering and static export
- [x] Document results and residual risks

- [x] Update public website with latest training and inference evidence
- [x] Add Bedrock 100-case inference metrics to homepage positioning
- [x] Add AWS evidence status to the whitepaper overview
- [x] Add a stronger commercial potential section to the homepage
- [x] Introduce Filecoin as an evidence availability/storage roadmap layer
- [x] Keep Horizen/Filecoin responsibilities separate in public copy
- [x] Build and verify the updated website locally
- [x] Commit, push, and verify production deployment

- [x] Audit sibling project folders to determine which already have git metadata and which do not.
- [x] Initialize the missing project folders as independent git repos on `main`.
- [x] Verify repo state for all three relevant folders and document the result.

- [x] Inspect reference Global Threat Map visual theme
- [x] Clone and sample `awesome-design-md` inspiration repository
- [x] Check `/Users/meshachishaya/CascadeProjects/windsurf-project/OSCIRIS` for actual project context
- [x] Rework public site direction around OSCIRIS, Whitepaper, About, Resources, and Contact
- [x] Replace static HTML/CSS with a Next.js App Router project
- [x] Add shared React components for nav, footer, buttons, cards, and page heroes
- [x] Add generated secure-compute hero visual under `public/`
- [x] Implement Home, Whitepaper, About, and Resources routes
- [x] Install dependencies and verify static Next.js build
- [x] Run local Next dev server on port 4173 and verify in Browser
- [x] Document implementation review
- [x] Reposition OSCIRIS as a commercial DSP protocol, not pure research
- [x] Make the secure-compute image the hero background layer
- [x] Re-verify build and browser rendering
- [x] Refine Horizen/ZEN language around smart-contract verification coordination
- [x] Remove foreground hero proof card so the image is background-only
- [x] Extend the secure-compute image treatment across the landing background
- [x] Re-check desktop and mobile rendering after the full-background pass
- [x] Add deployment workflow for `oscirislabs.com`
- [x] Commit and push the website to `main`
- [x] Verify GitHub Pages deployment
- [ ] Fix Cloudflare/Namecheap DNS so `oscirislabs.com` reaches GitHub Pages directly
- [x] Find latest OSCIRIS whitepaper in the `ConsultingApp` workspace
- [x] Attach latest whitepaper to the landing page CTA/link
- [x] Build and locally verify the latest whitepaper link
- [x] Commit, push, and verify the updated deployment
- [x] Update footer contact email and copyright text
- [x] Run AWS preflight for OSCIRIS 3-node production-evidence sprint
- [x] Stop before provisioning because `g5.xlarge` quota is blocked
- [x] Verify no tagged benchmark EC2 instances or volumes were launched
- [x] Request `48` G/VT vCPU EC2 quota for a stronger `g5.12xlarge` evidence run
- [x] Attempt smaller `4` G/VT vCPU request after user reported `48` rejection
- [x] Re-run AWS preflight after `8` G/VT vCPU approval in `us-east-1`
- [x] Launch controlled 3-node AWS sprint: `1x g5.xlarge` plus `2x c7i.large`
- [x] Run OSCIRIS evidence commands and collect private S3 artifact bundle
- [x] Tear down all tagged AWS resources and verify cleanup
- [x] Add OSCIRIS logo asset to the website
- [x] Convert public website from dark theme to white theme
- [x] Verify light-theme render on desktop and mobile
- [x] Refine homepage typography and spacing toward lighter Obscura-style proportions
- [x] Replace public whitepaper with latest OSCIRIS source PDF
- [x] Verify latest whitepaper PDF link locally before publishing
- [x] Remove overly strong ZK/proof wording from public site copy
- [x] Replace unproven cost-saving language with cost-to-quality validation
- [x] Inspect official `Osciris.zip` brand assets from `~/Downloads`
- [x] Import official logo variants into the website and replace the current mark usage
- [x] Fix mobile navigation and small-screen layout issues
- [x] Verify desktop and mobile rendering with a local build and browser checks

## Review

Authenticated MVP app flow result: added `/app` as a buyer pilot surface. It
uses a signed pilot access session, then walks the buyer through Submit Job, Job
Status, Evidence Receipt, and Verifier Result. Job state, receipts, verifier
results, and protocol status are now served through MVP API routes.

Conversion critique implementation: tightened the hero promise to say more with
less: keep data under institutional control, run workloads on verified compute,
and export audit-ready receipts. Added immediate buyer use cases for banking and
fintech, telcos, public sector, and research/universities. Added a simple
architecture path from institutional data to buyer dashboard.

Verification passed:
- `npm run build`
- `npm audit --omit=dev`
- local static export served `/` and `/app/` with expected content markers
- Railway-style start command served `out/` correctly with `PORT=4181`
- local `/api/health` now reports storage mode and database readiness

Next MVP build order is documented in `docs/mvp_next_steps.md`: production
routing, authentication, persisted jobs, receipt API, verifier API, and protocol
integration. The intended scope is one controlled buyer job, one provider path,
one verifier path, and one exportable receipt before marketplace expansion.

Server-backed MVP 1-6 result: the app now runs on the Next server runtime rather
than static export. `/api/session` issues signed pilot sessions, `/api/jobs`
creates and lists persisted job records, and each job exposes receipt, verifier,
and protocol status endpoints. Local production verification passed for login,
job creation, job retrieval, receipt retrieval, verifier retrieval, protocol
status retrieval, unauthorized `401`, and `/app/` rendering.

Verification limitation: Playwright is not installed in this website repo, so the
interactive click-through was not browser-automated in this pass. The flow is
implemented as a client component and compiles into the static export.

MVP execution result: added a dedicated `/mvp` public product page that explains
the six-step buyer flow: submit workload, prepare DSP artifact, assign provider,
execute and capture evidence, verify result, and export receipt state. The page
also exposes readiness status across protocol state, privacy layer, buyer
surface, and Horizen testnet path.

Deployment routing result: git and GitHub Actions deploy correctly. The live
domain currently serves through Cloudflare to Railway. A repo-side Railway config
has been added so Railway builds from the repo root and serves the static export
from `out` on Railway's `$PORT`. If the live domain still serves the wrong root
after deployment, the remaining fix is in Railway/Cloudflare settings: connected
repository, service root directory, pinned deployment, or DNS target. The exact
routing options are documented in `docs/deployment_routing_fix.md`.

MVP implementation support result: protocol docs now include provider-node,
verifier/receipt, evidence packaging, and Horizen testnet integration runbooks.
The Rust CLI was extended so the MVP network commands can read signing seeds
from private seed files rather than exposing seeds in shell arguments.

Verification passed:
- `npm run build`
- `npm audit --omit=dev`
- `cargo fmt --check`
- `cargo test --workspace`
- CLI help output confirms `--signing-key-seed-file` for the MVP network
  commands

MVP boundary: this is a buyer-visible developer MVP path, not production
mainnet, audited privacy, permissionless provider admission, or real-payment
settlement.

Runtime storage visibility result: `/api/health` now reports whether the app is
running on file fallback or Postgres, and the pilot app surfaces the same state
to the user. Local verification confirms the current no-database path reports
`mode=file`, `databaseConfigured=false`, and `databaseReachable=false`, which
sets a clean verification baseline before Railway Postgres is attached.
Production verification now matches the same state at
`https://oscirislabs.com/api/health/`, which means Railway is serving the live
app correctly but has not yet been wired to Postgres.
The cutover checklist is now documented in
`docs/railway_postgres_cutover.md`.

Persistence verification result: the pilot app now exposes recent authenticated
jobs and allows reopening a prior record to inspect the same receipt and
verifier state. Local API verification passed for session creation, job
creation, job listing, and newest-job ordering, which gives a concrete test path
for the future Railway Postgres check: create a job, redeploy or restart, sign
in again, and confirm the same job still appears in the recent-jobs list.

Storage failure handling result: authenticated job endpoints now return explicit
`503` responses when `DATABASE_URL` is configured but the database is not
reachable, instead of failing with a generic server error. The pilot app now
surfaces the returned storage detail message so Railway misconfiguration is
immediately visible to a reviewer. Local verification against an invalid
Postgres URL returned the expected `503` body for both job listing and receipt
retrieval.

Proof feed smoke-check result: `npm run verify:mvp` now validates the published
proof surface in one command: health, proof-feed JSON, proof-console markers,
and homepage proof-console CTA. Local verification passed against the running
app and confirmed the proof console markers on `/app` and `/`.

Blockchain-published app result: `/app` is now a read-only proof console rather
than a private operational dashboard. It presents published receipt snapshots,
contract addresses, transaction hashes, block references, verifier decisions,
and publication cadence as the MVP proof surface. The current user-facing app
no longer depends on Postgres framing or private session flow to explain the
product.
The former Railway Postgres item is now deferred infrastructure, not current
MVP scope.

Async proof feed result: the proof console now renders from `loadPublishedProofFeed()`
and can switch to `OSCIRIS_HORIZEN_TESTNET_FEED_URL` or
`OSCIRIS_PUBLISHED_FEED_URL` when a real Horizen testnet publication endpoint is
available. It can also read a published bundle from `public/proof-feed.json` or
an explicit `OSCIRIS_PUBLISHED_FEED_PATH`. Until then it uses the published
fixture feed and exposes the same JSON through `/api/proof-feed`.

Build artifact fix result: `scripts/create-pages-artifact.mjs` now skips missing
static outputs like `/app.html`, so the server-rendered proof console can stay
dynamic while the remaining static pages still build cleanly.

Published bundle result: the proof console now prefers a remote testnet feed,
then a published JSON bundle at `public/proof-feed.json` or
`OSCIRIS_PUBLISHED_FEED_PATH`, and only falls back to the in-code fixture if no
published artifact is present.

Sovereign AI business refresh result: the homepage now sells OSCIRIS as
Sovereign AI Infrastructure-as-a-Service for regulated enterprises, public
institutions, and emerging-market AI ecosystems. The new structure leads with
business value, then explains sovereignty controls across data, compute, model
artifacts, operations, and economics. It also separates the business offer from
the protocol stack: DSP prepares controlled artifacts, OSCIRIS routes and
coordinates work, receipts/checks create accountability, and stable billing plus
ZEN-backed provider collateral keep enterprise procurement separate from
speculative-token payment.

Footer/resource update: the footer now behaves like an advanced proof library,
with direct links to the whitepaper, resources, training evidence, privacy threat
model, protocol proof, evidence availability, GitHub, and contact paths. The
Resources page includes stable anchors so footer proof links land on specific
evidence sections.

Focused security assessment result: no direct frontend XSS/injection sink was
found in the website source scan. `npm audit --omit=dev` reports zero production
dependency vulnerabilities after pinning the PostCSS override. Static export
build succeeds. Added static security headers in `public/_headers` for hosts
that honor that file. Deployment risk remains if the final host ignores
`_headers`; the same CSP and hardening headers should then be configured at the
CDN/platform layer.

OSCIRIS protocol hardening result: the evidence packer now stages sanitized
archives, redacts credential-like values in text evidence, writes a redaction
manifest, and fails closed if common secret markers remain. The Rust CLI now
supports provider signing seeds via a private seed file path, reducing shell
history and process-list exposure from base64 seed arguments. Rust formatting
and workspace tests pass.

Verification passed:
- `npm audit --omit=dev`
- `npm run build`
- frontend static sink scan for `dangerouslySetInnerHTML`, `eval`, `new Function`,
  `innerHTML`, public env leakage, and unsafe external blank targets
- `cargo fmt --check`
- `cargo test --workspace`

Residual risks:
- `public/_headers` is not universal; GitHub Pages may ignore it, while
  Cloudflare Pages/Netlify-style hosts honor it. If the production host ignores
  it, configure equivalent headers in the CDN.
- The focused security assessment was not a full exhaustive six-worker Codex
  Security scan because the scan preflight could not confirm the requested
  worker capacity. Treat this as a focused delegated assessment, not a complete
  security audit.
- Some historical/private OSCIRIS raw artifacts and internal planning docs may
  still contain local paths or infrastructure identifiers. Keep public evidence
  exports limited to sanitized docs and generated review packages.

Latest website evidence update: refreshed the public site with current OSCIRIS
training and inference evidence, including bounded AWS QLoRA adaptation,
AWS L40S inference telemetry, and AWS Bedrock managed-inference baselines.
Homepage now includes a stronger commercial potential section, latest Qwen3-Coder
480B and 30B 100-case Bedrock inference metrics, and a Filecoin evidence
availability roadmap section. Whitepaper overview now includes an AWS evidence
status section and introduces Filecoin as a candidate encrypted,
content-addressed evidence persistence layer while keeping Horizen responsible
for receipt coordination, escrow, challenges, and provider accountability.

Verification passed:
- `npm run build`
- local Browser checks at `http://localhost:4173/`, `/whitepaper/`, and
  `/resources/` with no horizontal overflow at desktop and 390px mobile width
- GitHub Pages deployment run `27648265269` completed successfully
- live `curl` checks on `https://oscirislabs.com/`,
  `https://oscirislabs.com/whitepaper/`, and
  `https://oscirislabs.com/resources/` confirmed the new evidence and Filecoin
  copy is deployed

Claim boundary: Filecoin is presented as a storage/evidence availability
roadmap layer, not as completed OSCIRIS integration. AWS inference and training
metrics are presented as bounded benchmark/procurement evidence, not as broad
production or decentralized-market guarantees.

Git repo setup target: treat the three related folders as three independent repos, not as worktrees of one parent repo. Current state before changes: `OSCIRISLABS` already had a `.git` directory; `OSCIRIS` and `ConsultApp` had no git metadata. The correct implementation is therefore to leave `OSCIRISLABS` unchanged and initialize `OSCIRIS` plus `ConsultApp` as standalone repos with `main` as the initial branch, then verify the resulting branch/status state in each folder.

Git repo setup result: `git init -b main` was applied to `/Users/meshachishaya/CascadeProjects/windsurf-project/OSCIRIS` and `/Users/meshachishaya/CascadeProjects/windsurf-project/ConsultApp`. Verification after initialization:
- `OSCIRISLABS`: existing repo on `main`, tracking `origin/main`
- `OSCIRIS`: new independent repo on `main`, no commits yet
- `ConsultApp`: new independent repo on `main`, no commits yet

Follow-up note: `ConsultApp` has no root `.gitignore`, so `.DS_Store` is currently untracked at the repo root. That is not a setup failure, but it should be cleaned before the first commit.

Built a static OSCIRIS landing page in `index.html` and `styles.css`. The theme adapts the Global Threat Map reference with a black intelligence-console canvas, mono operational labels, hairline panel borders, live-status accents, and a map/radar hero visual. The design references sampled from `awesome-design-md` were `x.ai`, `linear.app`, `spacex`, and `sentry`; the final direction uses the restrained black technical systems from x.ai/Linear, the mission tone from SpaceX, and the operational panel density from the reference threat map.

Verification: rendered locally with Playwright at 1440x1000 and 390x900. Both viewports reported matching `scrollWidth` and `clientWidth`, with no detected horizontal overflow. Screenshots were written to `/tmp/osciris-desktop.png` and `/tmp/osciris-mobile.png`.

Project context from the OSCIRIS folder: OSCIRIS means `Orchestrated Secure Compute Infrastructure for Resilient Intelligent Sovereignty`. It is a Python local validation lab for the Data Shadow Protocol, covering keyed Data Shadow transforms, utility/privacy benchmarks, tensor compression, reconstruction and membership inference checks, scoped DP model-release experiments, shard/collusion simulation, Merkle manifests, and production-proof simulation. Current local proof status is not commercial-ready: 2 local passes, 2 local simulation passes, and 3 external-infrastructure blockers.

Updated the landing page after the app-name correction so `OSCIRIS` is the product name and the copy reflects the actual project. Re-verified with Playwright at 1440x1000 and 390x900. Both viewports reported no horizontal overflow; screenshots were written to `/tmp/osciris-desktop-v2.png` and `/tmp/osciris-mobile-v2.png`.

New direction requested: replace the landing look. The redesign should center OSCIRIS as a secure compute validation lab rather than a global threat-map product. Keep the dark technical tone, but make the hero visual about the proof pipeline: raw data, guarded transform, DP model release, attack suite, manifest, and production gates.

Correction: this should be a public landing website, not an internal product dashboard. Add standard public pages/resources, including Whitepaper and About.

Implementation update requested: replace the static site with a premium React/Next.js landing site at the repo root, using App Router, TypeScript, static export support, shared components, and a project-local hero image asset.

Implemented as a Next.js App Router project with TypeScript. Replaced the static HTML pages with `/`, `/whitepaper`, `/about`, and `/resources` routes; added shared React components for header, footer, buttons, page heroes, and feature cards; copied the generated secure-compute hero image into `public/osciris-secure-compute.png`; configured static export in `next.config.mjs`; and added `.gitignore` for generated Next/npm artifacts.

Verification passed:
- `npm run build`
- In-app Browser opened `http://localhost:4173/`; production static export is served by `npm run start`, hero image loaded, and nav/mail links were present.
- Playwright checked `/`, `/whitepaper/`, `/about/`, and `/resources/` at 1440x1000 and 390x900 with no horizontal overflow.
- Screenshots written to `/tmp/osciris-next-desktop.png` and `/tmp/osciris-next-mobile.png`.

Known audit note: `npm audit --omit=dev` reports two moderate PostCSS advisories through Next.js. The only npm-suggested fix is `npm audit fix --force`, which would install a breaking/downgrade path, so it was not applied.

New correction: OSCIRIS should be positioned as a commercially viable protocol. Privacy remains the primary selling point, and enterprise model-training efficiency should be framed through cost-to-quality validation until AWS GPU evidence is complete. The generated secure-compute image should also be used as the hero section background, not only as a foreground media card.

Completed the commercial positioning pass. The homepage now leads with `Private, efficient model training for enterprise`, uses the secure-compute image as the hero background layer, and frames OSCIRIS as a commercial DSP layer with privacy-first training, lower infrastructure waste, and auditable privacy evidence. Supporting pages were updated to use commercial DSP/protocol language and enterprise proof/economics framing. Verification passed with `npm run build`, Browser reload at `http://localhost:4173/`, and Playwright route checks at 1440x1000 and 390x900 with no horizontal overflow. Updated screenshots are `/tmp/osciris-commercial-desktop.png` and `/tmp/osciris-commercial-mobile.png`.

Refined the Horizen/ZEN positioning to avoid framing ZEN primarily as settlement. The current language emphasizes Horizen smart contracts for verification coordination, proof receipts, policy checkpoints, escrow, provider accountability, and decentralized economics. Removed the bordered foreground hero card entirely so the generated image functions only as the hero background. Verification passed with `npm run build`, Browser reload at `http://localhost:4173/`, and Playwright route checks at 1440x900 and 390x900 with no horizontal overflow. Updated screenshots are `/tmp/osciris-no-card-desktop.png` and `/tmp/osciris-no-card-mobile.png`.

Latest public-copy correction: removed ZK-specific wording that could imply implemented circuits/proofs, replaced stronger proof-system language with verification layer, proof receipts, proof-aware contracts, and validation gates, and kept training economics framed as cost-to-quality validation pending AWS GPU benchmark evidence.

Final background correction: moved the secure-compute visual from a contained hero treatment into a fixed homepage background layer, with gradient and grid overlays behind the full landing experience. The hero now has clean copy and CTAs over the atmospheric image without a bordered media panel. Verification passed with `npm run build` and Playwright route checks at 1440x900 and 390x900 with no horizontal overflow. Updated screenshots are `/tmp/osciris-full-landing-bg-desktop.png` and `/tmp/osciris-full-landing-bg-mobile.png`.

Publish plan: add a GitHub Pages workflow that builds the Next.js static export from `main`, includes `public/CNAME` for `oscirislabs.com`, and deploys the `out/` artifact. Keep the cloned `awesome-design-md/` inspiration repository out of the website commit. GitHub Pages has been enabled for workflow deployments and configured with the `oscirislabs.com` custom domain; HTTPS enforcement is pending certificate availability.

Deployment result: pushed commit `d7ca048` to `main`; GitHub Actions run `26700940151` completed successfully with both build and deploy jobs passing. The Pages artifact serves the new OSCIRIS HTML when `oscirislabs.com` is resolved directly to GitHub Pages. The public DNS path is still blocked outside the repository: `http://oscirislabs.com` redirects to `http://www.oscirislabs.com/`, but `www.oscirislabs.com` has no DNS record, and `https://oscirislabs.com` returns Cloudflare `522`. DNS currently resolves through Cloudflare nameservers (`theo.ns.cloudflare.com`, `venus.ns.cloudflare.com`) and Cloudflare proxy IPs, so the remaining fix must be made in Cloudflare/Namecheap DNS or forwarding settings.

New request: locate the latest OSCIRIS/OscirisLabs whitepaper in the `ConsultingApp` workspace and attach it to the website landing page.

Whitepaper lookup result: the local workspace is named `ConsultApp`; no OSCIRIS/OscirisLabs whitepaper file or content reference was found there. The newest actual OSCIRIS whitepaper found locally is `/Users/meshachishaya/CascadeProjects/windsurf-project/OSCIRIS/docs/osciris_whitepaper.pdf`, created/modified on June 1, 2026 at 00:10:56 WAT. Copied it into the site as `public/osciris-protocol-whitepaper.pdf` and linked the landing-page hero CTA directly to the PDF.

Local verification: `npm run build` passed. The static export includes `out/osciris-protocol-whitepaper.pdf`; checksum matches the source PDF. Local HTTP checks on `http://localhost:4173/` show the homepage, Whitepaper page, and Resources page all link to `/osciris-protocol-whitepaper.pdf`. Browser-level checks at 1440x900 and 390x900 found no horizontal overflow and confirmed the PDF URL returns `200` with `application/pdf`.

Deployment verification: pushed commit `dfee258` to `main`; GitHub Actions run `26727874935` completed successfully with build and deploy jobs passing. The GitHub Pages artifact serves `/osciris-protocol-whitepaper.pdf` with `200` and `application/pdf`. The live domain `https://oscirislabs.com` now contains the `Download whitepaper` CTA and `https://oscirislabs.com/osciris-protocol-whitepaper.pdf` returns `200` with `application/pdf`.

Footer update: changed the footer contact email to `info@oscirislabs.com` and added `Copyright 2026 OSCIRIS Labs. All rights reserved.`

AWS benchmark sprint preflight result: the local `osciris-benchmark` AWS profile authenticates in `us-east-1`, and local `uv run osciris doctor` is healthy. The planned GPU worker cannot launch because EC2 Service Quota `L-DB2E81BA` (`Running On-Demand G and VT instances`) is `0.0`, so even one `g5.xlarge` is blocked. Per the sprint plan, stopped before provisioning or switching hardware. Cleanup checks found no `Project=OSCIRISBenchmark` EC2 instances or volumes.

Quota escalation update: requested `48` vCPUs for EC2 quota `L-DB2E81BA`; AWS returned request status `PENDING`. Current AWS Pricing API rates for `us-east-1` are `$5.672/hr` for Linux `g5.12xlarge` and `$0.08925/hr` for Linux `c7i.large`.

Smaller quota request update: AWS still reports the `48` vCPU request as `CASE_OPENED`, so a new `4` vCPU request fails with `ResourceAlreadyExistsException` because only one open request is allowed per quota. AWS Support case access is unavailable on the account without Premium Support, so the open request must be closed/updated from the AWS console or allowed to resolve before retrying `4`.

AWS sprint resumed after user reported G/VT quota approval at `8` vCPUs in North Virginia. This supports the original controlled topology (`1x g5.xlarge` GPU worker = 4 G/VT vCPUs, plus `2x c7i.large` CPU nodes outside the G/VT quota). It does not support `g5.12xlarge` or larger GPU proofs. Proceed with the 3-node evidence sprint only after identity, budget, quota, SSM, S3, AMI, and cleanup guardrails pass.

AWS evidence sprint result: completed run `osciris-aws-proof-20260603-1059` in `us-east-1b` with `1x g5.xlarge` NVIDIA A10G GPU worker and `2x c7i.large` CPU verifier/readiness nodes. All three nodes passed `pytest` and `osciris doctor`; GPU node reported `torch_cuda_available=True` on NVIDIA A10G. Benchmark commands returned status `0`: `production-proof`, `matrix --quick`, `seed-sweep`, and `dp-model-sweep`. Final private evidence bundle uploaded to S3 with SHA256 `93a100a82e658fa9954c348b1a1aa9b154d9a79937328ac7f60fc5dd0508032c`. Cleanup verified zero active tagged EC2 instances, zero tagged EBS volumes, and zero tagged Elastic IPs; temporary security group and IAM instance role/profile were deleted. Evidence bucket retained with 7-day lifecycle expiration.

White-theme update: added the provided OSCIRIS logo as `public/osciris-logo.png`, cropped it to a readable wordmark, replaced the header/footer text mark, converted the site tokens and surfaces from dark to white, and aligned contact CTAs to `info@oscirislabs.com`. Verification passed with `npm run build`; Playwright checked `/`, `/whitepaper/`, `/about/`, and `/resources/` at 1440x900 and 390x900 with logo loading, white body background, all mail links using `info@oscirislabs.com`, and no horizontal overflow. Screenshots: `/tmp/osciris-light-desktop-v2.png` and `/tmp/osciris-light-mobile-v2.png`.

Typography correction: reduced heavy display weights and oversized headings, switched primary/secondary CTAs to pill-shaped OSCIRIS cyan treatments, softened card shadows/radius, and reduced grid density to better match the lighter spacing reference from Obscura. Verification passed with `npm run build`; desktop hero renders at `60px` / `520` weight, mobile at `34.32px` / `520` weight, CTA radius is `999px`, cards are `8px`, and no horizontal overflow was detected. Screenshots: `/tmp/osciris-obscura-spacing-desktop.png` and `/tmp/osciris-obscura-spacing-mobile.png`.

Latest whitepaper update: replaced `public/osciris-protocol-whitepaper.pdf` with `/Users/meshachishaya/CascadeProjects/windsurf-project/OSCIRIS/docs/osciris_whitepaper.pdf`. Source, public, and exported checksums match: `5214807cf8d9d62c5598fd6a4febf690f1a1e3d3dd56e7955676ea6bbde56279`. Local verification passed with `npm run build`; `/`, `/whitepaper/`, and `/resources/` link to `/osciris-protocol-whitepaper.pdf`, and the local PDF URL returns `200` with `Content-Type: application/pdf`.

Brand asset refresh: imported the official `Osciris.zip` package into `public/brand/osciris/`, switched the site header/footer to the official wide blue SVG wordmark, and added the official blue `O` mark as `app/icon.svg`.

Mobile-view correction: replaced the collapsing header row with a dedicated mobile menu control and panel, reduced small-screen header/hero spacing, and strengthened the mobile homepage overlay so the background image stays atmospheric without hurting text contrast.

Verification passed with `npm run build`, Browser reload of `http://localhost:4173/` for the updated desktop render, and a Playwright WebKit iPhone 12 screenshot at `/tmp/osciris-mobile-20260603.png` confirming the small-screen layout and stacked CTAs.
