import { cn } from "@/lib/cn";

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-16 sm:py-20", className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  body,
  invert = false,
}: {
  title: string;
  body?: string;
  invert?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight sm:text-[2rem]",
          invert ? "text-white" : "text-forest",
        )}
      >
        {title}
      </h2>
      {body ? (
        <p className={cn("mt-4 text-lg leading-relaxed", invert ? "text-white/75" : "text-forest/75")}>
          {body}
        </p>
      ) : null}
    </div>
  );
}
