import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signing you in — MyCult",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
