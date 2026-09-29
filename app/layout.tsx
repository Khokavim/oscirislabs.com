import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OSCIRIS | AI compute, connected",
    template: "%s | OSCIRIS",
  },
  description:
    "OSCIRIS is building connected AI compute for individuals and enterprises, with early-access participation and evidence-led pilots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
