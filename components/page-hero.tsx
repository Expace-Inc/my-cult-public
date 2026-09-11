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
    <section className={cn("px-5 py-16 sm:py-20", invert ? "bg-forest text-white" : "bg-canvas")}>
      <div className="mx-auto max-w-3xl">
        <h1
          className={cn(
            "text-4xl font-bold tracking-tight sm:text-5xl",
            invert ? "text-white" : "text-forest",
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mt-5 max-w-2xl text-lg leading-relaxed",
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
