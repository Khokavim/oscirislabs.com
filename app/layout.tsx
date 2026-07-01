import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OSCIRIS | Sovereign AI Infrastructure",
    template: "%s | OSCIRIS",
  },
  description:
    "OSCIRIS provides private AI infrastructure for regulated teams with controlled data exposure, verified compute execution, and audit-ready delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
