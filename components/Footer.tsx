import Link from "next/link";

const businessLinks = [
  { href: "/about", label: "About OSCIRIS" },
  { href: "/#platform", label: "Platform" },
  { href: "/#solutions", label: "Solutions" },
  { href: "mailto:info@oscirislabs.com", label: "Private review" },
];

const technicalLinks = [
  { href: "/app", label: "Public proof status" },
  { href: "mailto:info@oscirislabs.com?subject=OSCIRIS%20technical%20review", label: "Private technical review" },
  { href: "mailto:info@oscirislabs.com?subject=OSCIRIS%20NDA%20review", label: "Confidential review access" },
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
          <span>Review access</span>
          <p>Detailed mechanisms and validation materials are available to qualified reviewers under confidentiality.</p>
        </div>
      </div>

      <div className="footer-bottomline">
        <p>Copyright 2026 OSCIRIS Labs. All rights reserved.</p>
        <p>Controlled AI workloads, verified compute, audit-ready delivery.</p>
      </div>
    </footer>
  );
}
