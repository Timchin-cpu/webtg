import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en.json";
import ruTranslations from "./locales/ru.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    ru: { translation: ruTranslations },
  },
  lng: "ru", // Язык по умолчанию
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
