// utilities/i18n.js
'use client';
import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
import React, { createContext } from 'react';  // This is important
import { initReactI18next } from 'react-i18next';

const isBrowser = typeof window !== 'undefined';

const storedLanguage = isBrowser ? localStorage.getItem('language') : 'en';
i18n
  .use(initReactI18next) // Integrate with React
  .init({
    resources: {
      en: {
        translation: {
            "overview": "Overview",
            "transactionHistory": "Transaction History",
            "calculator": "Calculator",
            "faq": "FAQ’s",
            "lastUpdate": "Last update: 45 minutes ago",
            "currentRewardBalance": "Current Reward balance",
            "allTimeProfit": "All time profit",
            "bestPerformer": "Best performer",
            "dailyEstRewards": "Daily est. rewards",
            "currentAmount": "Current amount",
            "apy": "APY",
            "redeemRewards": "Redeem Rewards",
            "summary": "Summary",
            "rewardsEarned": "Rewards earned",
            "currentMonthlyReturns": "Current Monthly returns",
            "expectedDailyReturns": "Expected Daily Returns",
            "expectedWeeklyReturns": "Expected weekly returns",
            "type": "Type",
            "value": "Value",
            "amount": "Amount",
            "time": "Time",
            "status": "Status",
            "actions": "Actions",
            "rewardsNotGuaranteed": "* Rewards are not guaranteed. Potential earnings numbers are estimates only and based upon historical performance. The actual amount earned may vary and will depend on several factors.",
            "frequentlyAskedQuestions": "Frequently Asked Questions",
            "support": "Support",
            "faqIntro": "Need something cleared up? Here are our most frequently asked questions.",

            "current_rewards": "Currently available rewards",
            "percentage": "{{value}}% increase",
            "upgrade": "Upgrade",
            "unstake": "Unstake",

            "your_staked_tokens": "Your staked BlackChain Tokens: ",
            "best_performer": "Best Performer",
            "worst_performer": "Worst Performer",
            "total_profit": "Total Profit",
            "increase_percentage": "{{value}}% (+${amount})",

            "Recommended_Strategies": "Recommended Strategies",

        },
      },
      de: {
        translation: {
            "overview": "Übersicht",
            "transactionHistory": "Transaktionshistorie",
            "calculator": "Rechner",
            "faq": "FAQ",
            "lastUpdate": "Letztes Update: Vor 45 Minuten",
            "currentRewardBalance": "Aktuell verfügbare Rewards",
            "allTimeProfit": "Gesamte Rewards",
            "bestPerformer": "Bester Performer",
            "dailyEstRewards": "Geschätzten täglichen Rewards",
            "currentAmount": "Aktueller Betrag",
            "apy": "APY (Jährliche Rendite in %)",
            "redeemRewards": "Rewards auszahlen",
            "summary": "Zusammenfassung",
            "rewardsEarned": "Verdiente Rewards",
            "currentMonthlyReturns": "Aktuelle monatliche Rendite",
            "expectedDailyReturns": "Erwartete tägliche Rendite",
            "expectedWeeklyReturns": "Erwartete wöchentliche Rendite",
            "type": "Typ",
            "value": "Wert",
            "amount": "Betrag",
            "time": "Zeit",
            "status": "Status",
            "actions": "Aktionen",
            "rewardsNotGuaranteed": "Belohnungen sind nicht garantiert. Potenzielle Ertragszahlen sind lediglich Schätzungen, die auf historischen Leistungen basieren. Der tatsächlich erzielte Betrag kann variieren und hängt von verschiedenen Faktoren ab.",
            "frequentlyAskedQuestions": "Häufig gestellte Fragen",
            "support": "Kundenservice",
            "faqIntro": "Etwas Unklar? Hier sind unsere häufigsten Fragen.",

            "current_rewards": "Aktuell verfügbare Rewards",
            "percentage": "{{value}}% Zuwachs",
            "upgrade": "Upgrade",
            "unstake": "Unstake",

            "your_staked_tokens": "Deine gestaketen BlackChain Token: ",
            "best_performer": "Bester Performer",
            "worst_performer": "Worst Performer",
            "total_profit": "Gesamtgewinn",
            "increase_percentage": "{{value}}% (+${amount})",

            "Recommended_Strategies": "Recommended Strategies in de",
        },
      },
      it: {
        translation: {
            "overview": "Sommario",
            "transactionHistory": "Cronologia delle transazioni",
            "calculator": "Calcolatore",
            "faq": "Domande frequenti (FAQ)",
            "lastUpdate": "Ultimo aggiornamento: 45 minuti fa",
            "currentRewardBalance": "Rewards attualmente disponibili",
            "allTimeProfit": "Rewards totali",
            "bestPerformer": "Miglior Performer",
            "dailyEstRewards": "Rewards giornalieri stimati",
            "currentAmount": "Importo attuale",
            "apy": "APY",
            "redeemRewards": "Ritirare Rewards",
            "summary": "Riepilogo",
            "rewardsEarned": "Rewards guadagnati",
            "currentMonthlyReturns": "Rendimento mensile attuale",
            "expectedDailyReturns": "Rendimento giornaliero previsto",
            "expectedWeeklyReturns": "Rendimento settimanale previsto",
            "type": "Tipo",
            "value": "Valore",
            "amount": "Importo",
            "time": "Tempo",
            "status": "Stato",
            "actions": "Azioni",
            "rewardsNotGuaranteed": "Le ricompense non sono garantite. I potenziali guadagni sono solo stime basate su performance storiche. L’importo effettivamente ottenuto può variare e dipende da diversi fattori.",
            "frequentlyAskedQuestions": "Domande frequenti",
            "support": "Servizio clienti",
            "faqIntro": "Qualcosa non è chiaro? Ecco le nostre domande più frequenti."
          }
      },
      pl: {
        translation: {
            "overview": "Podsumowanie",
            "transactionHistory": "Historia transakcji",
            "calculator": "Kalkulator",
            "faq": "Najczęściej zadawane pytania (FAQ)",
            "lastUpdate": "Ostatnia aktualizacja: 45 minut temu",
            "currentRewardBalance": "Aktualnie dostępne Rewards",
            "allTimeProfit": "Łączne Rewards",
            "bestPerformer": "Najlepszy Performer",
            "dailyEstRewards": "Szacowane codzienne Rewards",
            "currentAmount": "Aktualna kwota",
            "apy": "APY",
            "redeemRewards": "Wypłacić Rewards",
            "summary": "Podsumowanie",
            "rewardsEarned": "Zarobione Rewards",
            "currentMonthlyReturns": "Aktualny miesięczny zwrot",
            "expectedDailyReturns": "Oczekiwany dzienny zwrot",
            "expectedWeeklyReturns": "Oczekiwany tygodniowy zwrot",
            "type": "Typ",
            "value": "Wartość",
            "amount": "Kwota",
            "time": "Czas",
            "status": "Status",
            "actions": "Akcje",
            "rewardsNotGuaranteed": "Nagrody nie są gwarantowane. Potencjalne zyski to jedynie szacunki oparte na wynikach historycznych. Rzeczywista uzyskana kwota może się różnić i zależy od różnych czynników.",
            "frequentlyAskedQuestions": "Najczęściej zadawane pytania",
            "support": "Obsługa klienta",
            "faqIntro": "Coś niejasne? Oto nasze najczęściej zadawane pytania."
          }

      },
      ru: {
        translation: {
            "overview": "Сводка",
            "transactionHistory": "История транзакций",
            "calculator": "Калькулятор",
            "faq": "Часто задаваемые вопросы (ЧаВо)",
            "lastUpdate": "Последнее обновление: 45 минут назад",
            "currentRewardBalance": "Текущие доступные Rewards",
            "allTimeProfit": "Общие Rewards",
            "bestPerformer": "Лучший Performer",
            "dailyEstRewards": "Предполагаемые ежедневные Rewards",
            "currentAmount": "Текущая сумма",
            "apy": "APY",
            "redeemRewards": "Выплатить Rewards",
            "summary": "Сводка",
            "rewardsEarned": "Заработанные Rewards",
            "currentMonthlyReturns": "Текущая ежемесячная доходность",
            "expectedDailyReturns": "Ожидаемая ежедневная доходность",
            "expectedWeeklyReturns": "Ожидаемая еженедельная доходность",
            "type": "Тип",
            "value": "Значение",
            "amount": "Сумма",
            "time": "Время",
            "status": "Статус",
            "actions": "Действия",
            "rewardsNotGuaranteed": "Награды не гарантированы. Потенциальные доходы являются лишь оценками, основанными на прошлых результатах. Фактический полученный доход может варьироваться и зависит от различных факторов.",
            "frequentlyAskedQuestions": "Часто задаваемые вопросы",
            "support": "Обслуживание клиентов",
            "faqIntro": "Что-то непонятно? Вот наши самые частые вопросы."
          }

      },
    },
    lng: storedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values to prevent XSS
    },
  });

export default i18n;

// src/i18n.js
// "use client";
// import React, { createContext } from "react";
// import i18n from "i18next";
// import { initReactI18next } from "react-i18next";
// import Backend from "i18next-http-backend";
// import LanguageDetector from "i18next-browser-languagedetector";
// // import jj from '../../public/'

// i18n
//   .use(Backend) // Load translation files from the backend or public folder
//   .use(LanguageDetector) // Detect user's language
//   .use(initReactI18next) // Pass i18n instance to react-i18next
//   .init({
//     fallbackLng: "en", // Set the fallback language in case the user’s language isn’t available
//     debug: true,
//     interpolation: {
//       escapeValue: false, // React already escapes XSS
//     },
//     react: {
//       useSuspense: false, // To avoid issues in SSR
//     },
//     backend: {
//       // Where to fetch the translation files
//       loadPath: "/locales/{{lng}}/translation.json", // Path to your translation files
//     },
//   });

// export default i18n;
