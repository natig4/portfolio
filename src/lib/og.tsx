import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Satori (next/og) has no right-to-left layout, so share images use Latin text in every locale.
const fontDir = join(process.cwd(), "src", "assets", "fonts");

async function loadFonts() {
  const [regular, bold] = await Promise.all([
    readFile(join(fontDir, "Rubik-400.ttf")),
    readFile(join(fontDir, "Rubik-700.ttf")),
  ]);
  return [
    {
      name: "Rubik",
      data: regular,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Rubik",
      data: bold,
      weight: 700 as const,
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
      <defs>
        <linearGradient id='ng' x1='36' y1='4' x2='78' y2='36'>
          <stop offset='0' stopColor='#8B5CF6' />
          <stop offset='1' stopColor='#22D3EE' />
        </linearGradient>
      </defs>
      <path d='M4 35V5h6.5L22 25.5V5h6v30h-6.5L10 14.5V35z' fill='#F5F7FB' />
      <path
        d='M56.2 11.8A12.5 12.5 0 1 0 59 20H47'
        stroke='url(#ng)'
        strokeWidth='6'
      />
      <path
        d='M63 34l6-27M71 15l5 5-5 5'
        stroke='url(#ng)'
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
  screenshots = [],
  highlight,
}: {
  eyebrow: string;
  title: string;
  description: string;
  /** Up to two screenshot data URLs, drawn as stacked browser windows on the right. */
  screenshots?: string[];
  /** A headline result drawn large on the right, e.g. { value: "+49%", label: "Purchase value" }. */
  highlight?: { value: string; label: string };
}) {
  const hasAside = screenshots.length > 0 || Boolean(highlight);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0B0F1A",
        color: "#F5F7FB",
        fontFamily: "Rubik",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -260,
          left: -160,
          width: 720,
          height: 720,
          borderRadius: 9999,
          background: "rgba(124, 58, 237, 0.30)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -300,
          right: -160,
          width: 680,
          height: 680,
          borderRadius: 9999,
          background: "rgba(6, 182, 212, 0.24)",
          filter: "blur(90px)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 0 64px 72px",
          width: hasAside ? 620 : 1100,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <LogoMark height={34} />
          <span style={{ fontSize: 26, fontWeight: 700 }}>
            New Generation SW
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 19,
              color: "#A78BFA",
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              fontSize: title.length > 18 ? 58 : 72,
              fontWeight: 700,
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
              color: "#A3ADBF",
              marginTop: 22,
            }}
          >
            {description}
          </span>
        </div>
        <span style={{ fontSize: 22, color: "#7C879B" }}>
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
            border: "1px solid #252D42",
            background: "#121829",
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
                  background: "#252D42",
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

      {highlight && (
        <div
          style={{
            position: "absolute",
            right: 72,
            top: 150,
            width: 440,
            height: 330,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 44px",
            borderRadius: 28,
            border: "1px solid #252D42",
            background: "rgba(18, 24, 41, 0.85)",
          }}
        >
          <span
            style={{
              fontSize: 112,
              fontWeight: 700,
              letterSpacing: -4,
              lineHeight: 1,
              backgroundImage: "linear-gradient(100deg, #A78BFA, #22D3EE)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {highlight.value}
          </span>
          <span style={{ fontSize: 28, color: "#A3ADBF", marginTop: 18 }}>
            {highlight.label}
          </span>
        </div>
      )}
    </div>,
    { ...ogSize, fonts: await loadFonts() },
  );
}
