import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

type ArticleCardSize = "primary" | "secondary" | "tertiary";

interface ArticleCardProps {
  href: string;
  title: string;
  image?: string;
  metadata?: ReactNode;
  size?: ArticleCardSize;
}

/**
 * Article Card Component - Flexible Media + Text Layout
 *
 * Goals:
 * - Responsive readability (titles scale, cards do not collapse)
 * - Support rich media and variable text lengths
 * - Clear visual hierarchy across sizes
 */
export function ArticleCard({
  href,
  title,
  image,
  metadata,
  size = "secondary",
}: ArticleCardProps) {
  const fallbackGradient =
    "bg-gradient-to-br from-accent/30 via-accent/15 to-background/80";

  const hasValidImage =
    image &&
    typeof image === "string" &&
    image.trim() !== "" &&
    image !== "undefined" &&
    (image.startsWith("/") ||
      image.startsWith("http://") ||
      image.startsWith("https://"));

  const sizeClasses = {
    primary: {
      media: "aspect-[16/9]",
      padding: "p-4 tablet:p-5",
      title: "text-[clamp(1.2rem,2.8vw,2rem)]",
      arrow: "text-xs-custom",
    },
    secondary: {
      media: "aspect-[16/9]",
      padding: "p-4 tablet:p-5",
      title: "text-[clamp(1.05rem,2.2vw,1.6rem)]",
      arrow: "text-xs-custom",
    },
    tertiary: {
      media: "aspect-[16/9]",
      padding: "p-4 tablet:p-5",
      title: "text-[clamp(1rem,2vw,1.4rem)]",
      arrow: "text-xs-custom",
    },
  };

  const sizeConfig = sizeClasses[size];

  return (
    <Link
      href={href}
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-sm
        border
        border-[#0f0f0f]
        dark:border-[#e8e8e8]
        bg-background/80
        transition-all
        duration-200
        ease
        article-card-frame
        hover:border-accent/40
        hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)]
        focus:outline-none
        focus:ring-2
        focus:ring-accent/30
        focus:ring-offset-2
        focus:ring-offset-background
      "
      aria-label={`Read article: ${title}`}
    >
      <div className={`relative w-full ${sizeConfig.media}`}>
        {hasValidImage ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 960px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className={`absolute inset-0 ${fallbackGradient}`} />
        )}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/10
            via-transparent
            to-black/20
            opacity-0
            transition-opacity
            duration-200
            group-hover:opacity-100
          "
        />
      </div>

      <div
        className={`
          flex
          flex-1
          flex-col
          gap-3
          ${sizeConfig.padding}
          bg-[color:var(--color-surface)]
          border-t
          border-foreground/10
        `}
      >
        <div className="flex items-start justify-between gap-3">
          <h3
            className={`
              ${sizeConfig.title}
              font-semibold
              text-foreground
              leading-tight
              tracking-tight
              transition-colors
              duration-200
              group-hover:text-accent
              flex-1
              line-clamp-2
            `}
          >
            {title}
          </h3>
          <span
            className={`
              ${sizeConfig.arrow}
              text-foreground/50
              transition-colors
              duration-200
              group-hover:text-accent
              flex-shrink-0
              mt-1
            `}
          >
            -&gt;
          </span>
        </div>

        {metadata && (
          <div className="mt-auto">
            <div className="article-card-metadata">{metadata}</div>
          </div>
        )}
      </div>
    </Link>
  );
}
