import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vi from "./locales/vi";
import en from "./locales/en";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "vi",
  debug: true,
  resources: {
    en,
    vi
  }
});

export default i18n;
