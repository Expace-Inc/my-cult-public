import Link from "next/link";
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
      className={cn(
        "inline-flex items-center gap-2 font-semibold tracking-tight",
        invert ? "text-white" : "text-forest",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "grid h-7 w-7 place-items-center rounded-md text-[13px] font-bold",
          invert ? "bg-ember text-white" : "bg-forest text-white",
        )}
      >
        M
      </span>
      <span>MyCult</span>
    </Link>
  );
}
