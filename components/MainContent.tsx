/**
 * Main Content Wrapper Component
 * Handles responsive padding and max-width constraints
 * - Horizontal padding: 24px mobile, 32px tablet/desktop
 * - Max width: 1200px, centered
 * - Left margin: 128px on desktop (to account for sidebar)
 * - Top padding: Zero (content starts immediately)
 */
export function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen text-foreground" id="main-content">
      <div className="px-6 tablet:px-8 desktop:ml-40 desktop:px-8">
        <div className="max-w-[1600px] mx-auto desktop:pt-12">
          {children}
        </div>
      </div>
    </main>
  );
}
