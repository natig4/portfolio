import { MetadataRoute } from "next";
import { host } from "@/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/"],
    },
    sitemap: `${host}/sitemap.xml`,
  };
}
