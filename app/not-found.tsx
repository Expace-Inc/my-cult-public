import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/button";

export const metadata: Metadata = {
  title: "Page not found — MyCult",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50svh] max-w-xl flex-col justify-center px-5 py-20">
      <p className="pop-shadow-soft font-display text-[7rem] leading-none text-ember sm:text-[9rem]">404</p>
      <h1 className="font-display mt-2 text-4xl leading-[0.95] sm:text-5xl">This page isn’t here</h1>
      <p className="mt-5 text-xl font-medium text-forest/70">
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
