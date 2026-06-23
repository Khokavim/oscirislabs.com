# OSCIRIS Website Deployment Routing Fix

Date: 2026-06-23

## Current State

The repository is pushed and the GitHub Pages workflow deploys successfully.

- Repo: `https://github.com/Khokavim/oscirislabs.com.git`
- Branch: `main`
- Latest verified commit: `16d8292`
- Workflow: `.github/workflows/deploy.yml`
- GitHub Actions result: success

The public domain `https://oscirislabs.com/` is reachable, but response headers
show that Cloudflare is routing traffic to Railway:

- `server: cloudflare`
- `x-railway-request-id`
- `x-railway-edge`

That means a git push to the GitHub Pages workflow is not enough to update the
live domain while Cloudflare continues forwarding the apex domain to Railway.

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

## Verification Command

After the fix, this command must return the current positioning text:

```bash
curl -L https://oscirislabs.com/ | rg \
  "Sovereign AI Infrastructure-as-a-Service|Sovereignty-enabling AI infrastructure"
```

This header check should no longer show Railway if GitHub Pages is production:

```bash
curl -I https://oscirislabs.com/
```

## Decision

For the current static Next.js export, GitHub Pages is the simplest production
path. Railway is only needed if the site later adds server-side APIs,
authentication, database writes, or dynamic job submission.
