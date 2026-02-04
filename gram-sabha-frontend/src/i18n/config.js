// i18n configuration for GRAM-SABHA
// Bilingual support: English + Hindi

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './translations/en.json';
import hiTranslations from './translations/hi.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations }
    },
    lng: localStorage.getItem('language') || 'en', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

// Save language preference
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
  document.documentElement.lang = lng;
});

export default i18n;
