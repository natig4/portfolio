import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        text: {
          DEFAULT: "var(--text)",
          secondary: "var(--text-secondary)",
        },
        background: {
          DEFAULT: "var(--background)",
          secondary: "var(--background-secondary)",
        },
        surface: "var(--surface)",
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
        },
        secondary: "var(--secondary)",
        accent: {
          DEFAULT: "var(--accent)",
          secondary: "var(--accent-secondary)",
        },
        border: "var(--border)",
        muted: "var(--muted)",
        destructive: "var(--destructive)",
        success: "var(--success)",
        warning: "var(--warning)",
      },
      minHeight: {
        "16": "4rem",
      },
      boxShadow: {
        "glow-sm": "0 0 10px var(--glow-primary)",
        glow: "0 0 20px var(--glow-primary)",
        "glow-lg": "0 0 40px var(--glow-primary)",
        "glow-xl": "0 0 60px var(--glow-primary)",
        "glow-secondary": "0 0 20px var(--glow-secondary)",
        "glow-secondary-lg": "0 0 40px var(--glow-secondary)",
        "glow-accent": "0 0 20px var(--glow-accent)",
        "glow-accent-lg": "0 0 40px var(--glow-accent)",
        "glow-warm": "0 0 20px var(--glow-warm)",
        "glow-warm-lg": "0 0 40px var(--glow-warm)",
        neon: "0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor",
        "neon-sm": "0 0 10px currentColor, 0 0 20px currentColor",
        cyber:
          "0 0 10px var(--glow-primary), 0 0 20px var(--glow-primary), 0 0 40px var(--glow-primary), 0 0 80px var(--glow-primary)",
        "inner-glow": "inset 0 0 20px var(--glow-primary)",
        futuristic:
          "0 8px 32px rgba(56, 189, 248, 0.15), 0 0 0 1px rgba(56, 189, 248, 0.1)",
        "futuristic-hover":
          "0 12px 40px rgba(56, 189, 248, 0.25), 0 0 0 1px rgba(56, 189, 248, 0.2)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear": "linear-gradient(var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(135deg, var(--primary), var(--secondary))",
        "gradient-accent":
          "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
        "gradient-cyber":
          "linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))",
        "gradient-mesh":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,.15) 1px, transparent 0)",
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
      },
      animation: {
        "gradient-shift": "gradientShift 3s ease infinite",
        "background-shift": "backgroundShift 20s ease infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        "text-gradient": "textGradientShift 6s ease infinite",
        "background-flow": "backgroundFlow 20s ease infinite",
        "focus-pulse": "focusPulse 2s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        morph: "morph 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "cyber-grid": "cyberGrid 10s linear infinite",
        "float-slow": "float 6s ease-in-out infinite",
        "float-delayed": "float 4s ease-in-out infinite 1s",
        "spin-slow": "spin 6s linear infinite",
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite",
        "bounce-subtle": "bounceSubtle 3s ease-in-out infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "rotate-in": "rotateIn 0.5s ease-out",
        "pulse-slow": "pulse 8s ease-in-out infinite",
        "pulse-delayed": "pulse 10s ease-in-out 1s infinite",
      },
      keyframes: {
        // Existing keyframes
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        backgroundShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px var(--glow-primary)" },
          "50%": { boxShadow: "0 0 40px var(--glow-primary)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },

        // New enhanced keyframes
        textGradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "25%": { backgroundPosition: "100% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "75%": { backgroundPosition: "0% 100%" },
        },
        backgroundFlow: {
          "0%, 100%": {
            backgroundSize: "100% 100%",
            backgroundPosition: "0% 0%, 100% 100%, 50% 50%",
          },
          "33%": {
            backgroundSize: "120% 120%",
            backgroundPosition: "30% 30%, 70% 70%, 20% 80%",
          },
          "66%": {
            backgroundSize: "110% 110%",
            backgroundPosition: "80% 20%, 20% 80%, 60% 40%",
          },
        },
        focusPulse: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 3px var(--glow-primary), 0 0 20px var(--glow-primary)",
          },
          "50%": {
            boxShadow:
              "0 0 0 5px var(--glow-primary), 0 0 40px var(--glow-primary)",
          },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        morph: {
          "0%, 100%": {
            transform: "scale(1) rotate(0deg)",
            borderRadius: "50%",
          },
          "33%": {
            transform: "scale(1.1) rotate(120deg)",
            borderRadius: "30%",
          },
          "66%": {
            transform: "scale(0.9) rotate(240deg)",
            borderRadius: "60%",
          },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.5", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.1)" },
        },
        cyberGrid: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 100%" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        rotateIn: {
          "0%": { transform: "rotate(-180deg)", opacity: "0" },
          "100%": { transform: "rotate(0deg)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "40px",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      fontFamily: {
        cyber: ["Orbitron", "monospace"],
        futuristic: ["Exo 2", "sans-serif"],
      },
      scale: {
        "97": "0.97",
        "103": "1.03",
      },
    },
  },
  plugins: [],
};

export default config;
