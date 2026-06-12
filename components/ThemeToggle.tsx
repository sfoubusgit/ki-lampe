"use client";

import { useTheme } from "@/lib/theme";
import { useEffect, useState } from "react";

/**
 * Simple theme toggle component for testing
 * This will be replaced with the proper sidebar dark mode toggle in Phase 2
 */
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="px-4 py-2 rounded border border-divider bg-background text-foreground"
        aria-label="Toggle dark mode"
        disabled
      >
        ...
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded border border-divider bg-background text-foreground hover:bg-accent/5 transition-colors"
      aria-label="Toggle dark mode"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}
