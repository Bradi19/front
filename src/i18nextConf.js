import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { TRANSLATIONS_EN } from "./translations/en/translations";
import { TRANSLATIONS_RU } from "./translations/ru/translations";
import { TRANSLATIONS_UA } from "./translations/ua/translations";
 
const fallbackLng = ['ru'];
const availableLanguages = ['en', 'ru', 'ua'];

i18n
  .use(Backend) 
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass the i18n instance to react-i18next.
  .init({
    fallbackLng, // fallback language is english.

    detection: {
      checkWhitelist: true, // options for language detection
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false, // no need for react. it escapes by default
    },
    resources: {
      en: {
        translation: TRANSLATIONS_EN
      },
      ru: {
        translation: TRANSLATIONS_RU
      },
      ua: {
        translation: TRANSLATIONS_UA
      }
    }
  });
  i18n.changeLanguage("ua");
export default i18n;