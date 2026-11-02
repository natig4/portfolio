import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.company} — ${site.name}`,
    short_name: site.company,
    description: "Websites, web apps and internal tools — built quality-first.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: site.themeColor.dark,
    theme_color: site.themeColor.dark,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
