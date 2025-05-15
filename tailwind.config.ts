import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // Enable dark mode with class
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff1f1",
          100: "#ffe1e1",
          200: "#ffc7c7",
          300: "#ffa2a2",
          400: "#ff7171",
          500: "#ff4d4d", // Your contrast-red
          600: "#e62e2e",
          700: "#cb2424", // Your red
          800: "#b21d1d", // Your dark-red
          900: "#7d1414",
        },
      },
      minHeight: {
        "16": "4rem",
      },
    },
  },
  plugins: [],
};

export default config;
