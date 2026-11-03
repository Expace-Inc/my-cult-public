import { BrandMark } from "@/components/brand-mark";
import { cn } from "@/lib/cn";

export function PageHero({
  title,
  lead,
  children,
  invert = false,
}: {
  title: string;
  lead: string;
  children?: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <section className={cn("relative overflow-hidden px-5 py-20 sm:py-28", invert ? "bg-forest text-white" : "bg-canvas")}>
      <BrandMark
        className="pointer-events-none absolute -right-16 -top-10 hidden w-80 rotate-12 opacity-[0.08] md:block"
        color={invert ? "var(--color-mist)" : "var(--color-forest)"}
      />
      <div className="relative mx-auto max-w-4xl">
        <h1
          className={cn(
            "font-display text-5xl leading-[0.92] sm:text-7xl",
            invert ? "pop-shadow" : "pop-shadow-soft",
            invert ? "text-white" : "text-forest",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-6 max-w-2xl text-xl font-medium leading-relaxed",
            invert ? "text-white/75" : "text-forest/75",
          )}
        >
          {lead}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
