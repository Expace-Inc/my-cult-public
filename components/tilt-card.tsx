"use client";

import { useCallback, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  maxTilt?: number;
  href?: string;
};

export function TiltCard({
  children,
  className,
  innerClassName,
  maxTilt = 10,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [tilting, setTilting] = useState(false);

  const reset = useCallback(() => {
    setTilting(false);
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
    setGlare({ x: 50, y: 50 });
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - y) * maxTilt * 2;

      setTilting(true);
      setGlare({ x: x * 100, y: y * 100 });
      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
      );
    },
    [maxTilt],
  );

  return (
    <div
      ref={ref}
      className={cn("tilt-ready [transform-style:preserve-3d]", className)}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      style={{
        transform,
        transition: tilting
          ? "transform 160ms var(--ease-out-brand)"
          : "transform 280ms var(--ease-out-brand)",
      }}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl [transform-style:preserve-3d]",
          innerClassName,
        )}
      >
        {children}
        <span
          className="glare"
          style={{
            background: `radial-gradient(420px circle at ${glare.x}% ${glare.y}%, rgb(255 255 255 / 28%), transparent 46%)`,
          }}
        />
      </div>
    </div>
  );
}
