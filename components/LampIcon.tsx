/**
 * Power Toggle Icon Component
 * 16x16px SVG toggle button icon
 * - Light mode: Unclicked/off, no glow
 * - Dark mode: Clicked/on, yellow glow
 */
export function LampIcon({ isDark }: { isDark: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={isDark ? "power-toggle-on" : "power-toggle-off"}
      aria-hidden="true"
    >
      {/* Toggle track */}
      <rect
        x="1.5"
        y="4.5"
        width="13"
        height="7"
        rx="3.5"
        fill={isDark ? "#facc15" : "none"}
        stroke="currentColor"
        strokeWidth="1"
        opacity={isDark ? "0.95" : "1"}
      />

      {/* Toggle button (pressed when on) */}
      <circle
        cx={isDark ? "10.5" : "5.5"}
        cy="8"
        r="2.4"
        fill={isDark ? "#fff7c2" : "currentColor"}
        opacity={isDark ? "1" : "0.4"}
      />

      {/* Inner press ring to suggest a click */}
      {isDark && (
        <circle
          cx="10.5"
          cy="8"
          r="1.2"
          fill="#f59e0b"
          opacity="0.8"
        />
      )}
    </svg>
  );
}
