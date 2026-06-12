/**
 * Clock Icon Component
 * Filled clock icon, 16x16px
 * Used for the News navigation item
 */
export function ClockIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Clock face - filled circle */}
      <circle cx="8" cy="8" r="6" />
      {/* Clock center dot */}
      <circle cx="8" cy="8" r="0.8" fill="white" opacity="0.9" />
      {/* Hour hand pointing to 12 */}
      <rect x="7.5" y="5.5" width="1" height="2.5" rx="0.5" fill="white" opacity="0.95" />
      {/* Minute hand pointing to 3 */}
      <rect x="8" y="7.5" width="2.5" height="1" rx="0.5" fill="white" opacity="0.95" />
    </svg>
  );
}
