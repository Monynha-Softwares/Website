import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files (will be created next)
import enTranslation from '../public/locales/en/translation.json';
import ptBRTranslation from '../public/locales/pt-BR/translation.json';
import esTranslation from '../public/locales/es/translation.json';
import frTranslation from '../public/locales/fr/translation.json';

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      'pt-BR': {
        translation: ptBRTranslation,
      },
      es: {
        translation: esTranslation,
      },
      fr: {
        translation: frTranslation,
      },
    },
    fallbackLng: 'en', // Fallback language if user language is not available
    debug: import.meta.env.DEV, // Enable debug mode in development
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    detection: {
      order: ['navigator', 'localStorage', 'cookie', 'sessionStorage', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage'],
    },
  });

export default i18n;