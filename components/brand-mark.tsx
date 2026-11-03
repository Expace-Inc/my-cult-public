// Hexagon "C" mark traced from assets/Logo_transparent.png.
export const markPath = "M94 39.5V32L50 6L6 32V77L50 103L94 77V70.5";
export const markBar = { x: 33.5, y: 39.5, width: 59, height: 31 };

export function BrandMark({
  className,
  color = "currentColor",
  style,
}: {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg viewBox="0 0 100 109" className={className} style={style} aria-hidden fill="none">
      <path d={markPath} stroke={color} strokeWidth={12} strokeLinejoin="round" />
      <rect {...markBar} fill={color} />
    </svg>
  );
}

const field = [
  { x: 4, y: 6, tone: "ember" },
  { x: 18, y: 14, tone: "mist" },
  { x: 9, y: 30, tone: "mist" },
  { x: 24, y: 36, tone: "ember" },
  { x: 2, y: 52, tone: "ember" },
  { x: 16, y: 60, tone: "mist" },
  { x: 30, y: 66, tone: "ember" },
  { x: 8, y: 80, tone: "mist" },
  { x: 22, y: 88, tone: "ember" },
  { x: 36, y: 92, tone: "mist" },
  { x: 86, y: 10, tone: "mist" },
  { x: 94, y: 30, tone: "ember" },
  { x: 82, y: 78, tone: "ember" },
  { x: 95, y: 90, tone: "mist" },
] as const;

/** Scattered hex marks, after assets/Background.jpeg. Place inside a `relative` parent. */
export function HexField({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      {field.map((mark, i) => (
        <BrandMark
          key={i}
          color={mark.tone === "ember" ? "var(--color-ember)" : "var(--color-mist)"}
          className="absolute w-14 sm:w-20"
          style={{
            left: `${mark.x}%`,
            top: `${mark.y}%`,
            opacity: mark.tone === "ember" ? 0.9 : 0.35,
          }}
        />
      ))}
    </div>
  );
}
