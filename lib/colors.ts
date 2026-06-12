/**
 * Color system constants for KI-LAMPE
 * These match the exact specifications from the visual spec
 */

export const colors = {
  light: {
    background: "#FAFAF9",
    foreground: "#1A1A1A",
    divider: "#E5E5E4",
    accent: "#5B9BD5",
    accentLight: "#7BB3E0",
    accentDark: "#4A8BC4",
    magenta: "#D55B9B",
  },
  dark: {
    background: "#1A1A1A",
    foreground: "#FAFAF9",
    divider: "#3A3A3A",
    accent: "#5B9BD5",
    accentLight: "#7BB3E0",
    accentDark: "#4A8BC4",
    magenta: "#D55B9B",
  },
} as const;

export const opacity = {
  normal: 1,
  muted: 0.7,
  subtle: 0.5,
} as const;

export type ColorMode = "light" | "dark";
