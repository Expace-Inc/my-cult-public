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
        <div className="rounded-2xl bg-paper p-6 shadow-[0_16px_40px_rgb(20_54_48_/_8%)] ring-1 ring-mist sm:p-8">
          <h1 className="text-[1.75rem] font-semibold tracking-tight">{title}</h1>
          {body ? <p className="mt-3 text-base leading-relaxed text-forest/75">{body}</p> : null}
          <div className="mt-6">{children}</div>
        </div>
        <p className="mt-6 text-center text-sm text-forest/55">
          Need help?{" "}
          <a className="font-medium text-forest hover:text-ember" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </p>
      </div>
    </div>
  );
}
