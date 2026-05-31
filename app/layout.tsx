import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OSCIRIS | Private enterprise model training",
    template: "%s | OSCIRIS",
  },
  description:
    "OSCIRIS is a commercially viable Data Shadow Protocol for privacy-preserving, cost-efficient enterprise model training and resilient intelligent sovereignty.",
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
