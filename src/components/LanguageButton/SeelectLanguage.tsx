"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { setLanguage as setLanguageApi } from "@/lib/api";

const languages = [
  { code: "en", flag: "https://flagcdn.com/gb.svg" },
  { code: "az", flag: "https://flagcdn.com/az.svg" },
  { code: "ru", flag: "https://flagcdn.com/ru.svg" },


];


interface LanguageSelectorProps {
  currentLang?: string; // optional
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  // initial selection
  useEffect(() => {
    const storedLang = currentLang || localStorage.getItem("lang");
    const urlLang = pathname.split("/").filter(Boolean)[0];
    const langObj =
      languages.find((l) => l.code === storedLang) ||
      languages.find((l) => l.code === urlLang) ||
      languages[0];

    setSelected(langObj);
    setLanguageApi(langObj.code);
    localStorage.setItem("lang", langObj.code);
  }, [pathname, currentLang]);

  // dropdown xaricinə klikdə bağlama
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const changeLanguage = (lang: typeof languages[0]) => {
    setSelected(lang);
    setLanguageApi(lang.code);
    localStorage.setItem("lang", lang.code);
    setOpen(false);

    const segments = pathname.split("/").filter(Boolean);
    if (languages.some((l) => l.code === segments[0])) {
      segments[0] = lang.code;
    } else {
      segments.unshift(lang.code);
    }
    const newPath = "/" + segments.join("/");
    router.push(newPath);

    window.dispatchEvent(new CustomEvent("languageChange", { detail: lang.code }));
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="group w-[58px] h-[45px] px-1 rounded-full border-[1.5px] flex items-center justify-center bg-white border-[#635BFF] shadow-sm"
      >
        <div className="relative w-6 h-4 overflow-hidden rounded-[2px]">
          <img src={selected.flag} alt={selected.code} className="object-cover w-full h-full" />
        </div>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 flex flex-col gap-4 w-[58px] bg-white border border-[#635BFF] rounded-[23px] z-50 py-4 px-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang)}
              className="relative w-6 h-4 overflow-hidden mx-auto transition-transform hover:scale-110"
            >
              <img src={lang.flag} alt={lang.code} className="object-cover w-full h-full" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;