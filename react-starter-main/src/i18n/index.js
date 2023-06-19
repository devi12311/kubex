import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import alTranslations from './al';
import enTranslations from './en';

if (localStorage.getItem('lang') !== ('al' || 'en')) {
  localStorage.setItem('lang', 'en');
}

const language = localStorage.getItem('lang');

const resources = {
  en: {
    translation: enTranslations
  },
  al: {
    translation: alTranslations
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: language,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
