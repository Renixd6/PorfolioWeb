import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      greeting: "Hello",
      dropdown_title: "Language",
    }
  },
  es: {
    translation: {
      greeting: "Hola",
      dropdown_title: "Idioma"
    }
  }
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
