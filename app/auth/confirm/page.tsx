"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { VerifiedAccount } from "@/components/verified-account";
import { parseEmailOtpType, verifyEmailToken } from "@/lib/supabase/verify-otp";

export default function AuthConfirmPage() {
  const router = useRouter();
  const [state, setState] = useState<"working" | "verified" | "error">("working");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenHash = params.get("token_hash") ?? params.get("token");
    const type = parseEmailOtpType(params.get("type"));

    if (!tokenHash) {
      router.replace("/auth/error?reason=confirm");
      return;
    }

    let cancelled = false;

    verifyEmailToken(tokenHash, type)
      .then(() => {
        if (cancelled) return;
        window.history.replaceState(null, "", "/auth/confirm");
        if (type === "recovery") {
          router.replace("/auth/reset-password");
          return;
        }
        setState("verified");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const reason =
          error instanceof Error && error.message === "config" ? "config" : "confirm";
        router.replace(`/auth/error?reason=${reason}`);
      });

    return () => {
      cancelled = true;
    };
  }, [router]);

  if (state === "verified") {
    return <VerifiedAccount />;
  }

  return (
    <AuthShell title="Confirming your email…" body="Contacting MyCult to verify this link.">
      <p className="text-sm text-forest/65">This should only take a moment.</p>
    </AuthShell>
  );
}
