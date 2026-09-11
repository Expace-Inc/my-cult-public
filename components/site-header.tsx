"use client";

import Link from "next/link";
import { useState } from "react";
import { buttonClass } from "@/components/button";
import { Wordmark } from "@/components/wordmark";
import { cn } from "@/lib/cn";
import { nav } from "@/lib/site";

export function SiteHeader({ invert = false }: { invert?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md",
        invert
          ? "border-white/10 bg-forest/80 text-white"
          : "border-mist/70 bg-canvas/85 text-forest",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Wordmark invert={invert} />
        <nav className="hidden items-center gap-7 text-[13px] font-medium md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors duration-200",
                invert ? "text-white/80 hover:text-white" : "text-forest/75 hover:text-forest",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/download"
            className={invert ? buttonClass("ghost", "py-2") : buttonClass("outline", "py-2")}
          >
            Get the app
          </Link>
        </nav>
        <button
          type="button"
          className={cn(
            "grid h-10 w-10 place-items-center rounded-lg md:hidden",
            invert ? "text-white" : "text-forest",
          )}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="flex w-4 flex-col gap-1.5">
            <span className={cn("h-px w-full", invert ? "bg-white" : "bg-forest")} />
            <span className={cn("h-px w-full", invert ? "bg-white" : "bg-forest")} />
          </span>
        </button>
      </div>
      {open ? (
        <div className="border-t border-current/10 px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-[15px] font-medium">
            {nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Link href="/download" className={buttonClass("ember")} onClick={() => setOpen(false)}>
              Get the app
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
