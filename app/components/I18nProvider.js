"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { appWithTranslation } from 'next-i18next';

function I18nProvider({ children }) {
  return children; // Wrap your children with i18next logic here if needed
}

export default appWithTranslation(I18nProvider);
