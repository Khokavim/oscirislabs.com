// Kimi Linear 48B GPU closed beta: which machines can join and how many shards
// they can host. Shared by the sign-up form (instant feedback) and the server
// (recorded with each application). The figures mirror the measured shard-fit
// table in the OSCIRIS worker (crates/osciris-node/src/kimi_shard_fit.rs).

export const TOTAL_SHARDS = 27;
const GIB = 1024 ** 3;
/** Unified memory kept for macOS before a shard is compared. */
export const MAC_HEADROOM_GIB = 8;
/** VRAM kept for the Windows desktop on a card that also drives a display. */
export const WINDOWS_HEADROOM_GIB = 1;

export type Platform =
  | "mac_apple_silicon"
  | "ubuntu_nvidia"
  | "windows"
  | "windows_other"
  | "mac_intel"
  | "linux_other"
  | "other";

export const PLATFORMS: ReadonlyArray<{ value: Platform; label: string; memoryLabel: string | null }> = [
  { value: "mac_apple_silicon", label: "Mac with Apple Silicon (M1–M4)", memoryLabel: "Unified memory (GB)" },
  { value: "ubuntu_nvidia", label: "Ubuntu PC with an NVIDIA GPU", memoryLabel: "GPU memory, VRAM (GB)" },
  { value: "windows", label: "Windows PC with an NVIDIA GPU", memoryLabel: "GPU memory, VRAM (GB)" },
  { value: "windows_other", label: "Windows PC with an AMD or Intel GPU", memoryLabel: "GPU memory (GB)" },
  { value: "mac_intel", label: "Mac with an Intel chip", memoryLabel: "Memory (GB)" },
  { value: "linux_other", label: "Other Linux (ARM, AMD or Intel GPU)", memoryLabel: "GPU memory (GB)" },
  { value: "other", label: "Something else", memoryLabel: null },
];

// [layers in class, required bytes on Metal, on CUDA Ubuntu, on CUDA Windows (A10G, WDDM)]
const CLASSES: ReadonlyArray<[number, number, number, number]> = [
  [1, 4_750_707_942, 3_863_373_415, 3_924_505_396], // first stage
  [19, 8_270_521_320, 6_963_802_932, 6_831_158_068], // KDA
  [6, 12_374_978_583, 11_946_636_084, 11_998_540_596], // token-scaled
  [1, 13_224_266_847, 12_758_653_338, 12_736_738_100], // terminal
];

export type Eligibility = {
  status: "eligible" | "below_minimum" | "coming_soon" | "unknown";
  hostableShards: number;
  backend: "metal" | "cuda" | null;
  /** Windows runs the test kit now; joining the pool from Windows comes later. */
  joinsLater: boolean;
};

export function eligibility(platform: Platform | "", memoryGb: number | null): Eligibility {
  if (platform === "mac_apple_silicon" || platform === "ubuntu_nvidia" || platform === "windows") {
    const backend = platform === "mac_apple_silicon" ? "metal" : "cuda";
    const joinsLater = platform === "windows";
    if (memoryGb == null || !Number.isFinite(memoryGb) || memoryGb <= 0) {
      return { status: "unknown", hostableShards: 0, backend, joinsLater };
    }
    const headroom = platform === "mac_apple_silicon" ? MAC_HEADROOM_GIB : platform === "windows" ? WINDOWS_HEADROOM_GIB : 0;
    const usable = Math.max(0, memoryGb - headroom) * GIB;
    const column = platform === "mac_apple_silicon" ? 1 : platform === "windows" ? 3 : 2;
    const hostableShards = CLASSES.reduce((sum, entry) => sum + (usable >= entry[column] ? entry[0] : 0), 0);
    return { status: hostableShards > 0 ? "eligible" : "below_minimum", hostableShards, backend, joinsLater };
  }
  if (platform === "") return { status: "unknown", hostableShards: 0, backend: null, joinsLater: false };
  return { status: "coming_soon", hostableShards: 0, backend: null, joinsLater: false };
}

