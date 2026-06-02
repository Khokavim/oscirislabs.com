# Task Plan

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
- [x] Refine Horizen/ZEN language around ZK/privacy proof smart contracts
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
- [x] Add OSCIRIS logo asset to the website
- [x] Convert public website from dark theme to white theme
- [x] Verify light-theme render on desktop and mobile
- [x] Refine homepage typography and spacing toward lighter Obscura-style proportions
- [x] Replace public whitepaper with latest OSCIRIS source PDF
- [x] Verify latest whitepaper PDF link locally before publishing

## Review

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

New correction: OSCIRIS should be positioned as a commercially viable protocol. Privacy remains the primary selling point, but cheap and efficient enterprise model training should be elevated as a core value. The generated secure-compute image should also be used as the hero section background, not only as a foreground media card.

Completed the commercial positioning pass. The homepage now leads with `Private, efficient model training for enterprise`, uses the secure-compute image as the hero background layer, and frames OSCIRIS as a commercial DSP layer with privacy-first training, lower infrastructure waste, and auditable privacy evidence. Supporting pages were updated to use commercial DSP/protocol language and enterprise proof/economics framing. Verification passed with `npm run build`, Browser reload at `http://localhost:4173/`, and Playwright route checks at 1440x1000 and 390x900 with no horizontal overflow. Updated screenshots are `/tmp/osciris-commercial-desktop.png` and `/tmp/osciris-commercial-mobile.png`.

Refined the Horizen/ZEN positioning to avoid framing ZEN primarily as settlement. The current language emphasizes Horizen smart contracts for ZK/privacy proof coordination, verification checkpoints, policy enforcement, provider accountability, and proof-aware decentralized economics. Removed the bordered foreground hero card entirely so the generated image functions only as the hero background. Verification passed with `npm run build`, Browser reload at `http://localhost:4173/`, and Playwright route checks at 1440x900 and 390x900 with no horizontal overflow. Updated screenshots are `/tmp/osciris-no-card-desktop.png` and `/tmp/osciris-no-card-mobile.png`.

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

White-theme update: added the provided OSCIRIS logo as `public/osciris-logo.png`, cropped it to a readable wordmark, replaced the header/footer text mark, converted the site tokens and surfaces from dark to white, and aligned contact CTAs to `info@oscirislabs.com`. Verification passed with `npm run build`; Playwright checked `/`, `/whitepaper/`, `/about/`, and `/resources/` at 1440x900 and 390x900 with logo loading, white body background, all mail links using `info@oscirislabs.com`, and no horizontal overflow. Screenshots: `/tmp/osciris-light-desktop-v2.png` and `/tmp/osciris-light-mobile-v2.png`.

Typography correction: reduced heavy display weights and oversized headings, switched primary/secondary CTAs to pill-shaped OSCIRIS cyan treatments, softened card shadows/radius, and reduced grid density to better match the lighter spacing reference from Obscura. Verification passed with `npm run build`; desktop hero renders at `60px` / `520` weight, mobile at `34.32px` / `520` weight, CTA radius is `999px`, cards are `8px`, and no horizontal overflow was detected. Screenshots: `/tmp/osciris-obscura-spacing-desktop.png` and `/tmp/osciris-obscura-spacing-mobile.png`.

Latest whitepaper update: replaced `public/osciris-protocol-whitepaper.pdf` with `/Users/meshachishaya/CascadeProjects/windsurf-project/OSCIRIS/docs/osciris_whitepaper.pdf`. Source, public, and exported checksums match: `5214807cf8d9d62c5598fd6a4febf690f1a1e3d3dd56e7955676ea6bbde56279`. Local verification passed with `npm run build`; `/`, `/whitepaper/`, and `/resources/` link to `/osciris-protocol-whitepaper.pdf`, and the local PDF URL returns `200` with `Content-Type: application/pdf`.
