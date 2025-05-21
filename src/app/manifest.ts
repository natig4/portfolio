import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { host } from "@/config";
import { locales, defaultLocale } from "@/i18n/routing";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = defaultLocale;
  const t = await getTranslations({ locale, namespace: "manifest" });

  return {
    name: t("name"),
    short_name: "Nati Gurevich",
    description: "Full-Stack Software Engineer with quality-first approach",
    start_url: "/",
    id: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    orientation: "portrait",
    background_color: "#1e293b",
    theme_color: "#0ea5e9",

    lang: locale,
    dir: locale === "he" ? "rtl" : "ltr",

    prefer_related_applications: false,

    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],

    related_applications: locales.map((loc) => ({
      platform: "webapp",
      url: `${host}/${loc}/manifest.webmanifest`,
      id: loc === defaultLocale ? "/" : `/${loc}`,
    })),

    screenshots: [
      {
        src: "/screenshots/desktop-1.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
      },
      {
        src: "/screenshots/mobile-1.png",
        sizes: "750x1334",
        type: "image/png",
        form_factor: "narrow",
      },
    ],

    shortcuts: [
      {
        name: t("links.projects", { defaultValue: "Projects" }),
        short_name: t("links.projects", { defaultValue: "Projects" }),
        description: "View my portfolio projects",
        url: "/projects",
        icons: [{ src: "/icons/projects.png", sizes: "96x96" }],
      },
      {
        name: t("links.contact", { defaultValue: "Contact" }),
        short_name: t("links.contact", { defaultValue: "Contact" }),
        description: "Get in touch with me",
        url: "/contact",
        icons: [{ src: "/icons/contact.png", sizes: "96x96" }],
      },
    ],
  };
}
