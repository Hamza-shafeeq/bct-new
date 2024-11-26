"use client";

import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    router.push(router.pathname, router.asPath, { locale: lng });
  };

  return (
    <select
      onChange={(e) => changeLanguage(e.target.value)}
      defaultValue={i18n.language}
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
