import path from "path";
import fs from "fs";

const IMAGE_EXTENSIONS = [".webp", ".jpg", ".jpeg", ".png", ".svg"];

export function getHeroImage(slug: string) {
  const imagesDir = path.join(process.cwd(), "public/images");
  
  // Try to find image with slug matching various patterns
  const patterns = [
    slug, // exact match
    slug.replace(/_/g, "-"), // replace underscores with dashes
    slug.replace(/-/g, "_"), // replace dashes with underscores
  ];

  for (const pattern of patterns) {
    for (const ext of IMAGE_EXTENSIONS) {
      const filename = `${pattern}${ext}`;
      const filePath = path.join(imagesDir, filename);
      
      if (fs.existsSync(filePath)) {
        return `/images/${filename}`;
      }
    }
  }

  // Special cases for known mismatches
  const specialCases: Record<string, string> = {
    "a1111_tutorial_article": "/images/stable_diffusion_a1111_tutorial_hero.jpg",
    "star-wars-und-ki": "/images/star-wars-ki-artikel-foto.webp",
  };

  if (specialCases[slug]) {
    const specialPath = path.join(process.cwd(), "public", specialCases[slug].replace(/^\//, ""));
    if (fs.existsSync(specialPath)) {
      return specialCases[slug];
    }
  }

  return null; // Return null, let the page component handle the placeholder
}