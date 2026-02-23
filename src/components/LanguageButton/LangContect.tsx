"use client";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface LangContextType {
  lang: string;
  setLang: (lang: string) => void;
}

const LangContext = createContext<LangContextType>({
  lang: "az",
  setLang: () => {},
});

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<string>("az");

  // initial lang: localStorage varsa onu al
  useEffect(() => {
    const stored = localStorage.getItem("lang");
    if (stored) setLangState(stored);
  }, []);

  const setLang = (newLang: string) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);

    // custom event tetikle BlogPage üçün
    window.dispatchEvent(new Event("languageChange"));
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);