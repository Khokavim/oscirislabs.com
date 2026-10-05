"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { CONSENT_TEXT, HOURS, PLATFORMS, eligibility, eligibilityText, type Platform } from "@/lib/beta";

type Errors = Record<string, string>;
type Done = { reference: string; updated: boolean; message: string };

export function BetaSignupForm() {
  const [platform, setPlatform] = useState<Platform | "">("");
  const [memory, setMemory] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  useEffect(() => { if (done) doneRef.current?.scrollIntoView({ block: "center" }); }, [done]);

  const memoryLabel = PLATFORMS.find((p) => p.value === platform)?.memoryLabel ?? "Memory (GB)";
  const fit = useMemo(() => eligibility(platform, memory ? Number(memory) : null), [platform, memory]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"), email: form.get("email"), whatsapp: form.get("whatsapp"),
      country: form.get("country"), platform: form.get("platform"), device: form.get("device"),
      memoryGb: form.get("memoryGb"), os: form.get("os"), hours: form.get("hours"),
      source: form.get("source"), consent: form.get("consent") === "on", website: form.get("website"),
    };
    setSending(true); setFailure(""); setErrors({});
    try {
      const response = await fetch("/api/beta/apply/", {
        method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(payload),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok) {
        setDone({ reference: data.reference, updated: data.updated, message: data.message });
        return;
      }
      if (data.errors) setErrors(data.errors);
      setFailure(data.error || (data.errors ? "Check the highlighted fields." : "The application did not go through. Try again in a minute."));
    } catch {
      setFailure("We could not reach the server. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (done) {
    return (
      <div className="beta-done" role="status" ref={doneRef} tabIndex={-1}>
        <p className="landing-label">{done.updated ? "APPLICATION UPDATED" : "APPLICATION RECEIVED"}</p>
        <h3>Thank you. Your reference is <span className="beta-ref">{done.reference}</span></h3>
        <p>{done.message}</p>
        <ol className="beta-next">
          <li>We review applications in small rounds and pick machines the beta supports.</li>
          <li>If you are picked, we send an invite with the download for your platform and an install guide.</li>
          <li>Keep your reference. Quote it if you message us.</li>
        </ol>
      </div>
    );
  }

  const field = (id: string) => ({
    id, name: id, "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
  });
  const error = (id: string) => (errors[id] ? <span className="beta-error" id={`${id}-error`}>{errors[id]}</span> : null);

  return (
    <form
      className="beta-form"
      onSubmit={submit}
      noValidate
      onChange={(event) => {
        const name = (event.target as EventTarget & { name?: string }).name;
        if (name && errors[name]) setErrors(({ [name]: _cleared, ...rest }) => rest);
      }}
    >
      <div className="beta-grid">
        <label htmlFor="name">Full name<input {...field("name")} autoComplete="name" required maxLength={80} />{error("name")}</label>
        <label htmlFor="email">Email<input {...field("email")} type="email" autoComplete="email" required maxLength={120} />{error("email")}</label>
        <label htmlFor="whatsapp"><span>WhatsApp number <small>Optional</small></span><input {...field("whatsapp")} type="tel" autoComplete="tel" placeholder="+234 801 234 5678" maxLength={32} />{error("whatsapp")}</label>
        <label htmlFor="country"><span>Country <small>Optional</small></span><input {...field("country")} autoComplete="country-name" maxLength={56} /></label>
      </div>

      <fieldset className="beta-machine">
        <legend>Your machine</legend>
        <div className="beta-grid">
          <label htmlFor="platform">Machine
            <select {...field("platform")} required value={platform} onChange={(e) => setPlatform(e.target.value as Platform | "")}>
              <option value="" disabled>Choose one</option>
              {PLATFORMS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>{error("platform")}
          </label>
          <label htmlFor="device">{platform === "mac_apple_silicon" || platform === "mac_intel" ? "Mac model and chip" : "GPU model"}
            <input {...field("device")} required maxLength={80} placeholder={platform === "mac_apple_silicon" ? "MacBook Pro, M3 Pro" : "RTX 3060"} />{error("device")}
          </label>
          <label htmlFor="memoryGb">{memoryLabel}
            <input {...field("memoryGb")} type="number" inputMode="decimal" min={1} max={1024} step="any" value={memory} onChange={(e) => setMemory(e.target.value)} placeholder={platform === "mac_apple_silicon" ? "16" : "8"} />{error("memoryGb")}
          </label>
          <label htmlFor="os"><span>Operating system version <small>Optional</small></span><input {...field("os")} maxLength={48} placeholder={platform === "mac_apple_silicon" ? "macOS 15" : "Ubuntu 24.04"} /></label>
        </div>
        <p className={`beta-fit beta-fit-${fit.status}`} aria-live="polite">{eligibilityText(fit)}</p>
      </fieldset>

      <div className="beta-grid">
        <label htmlFor="hours"><span>How long could it run? <small>Optional</small></span>
          <select {...field("hours")} defaultValue="">
            <option value="">Not sure yet</option>
            {HOURS.map((h) => <option key={h} value={h}>{h}</option>)}
          </select>
        </label>
        <label htmlFor="source"><span>Where did you hear about us? <small>Optional</small></span><input {...field("source")} maxLength={120} placeholder="WhatsApp group, a friend…" /></label>
      </div>

      <label className="beta-hidden" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>

      <label className="beta-consent" htmlFor="consent">
        <input id="consent" name="consent" type="checkbox" required aria-invalid={errors.consent ? true : undefined} />
        <span>{CONSENT_TEXT}</span>
      </label>
      {error("consent")}

      {failure ? <p className="beta-failure" role="alert">{failure}</p> : null}
      <button className="button primary beta-submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Apply for the beta"}</button>
    </form>
  );
}
