// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Definición de los idiomas y sus traducciones
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        "Inicio": "Home",
        "Encuentra Eventos": "Find Events",
        "Admin": "Admin",
        "language": "Language",
        "Inglés": "English",
        "Italiano": "Italian",
        "Portugués": "Portuguese",
      },
    },
    es: {
      translation: {
        "Inicio": "Inicio",
        "Encuentra Eventos": "Encuentra Eventos",
        "Admin": "Admin",
        "language": "Idioma",
        "Inglés": "Inglés",
        "Italiano": "Italiano",
        "Portugués": "Portugués",
      },
    },
    it: {
      translation: {
        "Inicio": "Inizio",
        "Encuentra Eventos": "Trova Eventi",
        "Admin": "Amministratore",
        "language": "Lingua",
        "Inglés": "Inglese",
        "Italiano": "Italiano",
        "Portugués": "Portoghese",
      },
    },
    pt: {
      translation: {
        "Inicio": "Início",
        "Encuentra Eventos": "Encontre Eventos",
        "Admin": "Administrador",
        "language": "Idioma",
        "Inglés": "Inglês",
        "Italiano": "Italiano",
        "Portugués": "Português",
      },
    },
  },
  lng: "es", // Idioma predeterminado
  fallbackLng: "es", // Idioma de reserva si no se encuentra la traducción
  interpolation: {
    escapeValue: false, // React ya escapa HTML
  },
});

export default i18n;