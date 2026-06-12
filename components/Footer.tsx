import { ReactNode } from "react";

/**
 * Footer Container Component
 * 
 * Specifications:
 * - Margin top: 80px mobile, 96px desktop
 * - Border top: 1px divider color
 * - Full width
 * - Max width: 1200px (same as main content), centered
 * - Padding: 32px mobile, 40px desktop vertical
 * - Horizontal padding: 24px mobile, 32px desktop
 * 
 * Footer Layout:
 * - Two-column grid on tablet/desktop (768px+)
 * - Single column on mobile
 * - Gap: 32px mobile, 48px desktop
 */
interface FooterProps {
  children: ReactNode;
}

export function Footer({ children }: FooterProps) {
  return (
    <footer className="
      w-full
      mt-20
      desktop:mt-24
      border-t
      border-divider
      footer-dark-gradient
      w-screen
      relative
      left-1/2
      right-1/2
      -ml-[50vw]
      -mr-[50vw]
      desktop:-translate-x-40
    ">
      <div className="
        max-w-[1200px]
        mx-auto
        py-8
        desktop:py-10
        px-6
        desktop:px-8
      ">
        <div className="
          grid
          grid-cols-1
          tablet:grid-cols-2
          desktop:grid-cols-3
          gap-8
          desktop:gap-12
        ">
          {children}
        </div>
      </div>
    </footer>
  );
}
