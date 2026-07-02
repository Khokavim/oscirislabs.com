# OSCIRIS Website Deployment Routing Fix

Date: 2026-06-23

## Current State

The repository is pushed and the GitHub publication surface is current.

- Repo: `https://github.com/Khokavim/oscirislabs.com.git`
- Branch: `main`
- Latest verified commit: `af3d4d9`
- Workflow: `.github/workflows/deploy.yml`
- GitHub Actions result: success
- Public beta manifest on GitHub: `public/beta-release-manifest.json`
  points to `v0.1.2`

The public domain `https://oscirislabs.com/` is reachable, but response headers
still show that Cloudflare is routing traffic to Railway:

- `server: cloudflare`
- `x-railway-request-id`
- `x-railway-edge`

That means a git push to the GitHub publication workflow is not enough to
update the live custom domain while Cloudflare continues forwarding the apex
domain to Railway.

## Required Fix

Choose one production hosting source and make Cloudflare point to it.

## Option A: Use GitHub Pages as Production

Cloudflare DNS should point the apex domain to GitHub Pages:

```text
A     oscirislabs.com      185.199.108.153
A     oscirislabs.com      185.199.109.153
A     oscirislabs.com      185.199.110.153
A     oscirislabs.com      185.199.111.153
CNAME www                 khokavim.github.io
```

Then in GitHub repository settings:

```text
Pages source: GitHub Actions
Custom domain: oscirislabs.com
Enforce HTTPS: enabled after certificate issuance
```

If Cloudflare proxy is enabled, use full SSL mode and purge cache after the
change. If GitHub Pages custom-domain validation fails, temporarily disable the
orange-cloud proxy until GitHub verifies the domain.

## Option B: Use Railway as Production

Keep Cloudflare pointed at Railway only if Railway is connected to this repo and
branch:

```text
Repository: Khokavim/oscirislabs.com
Branch: main
Build command: npm ci && npm run build
Publish/output directory: out
```

Railway must serve the static export from `out/`. If it is serving an older
artifact, trigger a Railway redeploy from commit `16d8292` or reconnect the
service to the correct GitHub repository.

The repo now includes `railway.json` so a Railway deployment from this repo uses:

```text
Build command: npm ci && npm run build
Start command: npm run start
Runtime output: out
Port binding: Railway $PORT via serve
```

If the live domain still serves the wrong page after this config is deployed,
the remaining issue is external Railway service configuration: root directory,
connected repository, pinned deployment, or custom publish/static root.

## Verification Command

After the fix, this command must return the current positioning text:

```bash
curl -L https://oscirislabs.com/ | rg \
  "Sovereign AI Infrastructure-as-a-Service|Keep sensitive data under institutional control"
```

This header check should no longer show Railway if GitHub Pages is production:

```bash
curl -I https://oscirislabs.com/
```

## Decision

GitHub Releases and the raw GitHub-hosted manifest are the publication
authority for the beta. Railway can remain a runtime mirror only if it is
pointed at the same published build. The custom domain still needs routing
correction if it is expected to mirror the current GitHub release surface.

Required Railway environment variables:

```text
OSCIRIS_PILOT_ACCESS_CODE=<private access code>
OSCIRIS_APP_SECRET=<long random signing secret>
```
