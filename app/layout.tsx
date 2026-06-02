import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OSCIRIS | Secure AI compute",
    template: "%s | OSCIRIS",
  },
  description:
    "OSCIRIS is a secure AI compute protocol for privacy-preserving RAG, inference, evaluation, and fine-tuning with DSP controls, verifier-backed execution, and accountable coordination.",
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
