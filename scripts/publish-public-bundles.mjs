import { readFile } from "node:fs/promises";
import { join } from "node:path";

const feedPath = join(process.cwd(), "public", "proof-feed.json");
const payload = JSON.parse(await readFile(feedPath, "utf8"));

assertExactKeys(payload, ["status", "proofs"], "proof feed");
assertExactKeys(payload.status, ["execution", "receipt", "review"], "status");

if (!Array.isArray(payload.proofs) || payload.proofs.length === 0) {
  throw new Error("proof feed must contain at least one public commitment");
}

for (const [index, proof] of payload.proofs.entries()) {
  assertExactKeys(proof, ["status", "commitmentHash"], `proof ${index}`);
  if (typeof proof.status !== "string") {
    throw new Error(`proof ${index} status must be a string`);
  }
  if (typeof proof.commitmentHash !== "string" || !/^[a-f0-9]{64}$/i.test(proof.commitmentHash)) {
    throw new Error(`proof ${index} commitmentHash must be a 64-character hexadecimal hash`);
  }
}

console.log(`[publish:bundles] sanitized public proof feed verified: ${feedPath}`);

function assertExactKeys(value, allowedKeys, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object`);
  }

  const unexpected = Object.keys(value).filter((key) => !allowedKeys.includes(key));
  if (unexpected.length > 0) {
    throw new Error(`${label} contains disallowed public fields: ${unexpected.join(", ")}`);
  }

  const missing = allowedKeys.filter((key) => !(key in value));
  if (missing.length > 0) {
    throw new Error(`${label} is missing required fields: ${missing.join(", ")}`);
  }
}
