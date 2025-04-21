import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './translations/en';
import ur from './translations/ur';

const resources = {
  en: {
    translation: en,
  },
  ur: {
    translation: ur,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 