/**
 * Controller Icon Component
 * Filled game controller icon, 16x16px
 * Used for the Consoles navigation item
 */
export function ControllerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Controller body */}
      <rect x="2" y="6" width="12" height="6" rx="1" />
      {/* Left handle */}
      <path d="M2 8 Q1 8 1 9 Q1 10 2 10 L2 8 Z" />
      {/* Right handle */}
      <path d="M14 8 Q15 8 15 9 Q15 10 14 10 L14 8 Z" />
      {/* D-pad */}
      <rect x="3" y="7" width="2" height="2" />
      {/* Action buttons */}
      <circle cx="11" cy="8" r="1" />
      <circle cx="13" cy="8" r="1" />
    </svg>
  );
}
