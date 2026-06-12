import { Footer } from "./Footer";
import { KeywordsPanel } from "./KeywordsPanel";
import { NewsletterSection } from "./NewsletterSection";
import { LegalLinks } from "./LegalLinks";
import { RunpodBadge } from "./RunpodBadge";

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

      {/* Full Width: Powered by RunPod referral badge */}
      <div className="col-span-full flex justify-center pt-2">
        <RunpodBadge />
      </div>
    </Footer>
  );
}
