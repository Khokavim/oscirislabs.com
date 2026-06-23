import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OSCIRIS | Sovereign AI Infrastructure",
    template: "%s | OSCIRIS",
  },
  description:
    "OSCIRIS provides Sovereign AI Infrastructure-as-a-Service: privacy-preserving AI compute with verified execution, jurisdiction-aware routing, audit receipts, stable billing, and economically accountable providers.",
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
