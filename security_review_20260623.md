# OSCIRISLABS Focused Security Review - 2026-06-23

## Scope

Reviewed the public static website and directly linked proof-material changes:

- `app/`
- `components/`
- `public/`
- `next.config.mjs`
- `package.json`
- `package-lock.json`
- OSCIRIS proof docs and evidence-packaging script touched by the site update

This was a focused delegated review, not a full exhaustive Codex Security repository-wide scan. Preflight could not confirm the six-worker exhaustive-scan runtime cap, so the result is reported as a focused security assessment.

## Findings and Resolution

### 1. PostCSS advisory through Next.js

- Severity: moderate advisory, low practical exploitability for this static site
- Status: fixed
- Change: added npm override for `postcss@8.5.10`
- Verification: `npm audit --omit=dev` reports `0 vulnerabilities`

### 2. Missing deploy-layer security headers

- Severity: low hardening gap
- Status: mitigated in repo for compatible static hosts
- Change: added `public/_headers` with CSP, `nosniff`, referrer policy, and permissions policy
- Boundary: GitHub Pages may ignore `_headers`; Cloudflare Pages/Netlify-style hosts honor it. If the site remains on GitHub Pages behind Cloudflare, equivalent headers should be configured at Cloudflare.

### 3. Evidence bundle could publish raw command metadata secrets

- Severity: high if raw evidence archives are published
- Status: fixed for `tools/full_settlement_proof.py pack`
- Change: final packing now copies evidence through a sanitized staging directory, redacts credential-like values in text artifacts, writes `redaction_manifest.json`, and fails closed if sensitive markers remain after redaction.
- Verification: fake `signing_key_seed_base64` and `Authorization: Bearer ...` values are redacted before archive creation.

### 4. Public docs taught passing signing seeds as CLI arguments

- Severity: medium
- Status: fixed
- Change: `osciris-node network create-provider-capability` now supports `--signing-key-seed-file`; public benchmark docs use seed-file input and state that seed files must not be copied into evidence archives.

### 5. Public proof docs exposed local artifact paths

- Severity: low
- Status: fixed for current public proof docs
- Change: latest evidence brief/index and Horizen next-step doc use reviewer package IDs and hashes instead of local `/tmp/...` paths.

## No Direct Website Source Findings

No exploitable XSS, unsafe external-link behavior, injection sink, public secret exposure, dynamic script loading, `dangerouslySetInnerHTML`, or user-controlled URL rendering was found in the reviewed website source.

## Residual Risks

- Historical internal planning docs and raw JSON cleanup artifacts may still contain local/cloud identifiers. Treat them as private run artifacts unless redacted into reviewer packages.
- Static security headers must be enforced by the deployment layer if the host ignores `public/_headers`.
- The CSP allows inline scripts/styles because the current Next static export emits framework inline assets. A stricter CSP requires nonce/hash-based deployment support or a framework build strategy that avoids inline code.
