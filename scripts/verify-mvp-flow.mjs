const baseUrl = (process.env.OSCIRIS_BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const accessCode = process.env.OSCIRIS_PILOT_ACCESS_CODE || "pilot";

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

  const session = await request("/api/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ accessCode }),
  });
  assert(session.response.ok, `Session creation failed with ${session.response.status}`);
  assert(typeof session.json?.token === "string", "Session token missing");
  const token = session.json.token;
  logStep("session", "authenticated");

  const jobsBefore = await request("/api/jobs", {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert(
    jobsBefore.response.ok || jobsBefore.response.status === 503,
    `Unexpected jobs status ${jobsBefore.response.status}`
  );

  if (jobsBefore.response.status === 503) {
    logStep("jobs", "storage unavailable");
    console.log(JSON.stringify(jobsBefore.json ?? { error: jobsBefore.text }, null, 2));
    process.exit(2);
  }

  assert(Array.isArray(jobsBefore.json?.jobs), "Jobs list missing");
  logStep("jobs-before", `${jobsBefore.json.jobs.length} records`);

  const payload = {
    organization: "OSCIRIS Smoke Check",
    workload: `Verification run ${new Date().toISOString()}`,
    dataPolicy: "DSP prepared artifacts only",
    jurisdiction: "Nigeria / controlled cloud region",
    model: "Qwen 7B policy QA baseline",
  };

  const created = await request("/api/jobs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  assert(created.response.status === 201, `Job creation failed with ${created.response.status}`);
  assert(typeof created.json?.job?.id === "string", "Created job missing id");
  const jobId = created.json.job.id;
  logStep("job-created", jobId);

  const jobsAfter = await request("/api/jobs", {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert(jobsAfter.response.ok, `Jobs-after failed with ${jobsAfter.response.status}`);
  assert(Array.isArray(jobsAfter.json?.jobs), "Jobs-after list missing");
  assert(jobsAfter.json.jobs[0]?.id === jobId, "Newest job is not first in recent-jobs list");
  logStep("jobs-after", `${jobsAfter.json.jobs.length} records`);

  const receipt = await request(`/api/jobs/${jobId}/receipt`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert(receipt.response.ok, `Receipt check failed with ${receipt.response.status}`);
  assert(receipt.json?.receipt?.jobId === jobId, "Receipt payload does not match job");
  logStep("receipt", "ok");

  const verifier = await request(`/api/jobs/${jobId}/verifier`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert(verifier.response.ok, `Verifier check failed with ${verifier.response.status}`);
  assert(typeof verifier.json?.verifierResult?.decision === "string", "Verifier decision missing");
  logStep("verifier", verifier.json.verifierResult.decision);

  const protocol = await request(`/api/jobs/${jobId}/protocol`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  assert(protocol.response.ok, `Protocol check failed with ${protocol.response.status}`);
  assert(typeof protocol.json?.protocolStatus?.horizenAnchor === "string", "Protocol status missing");
  logStep("protocol", protocol.json.protocolStatus.horizenAnchor);

  logStep("result", "mvp flow verified");
}

main().catch((error) => {
  console.error(`[verify:mvp] failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
