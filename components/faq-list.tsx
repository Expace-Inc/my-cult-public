"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export function FaqList({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y-2 divide-forest/10 rounded-2xl bg-paper shadow-[6px_6px_0_var(--color-forest)] ring-2 ring-forest">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={expanded}
              onClick={() => setOpen(expanded ? null : index)}
            >
              <span className="text-lg font-extrabold tracking-tight sm:text-xl">{item.question}</span>
              <span
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ember text-xl font-black text-white transition-transform duration-200",
                  expanded && "rotate-45",
                )}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-200 ease-out",
                expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div className="px-6 pb-6 text-lg font-medium leading-relaxed text-forest/75">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
