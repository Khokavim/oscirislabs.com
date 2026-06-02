import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-logo-link" href="/" aria-label="OSCIRIS home">
          <img src="/osciris-logo.png" alt="" className="footer-logo" />
        </Link>
        <p>oscirislabs.com</p>
        <p>Copyright 2026 OSCIRIS Labs. All rights reserved.</p>
      </div>
      <a href="mailto:info@oscirislabs.com">info@oscirislabs.com</a>
    </footer>
  );
}
