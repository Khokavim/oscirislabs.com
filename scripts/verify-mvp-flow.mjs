const baseUrl = (process.env.OSCIRIS_BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");

const removedPaths = [
  "/osciris-protocol-whitepaper.pdf",
  "/beta-release-manifest.json",
  "/contributor-manifest.json",
  "/participant-status-summary.json",
  "/participant-status.html",
];

const forbiddenPublicMarkers = [
  "cargo install",
  "provider-a",
  "verifier-1",
  "participant-status-summary.json",
  "contributor-manifest.json",
  "gpu>=24gb",
  "llm_lora_economics",
];

async function request(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  return { response, text: await response.text() };
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  const home = await request("/");
  assert(home.response.ok, `homepage failed with ${home.response.status}`);
  assert(home.text.includes("Detailed mechanisms are proprietary"), "commercial DSP wording missing");
  assert(!home.text.includes("Developer beta"), "developer beta remains public");

  const app = await request("/app/");
  assert(app.response.ok, `proof status failed with ${app.response.status}`);
  assert(app.text.includes("Reviewed proof status"), "proof status heading missing");
  assert(app.text.includes("Commitment hash"), "public commitment missing");

  for (const path of ["/whitepaper/", "/resources/", "/mvp/"]) {
    const page = await request(path);
    assert(page.response.ok, `${path} failed with ${page.response.status}`);
    assert(page.text.includes('name="robots" content="noindex'), `${path} is missing noindex metadata`);
  }

  const publicPages = [home.text, app.text];
  for (const marker of forbiddenPublicMarkers) {
    assert(!publicPages.some((page) => page.toLowerCase().includes(marker.toLowerCase())), `public page leaks ${marker}`);
  }

  for (const path of removedPaths) {
    const removed = await request(path);
    assert(removed.response.status === 404, `${path} should return 404, got ${removed.response.status}`);
  }

  console.log("[verify:mvp] public IP containment verified");
}

main().catch((error) => {
  console.error(`[verify:mvp] failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
