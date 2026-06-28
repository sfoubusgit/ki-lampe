import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_ID = "G-FZ6K9TC66R";
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

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-fraunces",
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
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${fraunces.variable} font-sans m-0 p-0`}>
        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
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
