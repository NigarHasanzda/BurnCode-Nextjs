"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import PrimaryButton from "../Button/Button";
import Sidebar from "../Sidebar/SideBar";
import LanguageSelector from "../LanguageButton/SeelectLanguage";

// Lokallaşdırma faylları
import az from "@/locales/az.json";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

interface HeaderProps {
  currentLang: string;
}

const Header: React.FC<HeaderProps> = ({ currentLang }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Cari dilə uyğun tərcüməni seçirik
  const translations: any = { az, en, ru };
  const t = translations[currentLang]?.header || en.header;

  // Navigasiya linklərini tərcümə obyektindən alırıq
  const navLinks = [
    { name: t.nav.home, path: "/" },
    { name: t.nav.services, path: "/services" },
    { name: t.nav.portfolio, path: "/portfolio/1" },
    { name: t.nav.blog, path: "/blog/1" },
    { name: t.nav.contact, path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F8FD]">
      <div className="lg:max-w-[74%] w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-16 h-[80px] md:h-[120px]">
        
        {/* Logo */}
        <Link href={`/${currentLang}`} className="logo flex items-center text-[28px] sm:text-[35px] lg:text-[41px]">
           <h1 className="Burncode_Logo">burn<span>c</span>ode</h1>
        </Link>

        {/* Navigation - Dinamik adlarla */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={`/${currentLang}${link.path}`}
              className="text-[16px] text-[#0D0D0D] font-bold hover:text-[#635BFF] transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Sağ tərəf */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon sx={{ fontSize: { xs: 28, sm: 33 } }} />
          </button>

          <div className="hidden lg:flex items-center gap-4 lg:gap-6">
            <LanguageSelector currentLang={currentLang} />
            <PrimaryButton text={t.dashboard} path={`/${currentLang}/dashboard`} />
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          links={navLinks} // Sidebar-a da artıq tərcümə olunmuş linklər gedir
          currentLang={currentLang}
        />
      )}
    </header>
  );
};

export default Header;