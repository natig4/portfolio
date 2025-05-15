import { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = "en";
  const t = await getTranslations({ locale, namespace: "manifest" });

  return {
    name: t("name"),
    short_name: "Nati Gurevich",
    description: "Full-Stack Software Engineer with quality-first approach",
    start_url: "/",
    display: "standalone",
    background_color: "#333333",
    theme_color: "#cb2424",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
