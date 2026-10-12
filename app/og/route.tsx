import { ImageResponse } from "next/og";
import { portfolioIdentity, portfolioShareImage } from "@/lib/seo";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "80px",
        background: "#171717",
        color: "#fafafa",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 28, color: "#a3a3a3" }}>
        Portfolio
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 86,
          fontWeight: 700,
          marginTop: 24,
        }}
      >
        {portfolioIdentity.name}
      </div>
      <div style={{ display: "flex", fontSize: 40, marginTop: 24 }}>
        {portfolioIdentity.role}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          color: "#a3a3a3",
          marginTop: 64,
        }}
      >
        TypeScript · React · Next.js
      </div>
    </div>,
    { width: portfolioShareImage.width, height: portfolioShareImage.height },
  );
}
