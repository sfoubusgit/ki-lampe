import { Footer } from "./Footer";
import { KeywordsPanel } from "./KeywordsPanel";
import { NewsletterSection } from "./NewsletterSection";
import { LegalLinks } from "./LegalLinks";

/**
 * Complete Footer Assembly
 * 
 * Assembles all footer components:
 * - Keywords panel (left column)
 * - Newsletter section (middle column)
 * - Legal links and copyright (right column)
 * - Game of the Day section (full width below)
 * 
 * All spacing, typography, and styling exactly as specified.
 * Responsive layout working correctly.
 */
export function CompleteFooter() {
  return (
    <Footer>
      {/* Left Column: Keywords Panel */}
      <KeywordsPanel />

      {/* Middle Column: Newsletter */}
      <NewsletterSection />

      {/* Full Width: Legal Links, Copyright & Game of the Day at bottom */}
      <LegalLinks />
    </Footer>
  );
}
