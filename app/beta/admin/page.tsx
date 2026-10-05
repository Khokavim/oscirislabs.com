import type { Metadata } from "next";
import { BetaAdmin } from "@/components/BetaAdmin";

export const metadata: Metadata = {
  title: "Beta applications",
  robots: { index: false, follow: false },
};

export default function BetaAdminPage() {
  return (
    <main className="admin-main">
      <BetaAdmin />
    </main>
  );
}
