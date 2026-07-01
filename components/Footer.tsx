import Link from "next/link";

const businessLinks = [
  { href: "/about", label: "About OSCIRIS" },
  { href: "/#platform", label: "Platform" },
  { href: "/#solutions", label: "Solutions" },
  { href: "mailto:info@oscirislabs.com", label: "Private review" },
];

const technicalLinks = [
  { href: "/app", label: "Proof Console" },
  { href: "/mvp", label: "Technical validation" },
  { href: "/resources", label: "Resources" },
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/osciris-protocol-whitepaper.pdf", label: "Download PDF" },
  { href: "https://github.com/oscirisprotocol", label: "GitHub" },
];

const artifactLinks = [
  { href: "/beta-release-manifest.json", label: "Beta release manifest" },
  { href: "/proof-feed.json", label: "Proof feed JSON" },
  { href: "/participant-status-summary.json", label: "Participant snapshot JSON" },
  { href: "/participant-status.html", label: "Participant snapshot HTML" },
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
          <p>Private AI infrastructure for regulated teams.</p>
        </div>
        <a className="footer-email" href="mailto:info@oscirislabs.com">
          info@oscirislabs.com
        </a>
      </div>

      <div className="footer-proof-library" aria-label="OSCIRIS proof and business links">
        <div>
          <span>Business</span>
          {businessLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
        <div>
          <span>Technical</span>
          {technicalLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
        <div>
          <span>Public artifacts</span>
          {artifactLinks.map((link) => (
            <FooterLink key={link.href} href={link.href} label={link.label} />
          ))}
        </div>
      </div>

      <div className="footer-bottomline">
        <p>Copyright 2026 OSCIRIS Labs. All rights reserved.</p>
        <p>Controlled AI workloads, verified compute, audit-ready delivery.</p>
      </div>
    </footer>
  );
}
