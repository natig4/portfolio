import { ReactNode } from "react";
import "./globals.css";
import { Metadata } from "next";
import { THEME_COLOR } from "@/lib/model/common";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "Nati Gurevich | Software Engineer",
  description: "Quality-first developer with a unique QA leadership background",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icons/NgLogo.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/NgLogo.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/icons/NgLogo.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/NgLogo.svg",
        color: THEME_COLOR,
      },
    ],
  },
  themeColor: THEME_COLOR,
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: Props) {
  return children;
}
