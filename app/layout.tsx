import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OSCIRIS | Secure AI compute",
    template: "%s | OSCIRIS",
  },
  description:
    "OSCIRIS is a secure AI compute protocol for privacy-preserving training and inference with DSP controls, verifier-backed execution, Horizen coordination, and Filecoin evidence availability.",
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
