import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot password — MyCult",
  description: "Enter your email to receive a MyCult password reset link.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
