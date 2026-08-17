import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-faint": "var(--ink-faint)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
        border: "var(--border)",
        "brand-blue": "var(--brand-blue)",
        "brand-blue-bright": "var(--brand-blue-bright)",
        "brand-yellow": "var(--brand-yellow)",
        "brand-black": "var(--brand-black)",
        "brand-gray": "var(--brand-gray)",
      },
      fontFamily: {
        display: ["var(--font-jakarta)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.03em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(24,19,10,0.04), 0 8px 24px rgba(24,19,10,0.06)",
        lift: "0 4px 12px rgba(24,19,10,0.06), 0 24px 48px rgba(24,19,10,0.10)",
        card: "0 0 0 1px rgba(234,216,112,0.5), 0 1px 2px rgba(24,19,10,0.04), 0 12px 32px rgba(24,19,10,0.07)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "underline-draw": "underlineDraw 700ms cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        underlineDraw: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
