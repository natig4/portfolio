import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";
import { host } from "@/config";
import { locales, defaultLocale } from "@/i18n/routing";
import { THEME_COLOR } from "@/lib/model/common";

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
    theme_color: THEME_COLOR,

    lang: locale,
    dir: locale === "he" ? "rtl" : "ltr",

    prefer_related_applications: false,

    icons: [
      {
        src: "/icons/NgLogo.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icons/NgLogo.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icons/NgLogo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/NgLogo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/NgLogo.png",
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

    shortcuts: [
      {
        name: t("links.projects", { defaultValue: "Projects" }),
        short_name: t("links.projects", { defaultValue: "Projects" }),
        description: "View my portfolio projects",
        url: "/projects",
        icons: [{ src: "/icons/NgLogo.png", sizes: "96x96" }],
      },
      {
        name: t("links.contact", { defaultValue: "Contact" }),
        short_name: t("links.contact", { defaultValue: "Contact" }),
        description: "Get in touch with me",
        url: "/contact",
        icons: [{ src: "/icons/NgLogo.png", sizes: "96x96" }],
      },
    ],
  };
}
