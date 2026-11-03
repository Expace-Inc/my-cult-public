"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/cn";
import { BrandMark } from "./brand-mark";
import { TiltCard } from "./tilt-card";

const cards = [
  {
    name: "Your café",
    stamp: "Café",
    points: "240",
    tone: "forest" as const,
  },
  {
    name: "The bakery",
    stamp: "Bakery",
    points: "80",
    tone: "ember" as const,
  },
  {
    name: "Corner shop",
    stamp: "Shop",
    points: "1,200",
    tone: "mist" as const,
  },
];

function Stamp({ label }: { label: string }) {
  const cells = useMemo(
    () => Array.from({ length: 25 }, (_, i) => ((i * 7) % 5) + ((i * 3) % 4) > 3),
    [],
  );

  return (
    <div className="grid grid-cols-5 gap-0.5" aria-hidden>
      {cells.map((on, i) => (
        <span
          key={`${label}-${i}`}
          className={cn("h-1.5 w-1.5 rounded-[1px]", on ? "bg-current" : "bg-current/20")}
        />
      ))}
    </div>
  );
}

function WalletFace({
  name,
  stamp,
  points,
  tone,
}: (typeof cards)[number]) {
  const surface =
    tone === "forest"
      ? "bg-forest text-white"
      : tone === "ember"
        ? "bg-ember text-white"
        : "bg-paper text-forest ring-1 ring-mist";

  return (
    <div className={cn("flex h-52 w-[17.5rem] flex-col justify-between p-5", surface)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-75">
            {stamp}
          </p>
          <p className="mt-1 text-2xl font-black uppercase leading-none tracking-tight">{name}</p>
        </div>
        <Stamp label={stamp} />
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] opacity-75">
            Balance
          </p>
          <p className="tabular text-4xl font-black leading-none">{points}</p>
        </div>
        <BrandMark className="h-7 w-7 opacity-90" />
      </div>
    </div>
  );
}

export function WalletStack({ className }: { className?: string }) {
  const [spread, setSpread] = useState(false);

  return (
    <div
      className={cn("relative mx-auto h-[22rem] w-[19rem] sm:w-[22rem]", className)}
      onPointerEnter={() => setSpread(true)}
      onPointerLeave={() => setSpread(false)}
    >
      {cards.map((card, index) => {
        const offset = spread ? index * 28 - 28 : index * 14 - 10;
        const rotate = spread ? (index - 1) * 8 : (index - 1) * 4;
        const z = 30 - index * 10;

        return (
          <div
            key={card.name}
            className="absolute left-1/2 top-8 -translate-x-1/2"
            style={{
              zIndex: z,
              transform: `translateX(${offset}px) rotate(${rotate}deg)`,
              transition: "transform 280ms var(--ease-out-brand)",
            }}
          >
            <TiltCard
              maxTilt={12}
              innerClassName="shadow-[0_22px_50px_rgb(20_54_48_/_22%)]"
            >
              <WalletFace {...card} />
            </TiltCard>
          </div>
        );
      })}
    </div>
  );
}

export function FeatureCard({
  title,
  body,
  index,
}: {
  title: string;
  body: string;
  index: string;
}) {
  return (
    <TiltCard
      maxTilt={8}
      innerClassName="h-full bg-paper ring-2 ring-forest shadow-[6px_6px_0_var(--color-forest)]"
    >
      <div className="flex h-full flex-col gap-4 p-7">
        <span className="tabular self-start rounded-lg bg-ember px-2.5 py-1 text-sm font-extrabold uppercase tracking-wide text-white">
          {index}
        </span>
        <h3 className="text-2xl font-black uppercase leading-[1.05] tracking-tight sm:text-[1.75rem]">
          {title}
        </h3>
        <p className="text-lg font-medium leading-relaxed text-forest/75">{body}</p>
      </div>
    </TiltCard>
  );
}
