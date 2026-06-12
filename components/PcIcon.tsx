/**
 * PC Icon Component
 * Filled PC/computer icon, 16x16px
 * Used for the PC navigation item
 */
export function PcIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Monitor screen */}
      <rect x="2" y="2" width="12" height="8" rx="0.5" />
      {/* Monitor stand */}
      <rect x="6" y="10" width="4" height="1" />
      {/* Monitor base */}
      <rect x="5" y="11" width="6" height="1" rx="0.5" />
      {/* Screen inner */}
      <rect x="3" y="3" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}
