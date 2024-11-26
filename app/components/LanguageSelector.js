"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="en">English</option>
      <option value="de">German</option>
      <option value="it">Italian</option>
      <option value="pl">Polish</option>
      <option value="ru">Russian</option>
    </select>
  );
}
