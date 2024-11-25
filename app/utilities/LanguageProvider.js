// components/LanguageProvider.js
'use client'; // Important to mark this as a client component
import { appWithTranslation } from 'next-i18next';

function LanguageProvider({ children }) {
  return <>{children}</>;
}

export default appWithTranslation(LanguageProvider);
