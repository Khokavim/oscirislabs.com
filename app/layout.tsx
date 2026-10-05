import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-brand", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://oscirislabs.com"),
  title: {
    default: "OSCIRIS | AI compute, connected",
    template: "%s | OSCIRIS",
  },
  description:
    "OSCIRIS splits open AI models into shards that everyday Macs and NVIDIA PCs can host, and runs them as one model. The Kimi 48B GPU closed beta is taking applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
