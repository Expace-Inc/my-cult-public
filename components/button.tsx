import { cn } from "@/lib/cn";

const variants = {
  ember:
    "bg-ember text-white shadow-[0_10px_24px_rgb(255_79_32_/_22%)] hover:bg-[color:var(--color-ember-pressed)]",
  forest: "bg-forest text-white hover:bg-[color:var(--color-forest-88)]",
  ghost:
    "bg-transparent text-white/90 ring-1 ring-white/25 hover:bg-white/8 hover:text-white",
  quiet:
    "bg-transparent text-forest hover:text-ember underline-offset-4 hover:underline",
  outline:
    "bg-paper text-forest ring-1 ring-mist hover:ring-forest/30 hover:bg-canvas",
} as const;

export function buttonClass(
  variant: keyof typeof variants = "ember",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[13px] font-semibold tracking-[0.02em] transition-colors duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember",
    variants[variant],
    className,
  );
}
