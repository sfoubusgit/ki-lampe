/**
 * Utility functions for working with colors and opacity
 * These helpers ensure consistent color usage throughout the app
 */

import { colors, opacity } from "./colors";

/**
 * Get a color value with opacity applied
 * @param color - The color value (hex)
 * @param opacityLevel - The opacity level (0-1)
 * @returns RGBA color string
 */
export function withOpacity(color: string, opacityLevel: number): string {
  // Convert hex to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacityLevel})`;
}

/**
 * Get text color class based on opacity level
 * Use with Tailwind: className={getTextOpacityClass('muted')}
 * Or use Tailwind's built-in opacity modifiers: text-foreground/70
 */
export function getTextOpacityClass(level: keyof typeof opacity): string {
  const opacityValue = opacity[level];
  return `text-foreground/[${opacityValue}]`;
}

/**
 * Color constants for direct use in style props
 */
export const colorValues = {
  light: colors.light,
  dark: colors.dark,
  opacity,
} as const;
