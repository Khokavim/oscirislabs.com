import Link from "next/link";

const proofLinks = [
  { href: "/app", label: "Pilot app" },
  { href: "/participant-status.html", label: "Participant snapshot" },
  { href: "/mvp", label: "MVP flow" },
  { href: "/resources", label: "Proof resources" },
  { href: "/whitepaper", label: "Whitepaper overview" },
  { href: "/osciris-protocol-whitepaper.pdf", label: "Download PDF" },
];

const businessLinks = [
  { href: "/about", label: "About OSCIRIS" },
  { href: "mailto:info@oscirislabs.com", label: "Private review" },
  { href: "https://github.com/oscirisprotocol", label: "GitHub" },
];

const evidenceLinks = [
  { href: "/resources/#privacy-threat-model", label: "Privacy threat model" },
  { href: "/resources/#training-evidence", label: "Training evidence" },
  { href: "/resources/#protocol-proof", label: "Protocol proof" },
  { href: "/resources/#evidence-availability", label: "Evidence availability" },
  { href: "/participant-status-summary.json", label: "Participant snapshot JSON" },
  { href: "/contributor-manifest.json", label: "Contributor manifest JSON" },
];

function FooterLink({ href, label }: { href: string; label: string }) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  if (external) {
    return (
      <a href={href} rel={href.startsWith("http") ? "noreferrer" : undefined}>
        {label}
      </a>
    );
  }
  return <Link href={href}>{label}</Link>;
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-topline">
        <div className="footer-brand-block">
          <Link className="footer-logo-link" href="/" aria-label="OSCIRIS home">
            <img src="/brand/osciris/wide-blue.svg" alt="OSCIRIS" className="footer-logo" />
          </Link>
          <p>Sovereign AI Infrastructure-as-a-Service.</p>
        </div>
        <a className="footer-email" href="mailto:info@oscirislabs.com">
          info@oscirislabs.com
        </a>
      </div>

      <div className="footer-proof-library" aria-label="OSCIRIS proof and business links">
        <div>
          <span>Proof</span>
          {proofLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
        <div>
          <span>Evidence</span>
          {evidenceLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
        <div>
          <span>Business</span>
          {businessLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </div>

      <div className="footer-bottomline">
        <p>Copyright 2026 OSCIRIS Labs. All rights reserved.</p>
        <p>Private, auditable, jurisdiction-aware AI compute.</p>
      </div>
    </footer>
  );
}
