"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language";
import { NavItem } from "./NavItem";
import { HomeIcon } from "./HomeIcon";
import { GameDesignIcon } from "./GameDesignIcon";
import { ArtIcon } from "./ArtIcon";
import { AiIcon } from "./AiIcon";

function ThemenIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

/**
 * Sidebar Navigation Component
 *
 * Aligned to the blog's pillars: Gaming / Game Design / Art / AI.
 * 5 items:
 * 1. Home
 * 2. Games        -> /category/games
 * 3. Game Design  -> /category/game-design
 * 4. Art          -> /category/art
 * 5. AI (DE: KI)  -> /category/ai
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
      gameDesign: "Game Design",
      art: "Art",
      ai: "AI",
    },
    de: {
      home: "Start",
      themen: "Themen",
      games: "Games",
      gameDesign: "Game Design",
      art: "Art",
      ai: "KI",
    },
  };

  const labels = navLabels[language];

  const navItems = [
    { href: "/", icon: <HomeIcon />, label: labels.home },
    { href: "/themen", icon: <ThemenIcon />, label: labels.themen },
    { href: "/category/game-design", icon: <GameDesignIcon />, label: labels.gameDesign },
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
