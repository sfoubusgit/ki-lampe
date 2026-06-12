/**
 * AI Icon Component
 * Filled "sparkle" icon, 16x16px — the common visual shorthand for AI.
 * Used for the AI / KI navigation item.
 */
export function AiIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Large four-point sparkle */}
      <path d="M7 1.5 L8.2 5.6 L12.3 6.8 L8.2 8 L7 12.1 L5.8 8 L1.7 6.8 L5.8 5.6 Z" />
      {/* Small accent sparkle */}
      <path d="M12.5 9.5 L13.1 11.4 L15 12 L13.1 12.6 L12.5 14.5 L11.9 12.6 L10 12 L11.9 11.4 Z" fillOpacity="0.7" />
    </svg>
  );
}
