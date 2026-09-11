"use client";

import { useState, type FormEvent } from "react";
import { AuthShell } from "@/components/auth-shell";
import { buttonClass } from "@/components/button";
import { createClient } from "@/lib/supabase/client";
import { site } from "@/lib/site";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    const supabase = createClient();
    if (!supabase) {
      setError("We couldn’t send that just now. Email support@my-cult.com.");
      return;
    }

    setSending(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${site.origin}/auth/callback`,
    });
    setSending(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <AuthShell
        title="Check your email"
        body="If an account exists for that email, we’ve sent a link. Check your inbox and spam folder."
      >
        <p className="text-sm text-forest/65">It may take a few minutes to arrive.</p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Forgot password"
      body="Enter the email for your MyCult account. We’ll send a reset link."
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-1.5 text-[13px] font-medium">
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-xl bg-canvas px-3 py-3 text-base font-normal ring-1 ring-mist outline-none focus:ring-2 focus:ring-ember"
          />
        </label>
        {error ? (
          <p className="text-sm text-ember" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className={buttonClass("ember")} disabled={sending}>
          {sending ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </AuthShell>
  );
}
