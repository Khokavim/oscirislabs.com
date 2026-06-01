import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand-mark" href="/" aria-label="OSCIRIS home">
          OS
        </Link>
        <p>oscirislabs.com</p>
        <p>Copyright 2026 OSCIRIS Labs. All rights reserved.</p>
      </div>
      <a href="mailto:info@oscirislabs.com">info@oscirislabs.com</a>
    </footer>
  );
}
