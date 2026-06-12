"use client";

import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/language";
import { NavItem } from "./NavItem";
import { HomeIcon } from "./HomeIcon";
import { ClockIcon } from "./ClockIcon";
import { ReviewsIcon } from "./ReviewsIcon";
import { ControllerIcon } from "./ControllerIcon";
import { PcIcon } from "./PcIcon";
import { VideosIcon } from "./VideosIcon";
import { MoreIcon } from "./MoreIcon";

/**
 * Sidebar Navigation Component
 * 
 * 7 navigation items:
 * 1. Home (filled home icon)
 * 2. News (filled clock icon)
 * 3. Reviews (filled square icon)
 * 4. Consoles (filled controller icon)
 * 5. PC (filled PC icon)
 * 6. Videos (filled play button icon)
 * 7. More (filled three dots icon)
 * 
 * Stacked vertically with 20px gap between each
 */
export function Navigation() {
  const pathname = usePathname();
  const { language } = useLanguage();

  const navLabels = {
    en: {
      home: "Home",
      news: "News",
      reviews: "Reviews",
      consoles: "Consoles",
      pc: "PC",
      videos: "Videos",
      more: "More",
    },
    de: {
      home: "Start",
      news: "News",
      reviews: "Reviews",
      consoles: "Konsolen",
      pc: "PC",
      videos: "Videos",
      more: "Mehr",
    },
  };

  const labels = navLabels[language];

  const navItems = [
    { href: "/", icon: <HomeIcon />, label: labels.home },
    { href: "/news", icon: <ClockIcon />, label: labels.news },
    { href: "/reviews", icon: <ReviewsIcon />, label: labels.reviews },
    { href: "/consoles", icon: <ControllerIcon />, label: labels.consoles },
    { href: "/pc", icon: <PcIcon />, label: labels.pc },
    { href: "/videos", icon: <VideosIcon />, label: labels.videos },
    { href: "/more", icon: <MoreIcon />, label: labels.more },
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
