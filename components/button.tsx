import { cn } from "@/lib/cn";

const variants = {
  ember:
    "bg-ember text-white shadow-[4px_4px_0_rgb(8_24_21_/_85%)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_rgb(8_24_21_/_85%)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_rgb(8_24_21_/_85%)]",
  forest:
    "bg-forest text-white shadow-[4px_4px_0_var(--color-ember)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_var(--color-ember)]",
  ghost:
    "bg-transparent text-white ring-2 ring-white/40 hover:bg-white/10 hover:ring-white",
  quiet:
    "bg-transparent text-forest hover:text-ember underline-offset-4 hover:underline",
  outline:
    "bg-paper text-forest ring-2 ring-forest hover:bg-forest hover:text-white",
} as const;

export function buttonClass(
  variant: keyof typeof variants = "ember",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-[15px] font-extrabold uppercase tracking-[0.04em] transition-[color,background-color,box-shadow,translate] duration-200 ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember",
    variants[variant],
    className,
  );
}
