"use client";

import { useLanguage } from "@/lib/language";

/**
 * "Play the game" Side-Nav CTA
 *
 * Pinned to the bottom of the sidebar, always visible. Links out to
 * theneverendingprompt.xyz. Styled to match the sidebar's visual identity:
 * white-on-gradient, monospace uppercase label, white/10 surface, subtle
 * white border, 200ms hover — consistent with the NavItem components.
 */
export function PlayGameLink() {
  const { language } = useLanguage();
  const label = language === "de" ? "Spiel spielen" : "Play the game";

  return (
    <a
      href="https://theneverendingprompt.xyz"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}: theneverendingprompt.xyz`}
      className="
        group
        flex
        w-full
        flex-col
        items-center
        gap-1.5
        rounded-md
        border
        border-white/25
        bg-white/10
        px-3
        py-3
        text-center
        transition-all
        duration-200
        ease
        hover:border-white/40
        hover:bg-white/20
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/50
        focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent
      "
    >
      {/* Play mark */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-200 ease group-hover:scale-110"
      >
        <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.75" strokeWidth="1.5" />
        <path d="M10 8.3 16 12l-6 3.7V8.3Z" fill="white" />
      </svg>

      <span className="text-xs-custom font-mono uppercase tracking-wide leading-tight text-white">
        {label}
      </span>
      <span className="text-[9px] font-mono lowercase leading-tight text-white/60 break-all">
        theneverendingprompt.xyz
      </span>
    </a>
  );
}
