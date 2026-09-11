import { ImageResponse } from "next/og";

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
            gap: 16,
            color: "#ffffff",
            fontSize: 28,
            fontWeight: 600,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              background: "#FF4F20",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            M
          </div>
          MyCult
        </div>
        <div
          style={{
            marginTop: 36,
            color: "#ffffff",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -2,
            lineHeight: 1.05,
            maxWidth: 820,
          }}
        >
          Your loyalty, unified.
        </div>
        <div style={{ marginTop: 28, color: "#D9D9D9", fontSize: 28, maxWidth: 720 }}>
          One wallet for the places you love.
        </div>
      </div>
    ),
    size,
  );
}
