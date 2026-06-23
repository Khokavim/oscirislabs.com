import Link from "next/link";

const navItems = [
  { href: "/mvp", label: "MVP" },
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
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
        Contact
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
            Contact
          </a>
        </div>
      </details>
    </header>
  );
}
