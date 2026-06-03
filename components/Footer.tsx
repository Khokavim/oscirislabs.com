import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand-block">
        <Link className="footer-logo-link" href="/" aria-label="OSCIRIS home">
          <img src="/brand/osciris/wide-blue.svg" alt="OSCIRIS" className="footer-logo" />
        </Link>
        <p>oscirislabs.com</p>
        <p>Copyright 2026 OSCIRIS Labs. All rights reserved.</p>
      </div>
      <a className="footer-email" href="mailto:info@oscirislabs.com">
        info@oscirislabs.com
      </a>
    </footer>
  );
}
