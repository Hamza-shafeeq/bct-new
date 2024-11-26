"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  return (
    <select
      value={language}
      onChange={(e) => changeLanguage(e.target.value)}
      className="py-2 px-3 border rounded bg-[#e41e34] border-[0px] text-[#fff]"
    >
      <option value="en">English</option>
      <option value="de">German</option>
      <option value="it">Italian</option>
      <option value="pl">Polish</option>
      <option value="ru">Russian</option>
    </select>
  );
}
