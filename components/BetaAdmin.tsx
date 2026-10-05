"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { PLATFORMS, STATUSES, TOTAL_SHARDS, type ApplicationStatus } from "@/lib/beta";

type Application = {
  id: string; reference: string; createdAt: string; updatedAt: string;
  name: string; email: string; whatsapp: string; country: string;
  platform: string; device: string; memoryGb: number | null; os: string; hours: string; source: string;
  eligibility: { status: string; hostableShards: number };
  status: ApplicationStatus; note: string;
};

const API = "/api/beta/admin/applications/";
const platformLabel = (value: string) => PLATFORMS.find((p) => p.value === value)?.label ?? value;
const fitLabel = (a: Application) =>
  a.eligibility.status === "eligible" ? `${a.eligibility.hostableShards === TOTAL_SHARDS ? "All 27" : `${a.eligibility.hostableShards} of 27`}`
    : a.eligibility.status === "coming_soon" ? "Coming soon" : a.eligibility.status === "below_minimum" ? "Below minimum" : "Unknown";

export function BetaAdmin() {
  const [state, setState] = useState<"loading" | "signed_out" | "ready">("loading");
  const [apps, setApps] = useState<Application[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({ status: "all", fit: "all", query: "" });
  const [saving, setSaving] = useState<string | null>(null);

  const load = useCallback(async () => {
    const response = await fetch(API, { cache: "no-store" });
    if (response.status === 401) { setState("signed_out"); return; }
    const data = await response.json().catch(() => ({}));
    if (!response.ok || !data.ok) { setError(data.error || "Applications could not be loaded."); setState("ready"); return; }
    setApps(data.applications); setError(""); setState("ready");
  }, []);

  useEffect(() => { void load(); }, [load]);

  async function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const token = String(new FormData(event.currentTarget).get("token") || "");
    const response = await fetch("/api/beta/admin/session/", {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ token }),
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) { setError(data.error || "Sign-in failed."); return; }
    setError(""); setState("loading"); await load();
  }

  async function signOut() {
    await fetch("/api/beta/admin/session/", { method: "DELETE" });
    setApps([]); setState("signed_out");
  }

  async function save(a: Application, status: ApplicationStatus, note: string) {
    setSaving(a.id);
    const response = await fetch(API, {
      method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id: a.id, status, note }),
    });
    const data = await response.json().catch(() => ({}));
    setSaving(null);
    if (response.status === 401) { setState("signed_out"); return; }
    if (!response.ok || !data.ok) { setError(data.error || "The change was not saved."); return; }
    setApps((list) => list.map((item) => (item.id === a.id ? data.application : item)));
  }

  const counts = useMemo(() => {
    const byStatus = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<string, number>;
    let eligible = 0, mac = 0, nvidia = 0;
    for (const a of apps) {
      byStatus[a.status] += 1;
      if (a.eligibility.status === "eligible") eligible += 1;
      if (a.platform === "mac_apple_silicon") mac += 1;
      if (a.platform === "ubuntu_nvidia") nvidia += 1;
    }
    return { byStatus, eligible, mac, nvidia };
  }, [apps]);

  const shown = useMemo(() => apps.filter((a) => {
    if (filter.status !== "all" && a.status !== filter.status) return false;
    if (filter.fit !== "all" && a.eligibility.status !== filter.fit) return false;
    const q = filter.query.trim().toLowerCase();
    return !q || [a.name, a.email, a.reference, a.device, a.country, a.whatsapp].some((v) => v.toLowerCase().includes(q));
  }), [apps, filter]);

  if (state === "loading") return <p className="admin-note">Loading applications…</p>;

  if (state === "signed_out") {
    return (
      <section className="admin-signin">
        <img src="/brand/osciris/wide-blue.svg" alt="OSCIRIS" width={150} height={36} />
        <h1>Beta applications</h1>
        <p>Enter the admin token from the server. It is stored in <code>.data/beta/admin-token</code> in the site folder.</p>
        <form onSubmit={signIn}>
          <label htmlFor="token">Admin token<input id="token" name="token" type="password" autoComplete="current-password" required /></label>
          <button className="button primary" type="submit">Sign in</button>
        </form>
        {error ? <p className="beta-failure" role="alert">{error}</p> : null}
      </section>
    );
  }

  return (
    <section className="admin-board">
      <header className="admin-head">
        <div><p className="landing-label">OSCIRIS · KIMI GPU CLOSED BETA</p><h1>Beta applications</h1></div>
        <div className="admin-actions">
          <a className="button secondary" href={`${API}?format=csv`}>Export CSV</a>
          <button className="button secondary" type="button" onClick={() => void load()}>Refresh</button>
          <button className="button secondary" type="button" onClick={() => void signOut()}>Sign out</button>
        </div>
      </header>

      <dl className="admin-counts">
        <div><dt>Applications</dt><dd>{apps.length}</dd></div>
        <div><dt>Can host a shard</dt><dd>{counts.eligible}</dd></div>
        <div><dt>Apple Silicon</dt><dd>{counts.mac}</dd></div>
        <div><dt>Ubuntu NVIDIA</dt><dd>{counts.nvidia}</dd></div>
        {STATUSES.map((s) => (<div key={s}><dt>{s[0].toUpperCase() + s.slice(1)}</dt><dd>{counts.byStatus[s]}</dd></div>))}
      </dl>

      <div className="admin-filters">
        <label htmlFor="f-status">Status
          <select id="f-status" value={filter.status} onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
            <option value="all">All</option>{STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        <label htmlFor="f-fit">Fit
          <select id="f-fit" value={filter.fit} onChange={(e) => setFilter({ ...filter, fit: e.target.value })}>
            <option value="all">All</option><option value="eligible">Can host a shard</option>
            <option value="coming_soon">Coming soon</option><option value="below_minimum">Below minimum</option>
          </select>
        </label>
        <label htmlFor="f-query">Search<input id="f-query" type="search" placeholder="Name, email, reference, GPU" value={filter.query} onChange={(e) => setFilter({ ...filter, query: e.target.value })} /></label>
      </div>

      {error ? <p className="beta-failure" role="alert">{error}</p> : null}
      {apps.length === 0 ? (
        <p className="admin-note">No applications yet. They appear here as soon as someone applies on /beta/.</p>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Applied</th><th>Person</th><th>Machine</th><th>Fit</th><th>Status and note</th></tr></thead>
            <tbody>
              {shown.map((a) => (
                <AdminRow key={a.id} a={a} saving={saving === a.id} onSave={save} />
              ))}
            </tbody>
          </table>
          {shown.length === 0 ? <p className="admin-note">No applications match these filters.</p> : null}
        </div>
      )}
    </section>
  );
}

