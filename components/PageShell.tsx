import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

type PageShellProps = {
  children: ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
