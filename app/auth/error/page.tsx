import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { buttonClass } from "@/components/button";

export const metadata: Metadata = {
  title: "Link problem — MyCult",
  description: "This link is invalid or expired. Request a new one or contact support.",
  alternates: { canonical: "/auth/error" },
};

export default function AuthErrorPage() {
  return (
    <AuthShell
      title="We couldn’t open that link"
      body="It may have expired or already been used. Request a new email from the app, or contact support."
    >
      <div className="flex flex-col gap-3">
        <Link href="/support" className={buttonClass("ember")}>
          Back to support
        </Link>
        <Link href="/download" className={buttonClass("quiet")}>
          Get the app
        </Link>
      </div>
    </AuthShell>
  );
}
