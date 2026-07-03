import Link from "next/link";

/**
 * Sidebar Logo Component
 * 
 * Specifications:
 * - Text: "KI-LAMPE" in base font size, semibold weight
 * - Container:
 *   - Background: 10% opacity accent blue (15% in dark mode)
 *   - Border: 1px, 20% opacity accent blue (25% in dark mode)
 *   - Small rounded corners (2-3px)
 *   - Padding: 10px horizontal, 6px vertical
 * - Hover state:
 *   - Background increases to 15% opacity (20% in dark mode)
 *   - Text color changes to full accent blue
 *   - Smooth 200ms transition
 * - Clickable link to homepage
 */
export function Logo() {
  return (
    <Link
      href="/"
      className="
        block
        w-full
        text-base-custom
        font-semibold
        py-[6px]
        px-[10px]
        transition-all
        duration-200
        ease
        text-center
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/50
        focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent
      "
      aria-label="KI-LAMPE Home"
    >
      <span 
        className="flex items-center justify-center gap-1.5"
        style={{
          backgroundImage: 'linear-gradient(to right, white, rgba(255, 255, 255, 0.9))',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        <span>KI</span>
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 dark:bg-yellow-400 flex-shrink-0 logo-yellow-dot"></span>
        <span>LAMPE</span>
      </span>
    </Link>
  );
}
