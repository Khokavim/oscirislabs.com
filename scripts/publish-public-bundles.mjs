import { mkdir, readFile, rm, writeFile, cp, mkdtemp } from "node:fs/promises";
import { readFileSync } from "node:fs";
import os from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const oscirisRoot = process.env.OSCIRIS_ROOT?.trim() || join(root, "..", "OSCIRIS");
const protocolRoot = process.env.OSCIRIS_PROTOCOL_ROOT?.trim() || join(oscirisRoot, "protocol-rs");
const publicDir = join(root, "public");
const tempRoot = await mkdtemp(join(os.tmpdir(), "osciris-publish-"));
const demoOutput = join(tempRoot, "contributor-flow.json");
const participantPublishDir = join(tempRoot, "participant-public");

await rm(participantPublishDir, { recursive: true, force: true });
await mkdir(participantPublishDir, { recursive: true });

runCommand(
  "cargo",
  [
    "run",
    "-p",
    "osciris-cli",
    "--",
    "demo",
    "contributor-flow",
    "--work-root",
    tempRoot,
    "--repo-root",
    tempRoot,
    "--keep-artifacts",
    "--output",
    demoOutput,
  ],
  protocolRoot,
);

const demoSummary = JSON.parse(await readFile(demoOutput, "utf8"));
const participantStatusPath = demoSummary?.settlement?.files?.participant_status;
if (!participantStatusPath) {
  throw new Error("Contributor flow did not return a participant status path");
}

runCommand(
  "python3",
  [
    "-c",
    [
      "import json, sys",
      "from pathlib import Path",
      "sys.path.insert(0, sys.argv[3])",
      "from osciris.participant_status import load_participant_status, write_public_participant_status_artifacts",
      "input_path = Path(sys.argv[1])",
      "output_dir = Path(sys.argv[2])",
      "snapshot = load_participant_status(input_path)",
      "artifacts = write_public_participant_status_artifacts(snapshot, output_dir=output_dir, source_path=input_path)",
      "print(json.dumps({name: str(path) for name, path in artifacts.items()}, indent=2))",
    ].join("; "),
    participantStatusPath,
    participantPublishDir,
    join(oscirisRoot, "src"),
  ],
  oscirisRoot,
  {
    PYTHONPATH: [join(oscirisRoot, "src"), process.env.PYTHONPATH].filter(Boolean).join(":"),
  },
);

await mkdir(publicDir, { recursive: true });
await cp(join(participantPublishDir, "participant-status-summary.json"), join(publicDir, "participant-status-summary.json"));
await cp(join(participantPublishDir, "participant-status.html"), join(publicDir, "participant-status.html"));
await cp(join(participantPublishDir, "proof-feed.json"), join(publicDir, "proof-feed.json"));

const contributorManifest = demoSummary?.contributor_manifest;
if (!contributorManifest) {
  throw new Error("Contributor flow did not return a contributor manifest");
}

const identityBundle = contributorManifest.identities || contributorManifest.identity;
if (!identityBundle) {
  throw new Error("Contributor manifest did not include an identity bundle");
}

const publishedContributorManifest = {
  generated_at: new Date().toISOString(),
  source_path: null,
  install: contributorManifest.install,
  workflow: [
    {
      name: "install",
      detail: contributorManifest.install,
    },
    ...((contributorManifest.workflow || []).map((step) => normalizeWorkflowStep(step))),
  ],
  identities: {
    enterprise: {
      ...identityBundle.enterprise,
      identity_json: "/contributor-manifest.json#enterprise",
    },
    provider: {
      ...identityBundle.provider,
      identity_json: "/contributor-manifest.json#provider",
    },
    verifier: {
      ...identityBundle.verifier,
      identity_json: "/contributor-manifest.json#verifier",
    },
  },
  public_proofs: [
    {
      label: "Participant snapshot JSON",
      url: "/participant-status-summary.json",
      detail: "Read-only reviewed participant bundle.",
    },
    {
      label: "Participant snapshot HTML",
      url: "/participant-status.html",
      detail: "Human-readable mirror of the same bundle.",
    },
    {
      label: "Proof feed JSON",
      url: "/api/proof-feed",
      detail: "Hash-led proof feed derived from reviewed snapshots.",
    },
    {
      label: "Contributor manifest JSON",
      url: "/api/contributor-manifest",
      detail: "Published GPU peer flow manifest.",
    },
  ],
  note: "Read-only bundle. No raw payloads, no mutable protocol state, and no hidden operational controls.",
};

await writeFile(
  join(publicDir, "contributor-manifest.json"),
  `${JSON.stringify(publishedContributorManifest, null, 2)}\n`,
  "utf8",
);

const betaReleaseManifest = buildBetaReleaseManifest(oscirisRoot);
await writeFile(
  join(publicDir, "beta-release-manifest.json"),
  `${JSON.stringify(betaReleaseManifest, null, 2)}\n`,
  "utf8",
);

