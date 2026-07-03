"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language";
import { GameOfTheDay } from "./GameOfTheDay";

/**
 * Legal Links and Copyright Section Component
 * 
 * Specifications:
 * 
 * Legal Links:
 * - Right-aligned on desktop, left on mobile
 * - Flex wrap, horizontal flow
 * - 16px horizontal, 8px vertical gap
 * - 12px font size
 * - Subtle color (50% opacity)
 * - Hover: Changes to accent blue
 * - 200ms transition
 * 
 * Copyright:
 * - "© [current year] KI-LAMPE"
 * - 14px font size
 * - Subtle color (50% opacity)
 * - 16px margin top
 */
export function LegalLinks() {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  // Legal links - can be customized based on your needs
  const legalLinks = [
    {
      href: "/about",
      label: language === "en" ? "About" : "Über",
    },
    {
      href: "/privacy",
      label: language === "en" ? "Privacy" : "Datenschutz",
    },
    {
      href: "/terms",
      label: language === "en" ? "Terms" : "Nutzungsbedingungen",
    },
    {
      href: "/imprint",
      label: language === "en" ? "Imprint" : "Impressum",
    },
  ];

  return (
    <div className="
      col-span-full
      border-t
      border-divider
      pt-6
      mt-6
      flex
      flex-wrap
      items-center
      justify-center
      gap-x-4
      gap-y-2
      text-sm-custom
      text-foreground/50
    ">
      {/* Legal Links */}
      {legalLinks.map((link, index) => (
        <span key={link.href} className="flex items-center">
          <Link
            href={link.href}
            className="
              transition-colors
              duration-200
              ease
              hover:text-accent
              active:text-accent
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-accent/30
              focus-visible:ring-offset-2
              focus-visible:ring-offset-background
            "
            aria-label={link.label}
          >
            {link.label}
          </Link>
          {index < legalLinks.length - 1 && (
            <span className="mx-3 text-foreground/20">·</span>
          )}
        </span>
      ))}

      {/* Separator */}
      <span className="mx-3 text-foreground/20">·</span>

      {/* Copyright */}
      <p className="text-sm-custom text-foreground/50">
        © {currentYear} KI-LAMPE
      </p>

      {/* Separator */}
      <span className="mx-3 text-foreground/20">·</span>

      {/* Game of the Day */}
      <GameOfTheDay />
    </div>
  );
}
