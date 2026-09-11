import type { Metadata } from "next";
import Link from "next/link";
import { AuthShell } from "@/components/auth-shell";
import { buttonClass } from "@/components/button";
import { OpenAppButton } from "@/components/open-app-button";
import { joinAppHref } from "@/lib/deep-link";

export const metadata: Metadata = {
  title: "Join on MyCult",
  description: "You’re joining a loyalty programme. Open MyCult to continue.",
  alternates: { canonical: "/join" },
  robots: { index: false, follow: false },
};

export default async function JoinPage({ searchParams }: PageProps<"/join">) {
  const params = await searchParams;
  const vendorId = typeof params.v === "string" ? params.v : "";

  if (!vendorId) {
    return (
      <AuthShell
        title="Join this programme on MyCult"
        body="This join link is incomplete. Ask the business for a new QR or link."
      >
        <Link href="/support" className={buttonClass("outline")}>
          Back to support
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Join this programme on MyCult"
      body="You’re one step from joining this business’s loyalty programme. Open the MyCult app to continue."
    >
      <div className="flex flex-col gap-3">
        <OpenAppButton href={joinAppHref(vendorId)} />
        <Link href="/download" className={buttonClass("quiet")}>
          Don’t have the app? Download
        </Link>
      </div>
    </AuthShell>
  );
}
