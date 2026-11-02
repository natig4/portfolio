// Renders src/app/icon.svg into the PNG icons used by the manifest and Apple devices.
// Usage: node scripts/generate-icons.mjs
import { readFile, writeFile } from "node:fs/promises";
import { launchBrowser } from "./lib/browser.mjs";

const svg = await readFile(
  new URL("../src/app/icon.svg", import.meta.url),
  "utf8",
);
const targets = [
  { file: "public/icons/icon-192.png", size: 192, inset: 0 },
  { file: "public/icons/icon-512.png", size: 512, inset: 0 },
  // Maskable icons need the artwork inside the central ~80% safe zone, on a full-bleed background.
  { file: "public/icons/icon-maskable-512.png", size: 512, inset: 0.12 },
  { file: "src/app/apple-icon.png", size: 180, inset: 0 },
];

const browser = await launchBrowser();
const page = await browser.newPage();
for (const { file, size, inset } of targets) {
  const pad = Math.round(size * inset);
  const art = inset ? svg.replace(/rx="14"/, 'rx="0"') : svg;
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<html><body style="margin:0;background:${inset ? "#0B0F1A" : "transparent"}">
      <div style="padding:${pad}px;width:${size - pad * 2}px;height:${size - pad * 2}px">${art.replace("<svg ", '<svg width="100%" height="100%" ')}</div>
    </body></html>`,
  );
  await writeFile(file, await page.screenshot({ omitBackground: !inset }));
  console.log("wrote", file);
}
await browser.close();
