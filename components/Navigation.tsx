"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language";
import { NavItem } from "./NavItem";
import { HomeIcon } from "./HomeIcon";
import { ControllerIcon } from "./ControllerIcon";
import { ArtIcon } from "./ArtIcon";
import { AiIcon } from "./AiIcon";

function ThemenIcon() {
  // "Lit Glyph" set: 2x2 grid with one cell lit by the golden lamp-node.
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.6" y="3.6" width="7" height="7" rx="1.6" />
      <rect x="13.4" y="3.6" width="7" height="7" rx="1.6" />
      <rect x="3.6" y="13.4" width="7" height="7" rx="1.6" />
      <rect x="12.2" y="12.2" width="9.4" height="9.4" rx="2.4" fill="#facc15" fillOpacity="0.28" stroke="none" />
      <rect x="13.4" y="13.4" width="7" height="7" rx="1.8" fill="#facc15" stroke="none" />
    </svg>
  );
}

/**
 * Sidebar Navigation Component
 *
 * Aligned to the blog's three pillars: AI / Games / Art.
 * 5 items:
 * 1. Home
 * 2. Topics  -> /themen
 * 3. Games   -> /category/games   (gaming culture + game design + engines)
 * 4. Art     -> /category/art
 * 5. AI (DE: KI) -> /category/ai
 *
 * Stacked vertically with 20px gap between each.
 */
export function Navigation() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const navLabels = {
    en: {
      home: "Home",
      themen: "Topics",
      games: "Games",
      art: "Art",
      ai: "AI",
    },
    de: {
      home: "Start",
      themen: "Themen",
      games: "Games",
      art: "Art",
      ai: "KI",
    },
  };

  const labels = navLabels[language];

  const navItems = [
    { href: "/", icon: <HomeIcon />, label: labels.home },
    { href: "/themen", icon: <ThemenIcon />, label: labels.themen },
    { href: "/category/games", icon: <ControllerIcon />, label: labels.games },
    { href: "/category/art", icon: <ArtIcon />, label: labels.art },
    { href: "/category/ai", icon: <AiIcon />, label: labels.ai },
  ];

  return (
    <nav className="flex flex-col items-center gap-5" aria-label="Main navigation">
      {navItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  );
}
