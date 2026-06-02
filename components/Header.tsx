import Link from "next/link";

const navItems = [
  { href: "/whitepaper", label: "Whitepaper" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
];

export function Header() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="OSCIRIS home">
        <img src="/osciris-logo.png" alt="" className="brand-logo" />
      </Link>
      <nav className="nav-links" aria-label="Site">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a className="header-action" href="mailto:info@oscirislabs.com">
        Contact
      </a>
    </header>
  );
}
