import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand-mark" href="/" aria-label="OSCIRIS home">
          OS
        </Link>
        <p>oscirislabs.com</p>
      </div>
      <a href="mailto:hello@oscirislabs.com">hello@oscirislabs.com</a>
    </footer>
  );
}
