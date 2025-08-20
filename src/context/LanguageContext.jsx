import { createContext, useContext, useState, useEffect } from "react";
import translations from "../translations/translations";

// 1. Crear contexto
const LanguageContext = createContext();

// 2. Hook para consumir contexto
export const useLanguage = () => useContext(LanguageContext);

// 3. Provider
export const LanguageProvider = ({ children }) => {
  // ✅ idioma inicial: lo carga desde localStorage o arranca en "es"
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "es"
  );

  // ✅ guarda en localStorage cada vez que cambia el idioma
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // ✅ alternar idioma
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  return (
    <LanguageContext.Provider
      value={{ language, toggleLanguage, t: translations[language] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};