import { createContext, useContext, useState } from "react";
import translations from "../translations/translations";

// 1. Crear contexto
const LanguageContext = createContext();

// 2. Hook para consumir contexto
export const useLanguage = () => useContext(LanguageContext);

// 3. Provider
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("es"); // idioma inicial

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