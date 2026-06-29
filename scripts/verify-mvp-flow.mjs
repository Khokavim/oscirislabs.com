const baseUrl = (process.env.OSCIRIS_BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
async function request(path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  let json = null;

  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }

  return { response, text, json };
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function logStep(label, detail) {
  console.log(`[verify:mvp] ${label}: ${detail}`);
}

async function main() {
  logStep("base", baseUrl);

  const health = await request("/api/health");
  assert(health.response.ok, `Health check failed with ${health.response.status}`);
  assert(health.json?.ok === true, "Health payload missing ok=true");
  logStep(
    "health",
    `${health.response.status} runtime=${health.json.runtime} store=${health.json.store?.mode ?? "unknown"}`
  );

  const feed = await request("/api/proof-feed");
  assert(feed.response.ok, `Proof feed failed with ${feed.response.status}`);
  assert(Array.isArray(feed.json?.anchors), "Proof feed anchors missing");
  assert(feed.json.anchors.length > 0, "Proof feed is empty");
  assert(typeof feed.json?.source?.lastSyncedAt === "string", "Feed sync time missing");
  logStep(
    "feed",
    `${feed.json.anchors.length} anchors mode=${feed.json.source.mode} source=${feed.json.source.label}`
  );

  const participant = await request("/api/participant-status");
  assert(participant.response.ok, `Participant snapshot failed with ${participant.response.status}`);
  assert(Array.isArray(participant.json?.stages), "Participant snapshot stages missing");
  assert(participant.json.stages.length === 4, "Participant snapshot stage count mismatch");
  assert(
    participant.json.current_state === "settlement_ready",
    "Participant snapshot state mismatch"
  );
  logStep(
    "participant",
    `${participant.json.stages.length} stages state=${participant.json.current_state} job=${participant.json.job_id}`
  );

  const contributor = await request("/api/contributor-manifest");
  assert(contributor.response.ok, `Contributor manifest failed with ${contributor.response.status}`);
  assert(Array.isArray(contributor.json?.workflow), "Contributor workflow missing");
  assert(contributor.json.workflow.length >= 4, "Contributor workflow is incomplete");
  logStep(
    "contributor",
    `${contributor.json.workflow.length} workflow steps install=${contributor.json.install}`
  );

  const betaRelease = await request("/beta-release-manifest.json");
  assert(betaRelease.response.ok, `Beta release manifest failed with ${betaRelease.response.status}`);
  assert(typeof betaRelease.json?.latest_version === "string", "Beta release version missing");
  assert(Array.isArray(betaRelease.json?.assets), "Beta release assets missing");
  logStep(
    "beta-release",
    `version=${betaRelease.json.latest_version} assets=${betaRelease.json.assets.length}`
  );

  const app = await request("/app");
  assert(app.response.ok, `App page failed with ${app.response.status}`);
  assert(app.text.includes("Horizen testnet proof console."), "App headline missing");
  assert(app.text.includes("Recent hash-led proof updates."), "Proof section missing");
  assert(app.text.includes("Proof feed JSON"), "Feed JSON link missing");
  assert(app.text.includes("Participant snapshot"), "Participant snapshot section missing");
  assert(app.text.includes("Submit Job"), "Participant stage flow missing");
  assert(app.text.includes("participant-status-summary.json"), "Published participant summary link missing");
  assert(app.text.includes("Contributor manifest"), "Contributor manifest section missing");
  assert(app.text.includes("contributor-manifest.json"), "Contributor manifest link missing");
  logStep("app", "proof console markers present");

  const snapshotHtml = await request("/participant-status.html");
  assert(snapshotHtml.response.ok, `Participant snapshot HTML failed with ${snapshotHtml.response.status}`);
  assert(snapshotHtml.text.includes("OSCIRIS Participant Status"), "Participant HTML title missing");
  assert(snapshotHtml.text.includes("Submit Job"), "Participant HTML stage flow missing");
  logStep("participant-html", "published snapshot HTML present");

  const home = await request("/");
  assert(home.response.ok, `Homepage failed with ${home.response.status}`);
  assert(home.text.includes("Open proof console"), "Homepage CTA missing");
  logStep("home", "proof console CTA present");

  logStep("result", "mvp flow verified");
}

main().catch((error) => {
  console.error(`[verify:mvp] failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
