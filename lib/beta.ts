// Kimi Linear 48B GPU closed beta: which machines can join and how many shards
// they can host. Shared by the sign-up form (instant feedback) and the server
// (recorded with each application). The figures mirror the measured shard-fit
// table in the OSCIRIS worker (crates/osciris-node/src/kimi_shard_fit.rs).

export const TOTAL_SHARDS = 27;
/** The first stage (layer 0) is not offered to beta machines yet. */
export const OFFERED_SHARDS = TOTAL_SHARDS - 1;
/** Apple Silicon Macs with at least this much memory join the first round; smaller ones run the test kit first. */
export const MAC_FIRST_ROUND_GIB = 24;
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
  /** When this machine can join the pool: the first round, after its test kit, or later. */
  joining: Joining;
};

/**
 * Apple Silicon Macs with 24 GB or more join the first round. Smaller Macs run
 * the test kit first, and Ubuntu and Windows NVIDIA PCs run the test kit now
 * and join once their runtime packs ship.
 */
export type Joining = "first_round" | "after_test_kit" | "later";

export function eligibility(platform: Platform | "", memoryGb: number | null): Eligibility {
  if (platform === "mac_apple_silicon" || platform === "ubuntu_nvidia" || platform === "windows") {
    const backend = platform === "mac_apple_silicon" ? "metal" : "cuda";
    const joining: Joining =
      platform !== "mac_apple_silicon"
        ? "later"
        : memoryGb != null && memoryGb >= MAC_FIRST_ROUND_GIB
          ? "first_round"
          : "after_test_kit";
    if (memoryGb == null || !Number.isFinite(memoryGb) || memoryGb <= 0) {
      return { status: "unknown", hostableShards: 0, backend, joining };
    }
    const headroom = platform === "mac_apple_silicon" ? MAC_HEADROOM_GIB : platform === "windows" ? WINDOWS_HEADROOM_GIB : 0;
    const usable = Math.max(0, memoryGb - headroom) * GIB;
    const column = platform === "mac_apple_silicon" ? 1 : platform === "windows" ? 3 : 2;
    // The first stage (layer 0) is not offered yet, so it is left out of the count.
    const hostableShards = CLASSES.slice(1).reduce((sum, entry) => sum + (usable >= entry[column] ? entry[0] : 0), 0);
    return { status: hostableShards > 0 ? "eligible" : "below_minimum", hostableShards, backend, joining };
  }
  if (platform === "") return { status: "unknown", hostableShards: 0, backend: null, joining: "later" };
  return { status: "coming_soon", hostableShards: 0, backend: null, joining: "later" };
}

export function eligibilityText(e: Eligibility): string {
  switch (e.status) {
    case "eligible": {
      const fit =
        e.hostableShards === OFFERED_SHARDS
          ? `every shard offered so far (${OFFERED_SHARDS} of ${TOTAL_SHARDS})`
          : `${e.hostableShards} of the ${TOTAL_SHARDS} shards`;
      switch (e.joining) {
        case "first_round":
          return `Your Mac can join the first round and host ${fit}.`;
        case "after_test_kit":
          return `Your Mac can run the test kit now. If it shows the Mac fits, it can host ${fit}.`;
        default:
          return `Your machine can run the test kit now. Joining comes later; then it can host ${fit}. Supported: NVIDIA RTX 20, 30 and 40 series and data-centre GPUs.`;
      }
    }
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
