/**
 * Art Icon Component
 * Filled "paint blobs" icon, 16x16px — represents art / creativity.
 * Used for the Art navigation item.
 */
export function ArtIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="6" cy="6" r="3.4" />
      <circle cx="10.5" cy="6.5" r="3.1" fillOpacity="0.7" />
      <circle cx="8" cy="10.5" r="3.2" fillOpacity="0.5" />
    </svg>
  );
}
