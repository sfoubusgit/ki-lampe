"use client";

import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Divider } from "./Divider";
import { DarkModeToggle } from "./DarkModeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Navigation } from "./Navigation";

/**
 * Mobile Menu Component
 * 
 * Hamburger menu for mobile/tablet devices that shows sidebar navigation
 * - Toggle button with hamburger icon
 * - Slide-in sidebar from left
 * - Overlay backdrop
 * - Close on outside click or escape key
 */
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      <button
        onClick={toggleMenu}
        className="
          fixed
          top-4
          left-4
          z-50
          desktop:hidden
          p-2
          rounded-sm
          bg-background
          border
          border-foreground/15
          text-foreground
          pointer-events-auto
          transition-all
          duration-200
          ease
          hover:bg-accent/5
          hover:border-accent/30
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-accent/30
          focus-visible:ring-offset-2
          focus-visible:ring-offset-background
        "
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-sidebar"
        type="button"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay Backdrop */}
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            bg-foreground/20
            dark:bg-foreground/30
            z-40
            desktop:hidden
            backdrop-blur-sm
          "
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`
          fixed
          left-0
          top-0
          h-screen
          w-64
          bg-gradient-to-br
          from-[#d55b9b]
          to-[#5b9bd5]
          dark:from-[#2d5f3a]
          dark:to-[#3a6a8f]
          border-r
          border-white/20
          dark:border-white/10
          z-[60]
          desktop:hidden
          flex
          flex-col
          items-center
          transform
          transition-transform
          duration-300
          ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        aria-label="Mobile navigation menu"
        role="navigation"
      >
        {/* Logo at top */}
        <div className="w-full pt-6 flex justify-center">
          <Logo />
        </div>

        {/* Rest of the content - vertically centered */}
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <Divider />
          <DarkModeToggle />
          <LanguageSwitcher />
          <Divider />
          <Navigation />
        </div>

        {/* Close button */}
        <button
          onClick={closeMenu}
          className="
            absolute
            top-4
            right-4
            p-2
            rounded-sm
            text-foreground/50
            hover:text-foreground
            hover:bg-accent/5
            transition-all
            duration-200
            ease
            focus:outline-none
            focus-visible:ring-2
            focus-visible:ring-accent/30
            focus-visible:ring-offset-2
            focus-visible:ring-offset-background
          "
          aria-label="Close menu"
          type="button"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </aside>
    </>
  );
}