function AdminRow({ a, saving, onSave }: { a: Application; saving: boolean; onSave: (a: Application, s: ApplicationStatus, n: string) => void }) {
  const [status, setStatus] = useState<ApplicationStatus>(a.status);
  const [note, setNote] = useState(a.note);
  const dirty = status !== a.status || note !== a.note;
  return (
    <tr>
      <td className="num"><strong>{a.reference}</strong><br />{new Date(a.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}</td>
      <td><strong>{a.name}</strong><br /><span className="admin-sub">{a.email}</span>{a.whatsapp ? <><br /><span className="admin-sub">{a.whatsapp}</span></> : null}{a.country ? <><br /><span className="admin-sub">{a.country}</span></> : null}</td>
      <td>{platformLabel(a.platform)}<br /><span className="admin-sub">{a.device}{a.memoryGb != null ? ` · ${a.memoryGb} GB` : ""}{a.os ? ` · ${a.os}` : ""}</span>{a.hours ? <><br /><span className="admin-sub">{a.hours}</span></> : null}</td>
      <td><span className={`admin-fit admin-fit-${a.eligibility.status}`}>{fitLabel(a)}</span></td>
      <td className="admin-edit">
        <select aria-label={`Status for ${a.reference}`} value={status} onChange={(e) => setStatus(e.target.value as ApplicationStatus)}>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <input aria-label={`Note for ${a.reference}`} value={note} maxLength={500} placeholder="Note" onChange={(e) => setNote(e.target.value)} />
        <button className="button primary" type="button" disabled={!dirty || saving} onClick={() => onSave(a, status, note)}>{saving ? "Saving…" : "Save"}</button>
      </td>
    </tr>
  );
}
