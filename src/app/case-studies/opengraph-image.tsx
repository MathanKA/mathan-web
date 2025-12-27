import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Case Studies | Mathan K A";
export const size = {
  width: 1200,
  height: 630
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "black",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 10
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 800,
            textAlign: "center",
            marginBottom: 20
          }}
        >
          Case Studies
        </div>
        <div
          style={{
            color: "#A1A1AA",
            fontSize: 32,
            fontWeight: 500,
            textAlign: "center"
          }}
        >
          Engineering Logs & Product Builds
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
