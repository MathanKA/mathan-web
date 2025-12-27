import { ImageResponse } from "next/og";
import { SITE } from "@/lib/seo/site";

export const runtime = "edge";

export const alt = "Mathan K A | Senior Front-end Engineer";
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
            "radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2%, transparent 0%)",
          backgroundSize: "50px 50px"
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
          Mathan K A
        </div>
        <div
          style={{
            color: "#A1A1AA",
            fontSize: 32,
            fontWeight: 500,
            textAlign: "center"
          }}
        >
          Senior Front-end Engineer
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
