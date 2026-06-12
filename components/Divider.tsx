/**
 * Sidebar Divider Component
 * 
 * Specifications:
 * - Thin horizontal line
 * - Width: 48px
 * - Height: 1px
 * - Color: Divider color (matches theme)
 * - Used to separate sidebar sections
 */
export function Divider() {
  return (
    <div 
      className="w-12 h-px bg-white/30 dark:bg-white/20"
      aria-hidden="true"
    />
  );
}
