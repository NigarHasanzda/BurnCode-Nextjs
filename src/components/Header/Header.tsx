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
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#F7F8FD]">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 lg:px-16 h-[100px]">
        <Link href={`/${currentLang}`} className="logo flex items-center text-[41px]">
          <span className="font-extrabold text-[#0D0D0D]">burn</span>
          <span className="font-extrabold text-[#635BFF] -ml-[1px]">c</span>
          <span className="font-extrabold text-[#0D0D0D] -ml-[0.5px]">ode</span>
        </Link>

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

        <div className="flex items-center gap-4 lg:gap-6">
          <button
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <MenuIcon sx={{ fontSize: 33 }} />
          </button>

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
          currentLang={currentLang} // Burada currentLang ötürülür
        />
      )}
    </header>
  );
};

export default Header;
