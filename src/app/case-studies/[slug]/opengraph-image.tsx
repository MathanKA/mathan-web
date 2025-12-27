import { ImageResponse } from "next/og";
import { type CaseStudy } from "@/velite";
import caseStudiesData from "../../../../.velite/caseStudies.json";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const post = (caseStudiesData as CaseStudy[]).find((p) => p.slug === slug);

  if (!post) {
    return new ImageResponse(
      <div
        style={{
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: 48
        }}
      >
        Case Study Not Found
      </div>,
      { ...size }
    );
  }

  return new ImageResponse(
    <div
      style={{
        background: "black",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: 80,
        position: "relative"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 20%)",
          backgroundSize: "100% 100%"
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          zIndex: 10
        }}
      >
        <div
          style={{
            color: "#10B981", // Emerald-500
            fontSize: 24,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 2
          }}
        >
          Case Study
        </div>
        <div
          style={{
            color: "white",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: "90%"
          }}
        >
          {post.title}
        </div>
        <div
          style={{
            color: "#A1A1AA",
            fontSize: 32,
            fontWeight: 400,
            maxWidth: "80%"
          }}
        >
          {post.summary_one_liner}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          alignItems: "flex-end",
          zIndex: 10
        }}
      >
        <div style={{ display: "flex", gap: 16 }}>
          {post.tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#E4E4E7",
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 20
              }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div
          style={{
            color: "#52525B",
            fontSize: 24,
            fontWeight: 600
          }}
        >
          mathan.pro
        </div>
      </div>
    </div>,
    {
      ...size
    }
  );
}
