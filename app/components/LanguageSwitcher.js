'use client';

import React from "react";
import i18n from "../../i18n";

const LanguageSwitcher = () => {
  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="p-4">
      <select
        onChange={(e) => handleChangeLanguage(e.target.value)}
        defaultValue={i18n.language}
        className="p-2 border rounded"
      >
        <option value="en">English</option>
        <option value="it">Italian</option>
        <option value="pl">Polish</option>
        <option value="ru">Russian</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
