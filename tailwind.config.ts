import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        "xs": ["10px", { lineHeight: "1.5" }], // Extra Small
        "sm": ["12px", { lineHeight: "1.5" }], // Small
        "2xl": ["24px", { lineHeight: "1.2" }], // For article card titles on desktop
        // Base, lg, xl, and huge use CSS variables for responsive sizing
        // See app/globals.css for responsive font size definitions
      },
      screens: {
        "tablet": "768px",
        "desktop": "1024px",
      },
      colors: {
        // Light mode colors
        background: {
          DEFAULT: "var(--color-background)",
        },
        foreground: {
          DEFAULT: "var(--color-foreground)",
        },
        divider: {
          DEFAULT: "var(--color-divider)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
          dark: "var(--color-accent-dark)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
