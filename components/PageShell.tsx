import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <a className="skip-link" href="#page-content">Skip to content</a>
      <Header />
      <div id="page-content" tabIndex={-1}>{children}</div>
      <Footer />
    </>
  );
}
