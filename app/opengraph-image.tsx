import { ImageResponse } from "next/og";
import { markBar, markPath } from "@/components/brand-mark";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#143630",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            color: "#D9D9D9",
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: -1,
          }}
        >
          <svg width="56" height="61" viewBox="0 0 100 109" fill="none">
            <path d={markPath} stroke="#FF4F20" strokeWidth={12} strokeLinejoin="round" />
            <rect {...markBar} fill="#FF4F20" />
          </svg>
          <div style={{ display: "flex" }}>
            MYCULT<span style={{ color: "#FF4F20" }}>.</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 36,
            color: "#FF4F20",
            fontSize: 96,
            fontWeight: 900,
            letterSpacing: -3,
            lineHeight: 0.95,
            textTransform: "uppercase",
            textShadow: "6px 6px 0 #081815",
            maxWidth: 820,
          }}
        >
          Your loyalty, unified.
        </div>
        <div style={{ marginTop: 32, color: "#D9D9D9", fontSize: 36, fontWeight: 700, maxWidth: 760 }}>
          One wallet for the places you love.
        </div>
      </div>
    ),
    size,
  );
}
