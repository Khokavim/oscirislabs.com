import Link from "next/link";

const navItems = [
  { href: "/#platform", label: "Platform" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#trust", label: "Trust" },
  { href: "/resources", label: "Resources" },
  { href: "mailto:info@oscirislabs.com", label: "Contact" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="OSCIRIS home">
        <img src="/brand/osciris/wide-blue.svg" alt="OSCIRIS" className="brand-logo" />
      </Link>
      <nav className="nav-links nav-links-desktop" aria-label="Site">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a className="header-action header-action-desktop" href="mailto:info@oscirislabs.com">
        Request private review
      </a>
      <details className="mobile-nav">
        <summary className="mobile-nav-toggle" aria-label="Open navigation menu">
          <span />
          <span />
          <span />
        </summary>
        <div className="mobile-nav-panel">
          <nav className="mobile-nav-links" aria-label="Mobile site">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <a className="mobile-nav-action" href="mailto:info@oscirislabs.com">
            Request private review
          </a>
        </div>
      </details>
    </header>
  );
}
