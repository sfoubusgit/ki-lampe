import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LanguageProvider } from "@/lib/language";
import { Sidebar } from "@/components/Sidebar";
import { MobileMenu } from "@/components/MobileMenu";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KI-LAMPE",
  description: "A minimal, calm blog for ideas and thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="m-0 p-0">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans m-0 p-0`}>
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="
            sr-only
            focus:not-sr-only
            focus:absolute
            focus:top-4
            focus:left-4
            focus:z-50
            focus:px-4
            focus:py-2
            focus:bg-accent
            focus:text-white
            focus:rounded-sm
            focus:font-semibold
            focus:outline-none
            focus:ring-2
            focus:ring-accent
            focus:ring-offset-2
          "
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <Sidebar />
            <MobileMenu />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
