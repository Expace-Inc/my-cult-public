import { ImageResponse } from "next/og";
import { markBar, markPath } from "@/components/brand-mark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#143630",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="40" height="44" viewBox="0 0 100 109" fill="none">
          <path d={markPath} stroke="#FF4F20" strokeWidth={12} strokeLinejoin="round" />
          <rect {...markBar} fill="#FF4F20" />
        </svg>
      </div>
    ),
    size,
  );
}
