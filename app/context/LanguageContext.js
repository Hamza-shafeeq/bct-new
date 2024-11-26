"use client";

import { createContext, useState, useContext, useEffect } from "react";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const data = await import(`../locales/${language}.json`);
        setTranslations(data);
      } catch (error) {
        console.error(`Error loading translations for ${language}:`, error);
        // Fallback to English if there's an error
        const fallbackData = await import("../locales/en.json");
        setTranslations(fallbackData);
      }
    };
    loadTranslations();
  }, [language]);

  // Save selected language to localStorage
  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
