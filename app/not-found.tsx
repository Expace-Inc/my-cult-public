import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/button";

export const metadata: Metadata = {
  title: "Page not found — MyCult",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50svh] max-w-xl flex-col justify-center px-5 py-20">
      <p className="font-display text-5xl text-ember">MyCult</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight">This page isn’t here</h1>
      <p className="mt-4 text-lg text-forest/70">
        The link may be out of date. Head home or get the app.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className={buttonClass("ember")}>
          Back home
        </Link>
        <Link href="/download" className={buttonClass("outline")}>
          Get the app
        </Link>
      </div>
    </div>
  );
}
