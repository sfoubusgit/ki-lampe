import Link from "next/link";
import { ReactNode } from "react";

interface NavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  isActive?: boolean;
}

/**
 * Navigation Item Component
 * 
 * Specifications:
 * - Layout: Icon on top, label below
 * - Icon: Base font size, monospace font, centered
 * - Label: 10px font size, monospace, uppercase, wide letter spacing
 * - Gap: 6px between icon and label
 * - Padding: 12px horizontal, 8px vertical
 * - Rounded corners: Small radius
 * - Inactive: Subtle color (50% opacity), transparent background
 * - Active: Accent blue text, 10% accent background (15% in dark mode)
 * - Hover: Accent blue text, 5% accent background (10% in dark mode)
 * - Transition: 200ms ease
 */
export function NavItem({ href, icon, label, isActive = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`
        flex
        flex-col
        items-center
        px-3
        py-2
        rounded-sm
        transition-all
        duration-200
        ease
        focus:outline-none
        focus:ring-2
        focus:ring-white/50
        focus:ring-offset-2
        focus:ring-offset-transparent
        ${
          isActive
            ? "text-white bg-white/20 dark:bg-white/25"
            : "text-white/70 dark:text-white/80 bg-transparent hover:text-white hover:bg-white/10 dark:hover:bg-white/15"
        }
      `}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
    >
      {/* Icon - Base font size, monospace, centered */}
      <span className="text-base-custom font-mono flex items-center justify-center leading-none">
        {icon}
      </span>
      {/* Label - 10px, monospace, uppercase, wide letter spacing, 6px gap from icon */}
      <span className="text-xs-custom font-mono uppercase tracking-wide mt-1.5 leading-none">
        {label}
      </span>
    </Link>
  );
}