console.log(
  JSON.stringify(
    {
      contributor_manifest: join(publicDir, "contributor-manifest.json"),
      beta_release_manifest: join(publicDir, "beta-release-manifest.json"),
      participant_status: join(publicDir, "participant-status-summary.json"),
      participant_html: join(publicDir, "participant-status.html"),
      proof_feed: join(publicDir, "proof-feed.json"),
    },
    null,
    2,
  ),
);

function runCommand(command, args, cwd, extraEnv = {}) {
  const result = spawnSync(command, args, {
    cwd,
    env: { ...process.env, ...extraEnv },
    stdio: "inherit",
  });

  if (result.status !== 0) {
    const commandLine = [command, ...args].join(" ");
    throw new Error(`${commandLine} failed with exit code ${result.status ?? "unknown"}`);
  }
}

function normalizeWorkflowStep(step) {
  if (typeof step === "string") {
    return {
      name: step,
      detail: workflowDetailFor(step),
    };
  }

  if (step && typeof step === "object") {
    return {
      name: step.name || "step",
      detail: step.detail || workflowDetailFor(step.name || "step"),
    };
  }

  return {
    name: "step",
    detail: workflowDetailFor("step"),
  };
}

function workflowDetailFor(step) {
  switch (step) {
    case "install":
      return "cargo install --path crates/osciris-cli";
    case "create-provider-capability":
      return "Publish provider GPU capability and policy fit.";
    case "create-job-claim":
      return "Create a signed job claim for the assigned provider.";
    case "run-provider":
      return "Run the assigned provider workload and emit evidence.";
    case "create-receipt-availability":
      return "Emit receipt availability after execution completes.";
    case "run-verifier":
      return "Run verifier acceptance or rejection and sign the receipt.";
    case "publish-milestone":
      return "Publish the communal milestone and shared status record.";
    case "participant-status":
      return "Expose the participant snapshot as a read-only public bundle.";
    default:
      return String(step);
  }
}

function buildBetaReleaseManifest(oscirisRoot) {
  const version = readWorkspaceVersion(join(oscirisRoot, "protocol-rs", "Cargo.toml"));
  const repositoryBaseUrl = resolveReleaseRepositoryUrl(join(oscirisRoot, "protocol-rs"));
  const releasePageUrl = `${repositoryBaseUrl}/releases/tag/v${version}`;
  const downloadBaseUrl = `${repositoryBaseUrl}/releases/download/v${version}`;
  const assets = [
    {
      platform: "linux-x86_64",
      filename: `osciris-node-x86_64-unknown-linux-gnu.tar.gz`,
      url: `${downloadBaseUrl}/osciris-node-x86_64-unknown-linux-gnu.tar.gz`,
      sha256: null,
    },
    {
      platform: "macos-aarch64",
      filename: `osciris-node-aarch64-apple-darwin.tar.gz`,
      url: `${downloadBaseUrl}/osciris-node-aarch64-apple-darwin.tar.gz`,
      sha256: null,
    },
  ];

  return {
    channel: "beta",
    latest_version: version,
    published_at: new Date().toISOString(),
    release_page_url: releasePageUrl,
    release_notes:
      "Beta collaboration release for colleague onboarding, published bundle sync, and release checks.",
    assets,
  };
}

function resolveReleaseRepositoryUrl(protocolRoot) {
  const result = spawnSync("git", ["-C", protocolRoot, "remote", "get-url", "origin"], {
    encoding: "utf8",
  });

  if (result.status === 0) {
    const remoteUrl = (result.stdout || "").trim();
    const parsed = parseGitHubRepositoryUrl(remoteUrl);
    if (parsed) {
      return parsed;
    }
  }

  return "https://github.com/OSCIRIS-Labs/protocol-rs";
}

function parseGitHubRepositoryUrl(remoteUrl) {
  if (!remoteUrl) {
    return null;
  }

  const httpsMatch = remoteUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\.git)?$/i);
  if (httpsMatch) {
    return `https://github.com/${httpsMatch[1]}/${httpsMatch[2]}`;
  }

  const sshMatch = remoteUrl.match(/^git@github\.com:([^/]+)\/([^/]+?)(?:\.git)?$/i);
  if (sshMatch) {
    return `https://github.com/${sshMatch[1]}/${sshMatch[2]}`;
  }

  return null;
}

function readWorkspaceVersion(cargoTomlPath) {
  const source = readFileSync(cargoTomlPath, "utf8");
  const lines = source.split(/\r?\n/);
  let inWorkspacePackage = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "[workspace.package]") {
      inWorkspacePackage = true;
      continue;
    }
    if (trimmed.startsWith("[") && trimmed !== "[workspace.package]") {
      inWorkspacePackage = false;
    }
    if (!inWorkspacePackage) {
      continue;
    }
    const match = trimmed.match(/^version\s*=\s*"([^"]+)"$/);
    if (match) {
      return match[1];
    }
  }

  throw new Error(`Unable to find workspace package version in ${cargoTomlPath}`);
}
