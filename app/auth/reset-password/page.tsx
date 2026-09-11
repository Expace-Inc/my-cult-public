"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { buttonClass } from "@/components/button";
import { OpenAppButton } from "@/components/open-app-button";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [ready, setReady] = useState(false);
  const [expired, setExpired] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    document.title = "Reset password — MyCult";

    async function check() {
      const supabase = createClient();
      if (!supabase) {
        setExpired(true);
        setReady(true);
        return;
      }
      const { data } = await supabase.auth.getSession();
      setExpired(!data.session);
      setReady(true);
    }

    void check();
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const supabase = createClient();
    if (!supabase) {
      setError("This link has expired. Request a new reset link from the app.");
      return;
    }

    setSaving(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    if (updateError) {
      setSaving(false);
      setError(updateError.message);
      return;
    }

    await supabase.auth.signOut();
    setSaving(false);
    setSuccess(true);
  }

  if (!ready) {
    return (
      <AuthShell title="Choose a new password" body="Checking your reset link…">
        <p className="text-sm text-forest/65">One moment.</p>
      </AuthShell>
    );
  }

  if (success) {
    return (
      <AuthShell
        title="Password updated"
        body="Open the MyCult app and sign in with your new password."
      >
        <div className="flex flex-col gap-3">
          <OpenAppButton label="Sign in to the app" />
          <Link href="/download" className={buttonClass("quiet")}>
            Download the app
          </Link>
        </div>
      </AuthShell>
    );
  }

  if (expired) {
    return (
      <AuthShell
        title="This link has expired"
        body="Request a new reset link from the app or the forgot-password page."
      >
        <div className="flex flex-col gap-3">
          <Link href="/auth/forgot-password" className={buttonClass("ember")}>
            Send reset link
          </Link>
          <Link href="/support" className={buttonClass("quiet")}>
            Back to support
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Choose a new password"
      body="Use at least 8 characters. You’ll use this password to sign in to MyCult."
    >
      <form onSubmit={onSubmit} className="grid gap-4">
        <label className="grid gap-1.5 text-[13px] font-medium">
          New password
          <input
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-xl bg-canvas px-3 py-3 text-base font-normal ring-1 ring-mist outline-none focus:ring-2 focus:ring-ember"
          />
        </label>
        <label className="grid gap-1.5 text-[13px] font-medium">
          Confirm password
          <input
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className="rounded-xl bg-canvas px-3 py-3 text-base font-normal ring-1 ring-mist outline-none focus:ring-2 focus:ring-ember"
          />
        </label>
        {error ? (
          <p className="text-sm text-ember" role="alert">
            {error}
          </p>
        ) : null}
        <button type="submit" className={buttonClass("ember")} disabled={saving}>
          {saving ? "Updating…" : "Update password"}
        </button>
      </form>
    </AuthShell>
  );
}
