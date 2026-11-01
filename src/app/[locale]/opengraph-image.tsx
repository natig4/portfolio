import { routing } from "@/i18n/routing";
import { ogSize, renderOgImage, screenshotDataUrl } from "@/lib/og";

export const alt =
  "New Generation SW — websites, web apps and internal tools by Nati Gurevich";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Nati Gurevich · Founder & Lead Engineer",
    title: "New Generation SW",
    description: "Websites, web apps and internal tools — built quality-first.",
    screenshots: await Promise.all([
      screenshotDataUrl("mirk"),
      screenshotDataUrl("my-north-food"),
    ]),
  });
}
