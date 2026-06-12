"use client";

import { ReactNode } from "react";
import { useLanguage } from "@/lib/language";

/**
 * Unified Hierarchical Article Grid Layout Component
 * 
 * Multi-level hierarchy in a single cohesive grid:
 * - Primary: Large articles, up to half-width (span 2 columns on desktop 4-column grid)
 * - Secondary: Medium articles (span 2 columns on desktop)
 * - Tertiary: Compact articles (span 1 column on desktop)
 * 
 * Layout:
 * - Mobile: Single column, all articles stacked
 * - Tablet: 2 column grid, primary spans 2 columns (full-width)
 * - Desktop: 4 column grid, primary spans 2 columns (half-width), secondary spans 2, tertiary spans 1
 */
interface ArticleGridItem {
  node: ReactNode;
  hierarchy: "primary" | "secondary" | "tertiary";
  isAd?: boolean;
}

interface ArticleGridProps {
  items: ArticleGridItem[];
  hideLabels?: boolean;
  hideGridWrapper?: boolean;
}

export function ArticleGrid({ items, hideLabels = false, hideGridWrapper = false }: ArticleGridProps) {
  const { language } = useLanguage();
  let hasPrimaryLabel = false;
  let hasSecondaryLabel = false;
  let hasTertiaryLabel = false;
  let primaryArticleCount = 0;

  const labels = {
    en: {
      primary: "Latest Highlights",
      secondary: "More Recent Stories",
      tertiary: "Archive & Discover",
    },
    de: {
      primary: "Neueste Highlights",
      secondary: "Weitere Geschichten",
      tertiary: "Archiv & Entdecken",
    },
  };

  const currentLabels = labels[language];

  const gridContent = (
    <>
      {items.flatMap((item, index) => {
        const elements: ReactNode[] = [];

        if (!hideLabels) {
          if (item.hierarchy === "primary" && !hasPrimaryLabel && !item.isAd) {
            hasPrimaryLabel = true;
            elements.push(
              <div key="section-primary-label" className="col-span-full">
                <div className="text-sm-custom font-mono uppercase tracking-wide text-foreground/50 mb-2">
                  {currentLabels.primary}
                </div>
              </div>
            );
          }

          if (item.hierarchy === "secondary" && !hasSecondaryLabel) {
            hasSecondaryLabel = true;
            elements.push(
              <div key="section-secondary-label" className="col-span-full mt-2">
                <div className="text-sm-custom font-mono uppercase tracking-wide text-foreground/50 mb-2">
                  {currentLabels.secondary}
                </div>
              </div>
            );
          }

          if (item.hierarchy === "tertiary" && !hasTertiaryLabel) {
            hasTertiaryLabel = true;
            elements.push(
              <div key="section-tertiary-label" className="col-span-full mt-2">
                <div className="text-sm-custom font-mono uppercase tracking-wide text-foreground/50 mb-2">
                  {currentLabels.tertiary}
                </div>
              </div>
            );
          }
        }

        // Track primary articles (excluding AD) to identify first two
        if (item.hierarchy === "primary" && !item.isAd) {
          primaryArticleCount++;
        }
        const isFirstTwoPrimary = item.hierarchy === "primary" && !item.isAd && primaryArticleCount <= 2;
        
        elements.push(
          <div
            key={`item-${index}`}
            className={`
              ${item.isAd
                ? "col-span-full min-[640px]:col-span-2 min-[960px]:col-span-3 desktop:col-span-2"
                : item.hierarchy === "primary"
                  ? "col-span-full min-[640px]:col-span-2"
                  : ""}
            `}
          >
            {item.node}
          </div>
        );

        return elements;
      })}
    </>
  );

  if (hideGridWrapper) {
    return gridContent;
  }

  return (
    <div
      className="
      grid
      grid-cols-1
      min-[640px]:grid-cols-2
      min-[960px]:grid-cols-3
      desktop:grid-cols-4
      gap-3
      min-[640px]:gap-4
      desktop:gap-5
      [grid-auto-flow:dense]
    "
    >
      {gridContent}
    </div>
  );
}
