import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Satori (next/og) has no right-to-left layout, so share images use Latin text in every locale.
const fontDir = join(process.cwd(), "src", "assets", "fonts");

async function loadFonts() {
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, "IBMPlexSans-400.ttf")),
    readFile(join(fontDir, "IBMPlexSans-600.ttf")),
  ]);
  return [
    {
      name: "Plex",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Plex",
      data: semibold,
      weight: 600 as const,
      style: "normal" as const,
    },
  ];
}

/** Screenshots are read from disk as base64 — Satori only accepts JPEG/PNG data or URLs. */
export async function screenshotDataUrl(slug: string) {
  const file = join(
    process.cwd(),
    "src",
    "assets",
    "projects",
    slug,
    "desktop.jpg",
  );
  const data = await readFile(file);
  return `data:image/jpeg;base64,${data.toString("base64")}`;
}

function LogoMark({ height }: { height: number }) {
  return (
    <svg width={height * 2} height={height} viewBox='0 0 80 40' fill='none'>
      <path d='M4 35V5h6.5L22 25.5V5h6v30h-6.5L10 14.5V35z' fill='#FAFAFA' />
      <path
        d='M56.2 11.8A12.5 12.5 0 1 0 59 20H47'
        stroke='#22D3EE'
        strokeWidth='6'
      />
      <path
        d='M63 34l6-27M71 15l5 5-5 5'
        stroke='#22D3EE'
        strokeWidth='3.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export async function renderOgImage({
  eyebrow,
  title,
  description,
  screenshots,
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** Up to two screenshot data URLs, drawn as stacked browser windows on the right. */
  screenshots: string[];
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#09090B",
        color: "#FAFAFA",
        fontFamily: "Plex",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -220,
          right: -120,
          width: 620,
          height: 620,
          borderRadius: 9999,
          background: "rgba(34, 211, 238, 0.16)",
          filter: "blur(80px)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 0 64px 72px",
          width: screenshots.length ? 620 : 1100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark height={34} />
          <span style={{ fontSize: 26, fontWeight: 600 }}>
            New Generation SW
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 19,
              color: "#22D3EE",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: title.length > 18 ? 58 : 72,
              fontWeight: 600,
              lineHeight: 1.05,
              marginTop: 18,
              letterSpacing: -1.5,
            }}
          >
            {title}
          </span>
          <span
            style={{
              fontSize: 28,
              lineHeight: 1.35,
              color: "#A1A1AA",
              marginTop: 22,
            }}
          >
            {description}
          </span>
        </div>
        <span style={{ fontSize: 22, color: "#71717A" }}>
          nati-gurevich.com
        </span>
      </div>

      {screenshots.map((src, index) => (
        <div
          key={src.slice(-32)}
          style={{
            position: "absolute",
            display: "flex",
            flexDirection: "column",
            width: 640,
            left: 660 + index * 40,
            top: 120 + index * 150,
            borderRadius: 14,
            overflow: "hidden",
            border: "1px solid #3F3F46",
            background: "#18181B",
            boxShadow: "0 30px 60px rgba(0,0,0,0.5)",
          }}
        >
          <div style={{ display: "flex", gap: 8, padding: "12px 14px" }}>
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 9999,
                  background: "#3F3F46",
                }}
              />
            ))}
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- Satori renders plain <img> */}
          <img
            src={src}
            width={640}
            height={400}
            alt=''
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </div>
      ))}
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}
