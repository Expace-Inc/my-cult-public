"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthShell } from "@/components/auth-shell";
import { createClient } from "@/lib/supabase/client";

function nextPathFromType(type: string | null) {
  if (type === "recovery") return "/auth/reset-password";
  if (type === "signup" || type === "invite" || type === "magiclink" || type === "email") {
    return "/auth/confirm";
  }
  return "/auth/confirm";
}

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState("Signing you in…");

  useEffect(() => {
    let cancelled = false;

    async function run() {
      const supabase = createClient();
      if (!supabase) {
        router.replace("/auth/error?reason=config");
        return;
      }

      const url = new URL(window.location.href);
      const code = url.searchParams.get("code");
      const queryType = url.searchParams.get("type");
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const hashType = hash.get("type");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (accessToken && refreshToken) {
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;
        } else {
          throw new Error("missing_params");
        }

        window.history.replaceState(null, "", "/auth/callback");

        const type = queryType || hashType;
        if (cancelled) return;
        router.replace(type === "recovery" ? "/auth/reset-password" : nextPathFromType(type));
      } catch {
        if (cancelled) return;
        setStatus("We couldn’t finish signing you in.");
        router.replace("/auth/error?reason=exchange");
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, [router]);

  return (
    <AuthShell title="Signing you in…">
      <p className="text-sm text-forest/65">{status}</p>
    </AuthShell>
  );
}
