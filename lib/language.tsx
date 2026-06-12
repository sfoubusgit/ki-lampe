"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (language: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved language preference or default to English
    const savedLanguage = localStorage.getItem("language") as Language | null;
    const browserLanguage = navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
    
    const initialLanguage = savedLanguage || browserLanguage;
    setLanguageState(initialLanguage);
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", newLanguage);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "de" : "en";
    setLanguage(newLanguage);
  };

  // Always provide context value, even before mounting
  const contextValue: LanguageContextType = {
    language: mounted ? language : "en",
    toggleLanguage,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
