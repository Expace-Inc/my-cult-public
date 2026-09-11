import type { Metadata } from "next";
import { AuthShell } from "@/components/auth-shell";

export const metadata: Metadata = {
  title: "Check your email — MyCult",
  alternates: { canonical: "/auth/reset-requested" },
};

export default function ResetRequestedPage() {
  return (
    <AuthShell
      title="Check your email"
      body="We sent a password reset link. It may take a few minutes to arrive."
    >
      <p className="text-sm text-forest/65">Look in spam if you don’t see it shortly.</p>
    </AuthShell>
  );
}
