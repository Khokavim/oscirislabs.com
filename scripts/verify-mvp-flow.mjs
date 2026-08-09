const baseUrl = (process.env.OSCIRIS_BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");

async function request(path) {
  const response = await fetch(`${baseUrl}${path}`, { redirect: "manual" });
  const text = await response.text();
  let json = null;

  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  return { response, text, json };
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

  const feed = await request("/proof-feed.json");
  assert(feed.response.ok, `public proof status failed with ${feed.response.status}`);
  assert(feed.json && typeof feed.json === "object", "public proof status is not JSON");
  assert(Object.keys(feed.json).sort().join(",") === "proofs,status", "unexpected public proof fields");
  assert(Array.isArray(feed.json.proofs), "public proofs must be an array");
  assert(feed.json.proofs.length === 1, "public proof count changed");
  assert(
    Object.keys(feed.json.proofs[0]).sort().join(",") === "commitmentHash,status",
    "unexpected public commitment fields"
  );

  console.log("[verify:mvp] public IP containment verified");
}

main().catch((error) => {
  console.error(`[verify:mvp] failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
