import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/data";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Workbench palette (mirrors the :root tokens in app/globals.css)
const paper = "#efe4c9";
const ink = "#2b2013";
const muted = "#655a3f";
const accent = "#a83d1a";
const highlight = "#ffd54a";

export default async function OpengraphImage() {
  const words = siteConfig.tagline.split(" ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: paper,
          color: ink,
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            fontSize: 22,
            letterSpacing: 1,
            color: muted,
          }}
        >
          <span>{siteConfig.name.toUpperCase()}</span>
          <span>{siteConfig.location}</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 78,
              fontWeight: 600,
              letterSpacing: -3,
              lineHeight: 1.08,
              maxWidth: 1000,
            }}
          >
            {words.map((word, i) => (
              <span
                key={i}
                style={{
                  marginRight: 20,
                  ...(word === "boring"
                    ? {
                        padding: "0 6px",
                        backgroundImage: `linear-gradient(180deg, transparent 58%, ${highlight} 58%)`,
                      }
                    : {}),
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 44, height: 3, background: accent }} />
            <div style={{ display: "flex", fontSize: 22, color: muted }}>
              Student builder · AI &amp; Data Science · India
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
