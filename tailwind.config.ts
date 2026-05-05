import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: {
          0: "var(--paper-0)",
          25: "var(--paper-25)",
          50: "var(--paper-50)",
          100: "var(--paper-100)",
          150: "var(--paper-150)",
          200: "var(--paper-200)",
          300: "var(--paper-300)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
        },
        line: {
          hair: "var(--line-hair)",
          soft: "var(--line-soft)",
          medium: "var(--line-medium)",
          strong: "var(--line-strong)",
        },
        semantic: {
          blue: "var(--accent-blue)",
          green: "var(--accent-green)",
          danger: "var(--accent-danger)",
          warn: "var(--accent-warn)",
        },
      },
      borderRadius: {
        editorial: "var(--radius-2)",
      },
      boxShadow: {
        line: "var(--shadow-line)",
        float: "var(--shadow-float)",
        editorial: "var(--shadow-elevated)",
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      transitionDuration: {
        editorial: "150ms",
      },
    },
  },
  plugins: [animate],
};

export default config;
