import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        yellow: "#f7c500",
        red: "#cb2424",
        "dark-red": "#b21d1d",
        "contrast-red": "#ff4d4d",
        white: "#f0f0f0",
        black: "#1a1a1a",
        "header-text": "#393a3a",
        link: "#0070f3",
        "light-grey": "#f5f5f5",
        "light-blue": "#66b3ff8a",
        "image-background": "#333333",
      },
      height: {
        footer: "6rem",
        "footer-mobile": "2rem",
        header: "6.2rem",
      },
    },
  },
  plugins: [],
};

export default config;
