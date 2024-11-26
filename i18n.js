// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';
// import hh from "./public/"

i18n
  .use(HttpBackend) // To load translations
  .use(LanguageDetector) // To detect user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'it', 'pl', 'ru'], // Supported languages
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    debug: process.env.NODE_ENV === 'development',
    backend: {
        loadPath: '/locales/{{lng}}/common.json' // Translation files path
    },
  });

export default i18n;
