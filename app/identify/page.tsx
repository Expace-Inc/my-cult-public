import type { Metadata } from "next";
import { AuthShell } from "@/components/auth-shell";
import { OpenAppButton } from "@/components/open-app-button";
import { authAppHref, identifyAppHref } from "@/lib/deep-link";

export const metadata: Metadata = {
  title: "Member QR — MyCult",
  description: "Open MyCult to show your member code to staff.",
  alternates: { canonical: "/identify" },
  robots: { index: false, follow: false },
};

export default async function IdentifyPage({ searchParams }: PageProps<"/identify">) {
  const params = await searchParams;
  const vendorId = typeof params.v === "string" ? params.v : "";
  const token = typeof params.t === "string" ? params.t : "";
  const href = vendorId && token ? identifyAppHref(vendorId, token) : authAppHref();

  return (
    <AuthShell
      title="Member code"
      body="Open MyCult to show your member QR to staff. This page won’t display your code in the browser."
    >
      <OpenAppButton href={href} />
    </AuthShell>
  );
}
