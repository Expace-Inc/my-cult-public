import type { Metadata } from "next";
import { VerifiedAccount } from "@/components/verified-account";

export const metadata: Metadata = {
  title: "Email confirmed — MyCult",
  description: "Your email is verified. Open the MyCult app to sign in.",
  alternates: { canonical: "/auth/confirm" },
};

export default function AuthConfirmedPage() {
  return <VerifiedAccount />;
}
