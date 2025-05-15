import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
        dark: {
          bg: "#121212",
          card: "#1e1e1e",
          accent: "#333333",
        },
      },
      minHeight: {
        "16": "4rem",
      },
      boxShadow: {
        "custom-light":
          "0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)",
        "custom-dark":
          "0 2px 15px -3px rgba(0, 0, 0, 0.2), 0 10px 20px -2px rgba(0, 0, 0, 0.1)",
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "#333",
            strong: {
              fontWeight: "600",
            },
            a: {
              color: "#cb2424",
              "&:hover": {
                color: "#e62e2e",
              },
            },
            h1: {
              fontWeight: "700",
            },
            h2: {
              fontWeight: "600",
            },
            h3: {
              fontWeight: "600",
            },
            h4: {
              fontWeight: "600",
            },
          },
        },
        dark: {
          css: {
            color: "#d1d5db",
            a: {
              color: "#ff4d4d",
              "&:hover": {
                color: "#ff7171",
              },
            },
            strong: {
              color: "#f3f4f6",
            },
            h1: {
              color: "#f3f4f6",
            },
            h2: {
              color: "#f3f4f6",
            },
            h3: {
              color: "#f3f4f6",
            },
            h4: {
              color: "#f3f4f6",
            },
            blockquote: {
              color: "#d1d5db",
              borderLeftColor: "#4b5563",
            },
            code: {
              color: "#e5e7eb",
            },
            pre: {
              backgroundColor: "#1f2937",
              color: "#e5e7eb",
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
