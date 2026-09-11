import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset password — MyCult",
  description: "Choose a new password for your MyCult account.",
  alternates: { canonical: "/auth/reset-password" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
