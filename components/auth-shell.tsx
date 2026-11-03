import type { ReactNode } from "react";
import { site } from "@/lib/site";

export function AuthShell({
  children,
  title,
  body,
}: {
  children: ReactNode;
  title: string;
  body?: string;
}) {
  return (
    <div className="flex min-h-[calc(100svh-8rem)] items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-paper p-6 shadow-[6px_6px_0_var(--color-forest)] ring-2 ring-forest sm:p-8">
          <h1 className="font-display text-3xl leading-[0.95] sm:text-4xl">{title}</h1>
          {body ? <p className="mt-4 text-lg font-medium leading-relaxed text-forest/75">{body}</p> : null}
          <div className="mt-6">{children}</div>
        </div>
        <p className="mt-6 text-center text-base font-medium text-forest/60">
          Need help?{" "}
          <a className="font-bold text-forest hover:text-ember" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </div>
    </div>
  );
}
