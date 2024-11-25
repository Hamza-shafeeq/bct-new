'use client'; 
import React, { useState, useEffect } from 'react';
import i18n from '../utilities/i18n'; // Adjust path as needed

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState(null); // Language will be null initially
  const [isMounted, setIsMounted] = useState(false); // To track if component is mounted

  useEffect(() => {
    // We will read the language from localStorage only on the client
    const storedLanguage = localStorage.getItem('language') || 'en'; // Default to 'en'
    i18n.changeLanguage(storedLanguage); // Change language in i18n
    setLanguage(storedLanguage); // Set language state after mounting
    setIsMounted(true); // Mark as mounted on the client-side
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Change the language
    localStorage.setItem('language', lng); // Save it to localStorage
    setLanguage(lng); // Update the state
  };

  if (!isMounted) {
    return null; // Prevent rendering until the component is mounted (avoids hydration mismatch)
  }

  return (
    <select onChange={(e) => changeLanguage(e.target.value)} value={language}>
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="it">Italiano</option>
      <option value="pl">Polski</option>
      <option value="ru">Русский</option>
    </select>
  );
};

export default LanguageSwitcher;