export function eligibilityText(e: Eligibility): string {
  switch (e.status) {
    case "eligible":
      if (e.joinsLater) {
        return e.hostableShards === TOTAL_SHARDS
          ? "Your machine can run the test kit now. Joining from Windows comes later; then it can host any of the 27 shards."
          : `Your machine can run the test kit now. Joining from Windows comes later; then it can host ${e.hostableShards} of the 27 shards.`;
      }
      return e.hostableShards === TOTAL_SHARDS
        ? "Your machine can host any of the 27 shards."
        : `Your machine can host ${e.hostableShards} of the 27 shards.`;
    case "below_minimum":
      return "This machine has less memory than the smallest shard needs. You can still apply for later rounds.";
    case "coming_soon":
      return "This platform is coming soon. Apply now and we will contact you when it opens.";
    default:
      return "Choose your machine and enter its memory to see what it can host.";
  }
}

export const STATUSES = ["new", "shortlisted", "invited", "joined", "declined"] as const;
export type ApplicationStatus = (typeof STATUSES)[number];

export const HOURS = ["Under 10 hours a week", "10–40 hours a week", "Most of the day", "Always on"] as const;

export const CONSENT_VERSION = "2026-10-05";
export const CONSENT_TEXT =
  "OSCIRIS Labs stores these details on its own server to run the closed beta and to contact you about it. We do not sell or share them. Ask us to delete them at any time.";

export type SignupInput = {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  platform: Platform;
  device: string;
  memoryGb: number | null;
  os: string;
  hours: string;
  source: string;
  consent: boolean;
};

const LIMITS = { name: 80, email: 120, whatsapp: 32, country: 56, device: 80, os: 48, hours: 40, source: 120 };
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,24}$/;

/** Validate untrusted input. Returns cleaned data or a list of field errors. */
export function validateSignup(raw: unknown): { ok: true; value: SignupInput } | { ok: false; errors: Record<string, string> } {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const text = (key: keyof typeof LIMITS) =>
    typeof r[key] === "string" ? (r[key] as string).replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, LIMITS[key]) : "";
  const errors: Record<string, string> = {};
  const name = text("name");
  const email = text("email").toLowerCase();
  const whatsapp = text("whatsapp");
  const platform = PLATFORMS.some((p) => p.value === r.platform) ? (r.platform as Platform) : null;
  const device = text("device");
  const memoryRaw = typeof r.memoryGb === "number" ? r.memoryGb : typeof r.memoryGb === "string" && r.memoryGb.trim() ? Number(r.memoryGb) : null;
  const memoryGb = memoryRaw == null ? null : Number.isFinite(memoryRaw) && memoryRaw > 0 && memoryRaw <= 1024 ? Math.round(memoryRaw * 10) / 10 : NaN;

  if (!name) errors.name = "Enter your name.";
  if (!EMAIL.test(email)) errors.email = "Enter an email address we can reach you at.";
  if (whatsapp && !/^\+?[0-9 ()-]{7,24}$/.test(whatsapp)) errors.whatsapp = "Use digits, with the country code, for example +234 801 234 5678.";
  if (!platform) errors.platform = "Choose your machine.";
  if (!device) errors.device = "Enter your Mac model or GPU model.";
  if (platform && platform !== "other" && memoryGb == null) errors.memoryGb = "Enter the memory in GB.";
  if (Number.isNaN(memoryGb)) errors.memoryGb = "Enter a number of GB between 1 and 1024.";
  if (r.consent !== true) errors.consent = "Agree to how we use your details to apply.";
  if (Object.keys(errors).length || !platform) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name, email, whatsapp, country: text("country"), platform, device,
      memoryGb: memoryGb as number | null, os: text("os"),
      hours: HOURS.includes(text("hours") as (typeof HOURS)[number]) ? text("hours") : "",
      source: text("source"), consent: true,
    },
  };
}
