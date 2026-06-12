"use client";

/**
 * Game of the Day Section Component
 * 
 * Specifications:
 * - Border top: 1px divider color
 * - Margin top: 32px
 * - Padding top: 24px
 * - Text format: "GOFD : [GAME NAME]"
 * - Monospace, 10px font size, uppercase, wide letter spacing
 * - "GOFD": Subtle color (50% opacity)
 * - Colon: 20% opacity foreground
 * - Game name: Subtle color (50% opacity)
 * - 8px gap between elements
 * - Inline flex, horizontal layout
 * - Game name should rotate daily
 */
export function GameOfTheDay() {
  // List of games - can be customized
  const games = [
    "THE ELDER SCROLLS V: SKYRIM",
    "THE WITCHER 3: WILD HUNT",
    "RED DEAD REDEMPTION 2",
    "CYBERPUNK 2077",
    "BALDUR'S GATE 3",
    "ELDEN RING",
    "GOD OF WAR",
    "HORIZON ZERO DAWN",
    "ASSASSIN'S CREED VALHALLA",
    "GHOST OF TSUSHIMA",
    "FINAL FANTASY XVI",
    "SPIDER-MAN",
    "DEATH STRANDING",
    "CONTROL",
    "METRO EXODUS",
  ];

  // Get the day of the year (0-364) to rotate games daily
  const getDayOfYear = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Select game based on day of year
  const dayOfYear = getDayOfYear();
  const selectedGame = games[dayOfYear % games.length];

  return (
    <div className="
      relative
      inline-flex
      items-center
      gap-2
      text-xs-custom
      font-mono
      uppercase
      tracking-wide
      border
      border-foreground/15
      rounded-sm
      px-2
      py-1
      gofd-glow-animation
    ">
      {/* Walking golden star around the border */}
      <div className="absolute inset-0 gofd-walker">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className="gofd-star"
          fill="currentColor"
        >
          {/* 5-pointed star */}
          <path d="M5 0 L6 3.5 L9.5 3.5 L6.75 5.75 L8 9 L5 7 L2 9 L3.25 5.75 L0.5 3.5 L4 3.5 Z" />
        </svg>
      </div>

      {/* "GOFD" - Golden color */}
      <span className="text-yellow-500 dark:text-yellow-400">GOFD</span>
      
      {/* Colon - Golden color with reduced opacity */}
      <span className="text-yellow-500/60 dark:text-yellow-400/60">:</span>
      
      {/* Game name - Golden color */}
      <span className="text-yellow-500 dark:text-yellow-400">{selectedGame}</span>
    </div>
  );
}
