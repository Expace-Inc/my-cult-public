import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Email confirmed — MyCult",
  description: "Your email is verified. Open the MyCult app to sign in.",
  alternates: { canonical: "/auth/confirm" },
};

export default function ConfirmLayout({ children }: { children: ReactNode }) {
  return children;
}
