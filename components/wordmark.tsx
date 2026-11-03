import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/cn";

export function Wordmark({
  href = "/",
  invert = false,
  className,
}: {
  href?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label="MyCult home"
      className={cn(
        "inline-flex items-center gap-2.5 text-2xl font-black uppercase leading-none tracking-tight",
        invert ? "text-mist" : "text-forest",
        className,
      )}
    >
      <BrandMark className="h-8 w-8 shrink-0" color="var(--color-ember)" />
      <span className="pt-1">
        MyCult<span className="text-ember">.</span>
      </span>
    </Link>
  );
}

/** Large display lockup echoing assets/mycult-logo.png: heavy caps, hard offset shadow. */
export function DisplayWordmark({ className }: { className?: string }) {
  return (
    <p
      className={cn(
        "pop-shadow font-display text-6xl leading-none text-mist sm:text-8xl",
        className,
      )}
    >
      MyCult<span className="text-ember">.</span>
    </p>
  );
}
