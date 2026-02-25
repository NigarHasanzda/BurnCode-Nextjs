"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import PrimaryButton from "../Button/Button";
import Sidebar from "../Sidebar/SideBar";
import LanguageSelector from "../LanguageButton/SeelectLanguage";

interface HeaderProps {
  currentLang: string;
}

const Header: React.FC<HeaderProps> = ({ currentLang }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio/1" },
    { name: "Blog", path: "/blog/1" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F8FD]">
      {/* max-w-[74%] saxlanıldı, mobildə sıxılmaması üçün w-full və responsive paddinglər əlavə edildi */}
      <div className="lg:max-w-[74%] w-full mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-16 h-[80px] md:h-[120px]">
        
        {/* Logo: Mobildə ölçüsü bir az kiçildi ki, menyu ilə toqquşmasın */}
        <Link href={`/${currentLang}`} className="logo flex items-center text-[28px] sm:text-[35px] lg:text-[41px]">
           <h1 className="Burncode_Logo">burn<span>c</span>ode</h1>
        </Link>

        {/* Navigation: Olduğu kimi qaldı */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={`/${currentLang}${link.path}`}
              className="text-[16px] text-[#0D0D0D] font-bold hover:text-[#635BFF] transition-all duration-300"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Sağ tərəf: İkonlar və butonlar */}
        <div className="flex items-center gap-2 sm:gap-4 lg:gap-6">
          {/* Hamburger Menu: Yalnız mobildə görünür */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon sx={{ fontSize: { xs: 28, sm: 33 } }} />
          </button>

          {/* Desktop Actions: Yalnız lg ekranda görünür */}
          <div className="hidden lg:flex items-center gap-4 lg:gap-6">
            <LanguageSelector currentLang={currentLang} />
            <PrimaryButton text="Dashboard" path={`/${currentLang}/dashboard`} />
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          links={navLinks}
          currentLang={currentLang}
        />
      )}
    </header>
  );
};

export default Header;