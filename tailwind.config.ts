import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", sm: "2rem", lg: "2.5rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        paper: "hsl(var(--paper))",
        background: "hsl(var(--paper))",
        foreground: "hsl(var(--ink))",
        ink: {
          DEFAULT: "hsl(var(--ink))",
          soft: "hsl(var(--ink-soft))",
          faint: "hsl(var(--ink-faint))",
        },
        rule: "hsl(var(--rule))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          soft: "hsl(var(--accent-soft))",
        },
        muted: { DEFAULT: "hsl(var(--rule) / 0.45)", foreground: "hsl(var(--ink-faint))" },
        border: "hsl(var(--rule))",
        card: { DEFAULT: "hsl(var(--paper))", foreground: "hsl(var(--ink))" },
      },
      borderRadius: { DEFAULT: "2px", sm: "2px", md: "3px", lg: "4px", xl: "6px" },
      fontFamily: {
        sans: [
          "var(--font-geist-sans)",
          "PingFang SC",
          "Microsoft YaHei",
          "Hiragino Sans GB",
          "Source Han Sans SC",
          "system-ui",
          "sans-serif",
        ],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "Consolas", "monospace"],
        serif: ["Songti SC", "SimSun", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        label: "0.22em",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        marquee: "marquee 38s linear infinite",
        "pulse-dot": "pulse-dot 2.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
