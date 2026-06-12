/**
 * Typography system constants and utilities for KI-LAMPE
 * These match the exact specifications from the visual spec
 */

export const typography = {
  fonts: {
    sans: "Inter",
    mono: "JetBrains Mono",
  },
  sizes: {
    xs: "10px", // Extra Small
    sm: "12px", // Small
    base: {
      mobile: "16px",
      desktop: "18px",
    },
    lg: {
      mobile: "18px",
      desktop: "20px",
    },
    xl: {
      mobile: "20px",
      desktop: "24px",
    },
    huge: {
      mobile: "36px",
      tablet: "48px",
      desktop: "60px",
    },
  },
  lineHeights: {
    relaxed: 1.75,
    tight: 1.2,
  },
  letterSpacing: {
    tight: "-0.02em",
    wide: "0.05em",
  },
  weights: {
    regular: 400,
    semibold: 600,
  },
} as const;

/**
 * Get responsive font size class
 */
export function getFontSizeClass(size: keyof typeof typography.sizes): string {
  const sizeConfig = typography.sizes[size];
  
  if (typeof sizeConfig === "string") {
    return `text-${size}-custom`;
  }
  
  // For responsive sizes, return base class
  // Tailwind will handle responsive variants
  if (size === "base") return "text-base-custom";
  if (size === "lg") return "text-lg-custom";
  if (size === "xl") return "text-xl-custom";
  if (size === "huge") return "text-huge";
  
  return "";
}

/**
 * Typography utility classes mapping
 */
export const typographyClasses = {
  // Sizes
  xs: "text-xs-custom",
  sm: "text-sm-custom",
  base: "text-base-custom",
  lg: "text-lg-custom",
  xl: "text-xl-custom",
  huge: "text-huge",
  
  // Line heights
  relaxed: "leading-relaxed",
  tight: "leading-tight",
  
  // Letter spacing
  trackingTight: "tracking-tight",
  trackingWide: "tracking-wide",
  
  // Weights
  regular: "font-regular",
  semibold: "font-semibold",
  
  // Font families
  sans: "font-sans",
  mono: "font-mono",
} as const;
