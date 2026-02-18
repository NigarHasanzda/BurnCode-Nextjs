"use client";
import React, { useState } from "react";
import Image from "next/image";

const languages = [
  { code: "en", flag: "https://flagcdn.com/gb.svg" },
  { code: "az", flag: "https://flagcdn.com/az.svg" },
  { code: "ru", flag: "https://flagcdn.com/ru.svg" },
];

const LanguageSelector: React.FC = () => {
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="group w-[58px] h-[45px] px-1 rounded-full border-[1.5px] flex items-center justify-center bg-white border-[#635BFF] shadow-sm transition-all duration-300"
      >
        <div className="relative w-6 h-4 rounded-[2px] overflow-hidden">
          <Image src={selected.flag} alt="selected" fill className="object-cover" />
        </div>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 flex flex-col gap-6 w-[58px] bg-white border border-[#635BFF] rounded-[23px]  z-50 py-4 px-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
              className="relative w-6 h-4 rounded-[2px] overflow-hidden mx-auto  transition-transform"
            >
              <Image src={lang.flag} alt={lang.code} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
