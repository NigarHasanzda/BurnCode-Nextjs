// components/LanguageSelector.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

import { useRouter, usePathname } from "next/navigation";
import ClientOnly from "../ClientOnly/ClientOnly";

const languages = [
  { code: "en", flag: "https://flagcdn.com/gb.svg" },
  { code: "az", flag: "https://flagcdn.com/az.svg" },
  { code: "ru", flag: "https://flagcdn.com/ru.svg" },
];

interface Props {
  currentLang: string;
}

const LanguageSelector: React.FC<Props> = ({ currentLang }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selected, setSelected] = useState(languages.find(l => l.code === currentLang));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // URL / localStorage-dən seçilmiş dili clientdə update et
    const segments = pathname.split("/").filter(Boolean);
    const urlLang = segments.length && languages.some(l => l.code === segments[0]) ? segments[0] : null;
    if (urlLang && urlLang !== selected?.code) {
      const langObj = languages.find(l => l.code === urlLang);
      if (langObj) setSelected(langObj);
    } else {
      const storedLang = localStorage.getItem("lang");
      if (storedLang && storedLang !== selected?.code) {
        const langObj = languages.find(l => l.code === storedLang);
        if (langObj) setSelected(langObj);
      }
    }
  }, [pathname]);

  const changeLanguage = (lang: typeof languages[0]) => {
    setSelected(lang);
    localStorage.setItem("lang", lang.code);

    const segments = pathname.split("/").filter(Boolean);
    if (languages.some(l => l.code === segments[0])) {
      segments[0] = lang.code;
    } else {
      segments.unshift(lang.code);
    }

    router.push("/" + segments.join("/"));
    setOpen(false);
  };

  return (
    <ClientOnly>
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="group w-[58px] h-[45px] px-1 rounded-full border-[1.5px] flex items-center justify-center bg-white border-[#635BFF] shadow-sm transition-all duration-300"
        >
          <div className="relative w-6 h-4 rounded-[2px] overflow-hidden">
            <Image src={selected?.flag!} alt="selected" fill className="object-cover" />
          </div>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 flex flex-col gap-6 w-[58px] bg-white border border-[#635BFF] rounded-[23px] z-50 py-4 px-2">
            {languages.map(lang => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                className="relative w-6 h-4 rounded-[2px] overflow-hidden mx-auto transition-transform"
              >
                <Image src={lang.flag} alt={lang.code} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>
    </ClientOnly>
  );
};

export default LanguageSelector;
