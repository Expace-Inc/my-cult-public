import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { buttonClass } from "@/components/button";
import { OpenAppButton } from "@/components/open-app-button";

export function VerifiedAccount() {
  return (
    <AuthShell
      title="You’re verified"
      body="Your email is confirmed. Open the MyCult app and sign in to continue."
    >
      <div className="flex flex-col gap-3">
        <OpenAppButton />
        <Link href="/download" className={buttonClass("outline")}>
          Download the app
        </Link>
      </div>
    </AuthShell>
  );
}
