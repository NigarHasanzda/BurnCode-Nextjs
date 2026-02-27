"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DescriptionIcon from "@mui/icons-material/Description";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LanguageSelector from "../LanguageButton/SeelectLanguage";

interface SidebarProps {
  isOpen: boolean;
  links: { name: string; path: string }[];
  onClose: () => void;
  currentLang: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, links, onClose, currentLang }) => {
  
  // İkonu seçmək üçün funksiya yaradırıq
  const getIcon = (path: string, name: string) => {
    const p = path.toLowerCase();
    const n = name.toLowerCase();
    const iconStyle = { fontSize: 23, color: "#5D56F1" };

    // Əgər path və ya name daxilində bu sözlər keçirsə ikonu qaytar
    if (p === "/" || p === `/${currentLang}` || n.includes("ana") || n.includes("home")) 
      return <HomeIcon sx={iconStyle} />;
    
    if (p.includes("service") || n.includes("xidmət") || n.includes("service")) 
      return <MiscellaneousServicesIcon sx={iconStyle} />;
    
    if (p.includes("portfolios") || n.includes("portfolios") || n.includes("layihə")) 
      return <ShoppingCartIcon sx={iconStyle} />;
    
    if (p.includes("blog") || n.includes("blog") || n.includes("məqalə")) 
      return <DescriptionIcon sx={iconStyle} />;
    
    if (p.includes("contact") || n.includes("əlaqə") || n.includes("contact")) 
      return <ContactMailIcon sx={{ ...iconStyle, fontSize: 22 }} />;

    // Heç biri tapılmasa standart bir ikon göstər (opsional)
    return <HomeIcon sx={iconStyle} />;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20  z-40 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 w-[250px] h-full bg-white shadow-xl z-50 px-7 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <nav className="flex flex-col gap-6 mt-10">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={`/${currentLang}${link.path}`}
                  className="flex items-center gap-3 text-[15px] font-semibold text-[#646464] hover:text-[#635BFF] transition-all duration-300 transform hover:translate-x-2"
                  onClick={onClose}
                >
                  <span className="flex items-center justify-center w-6 h-6">
                    {getIcon(link.path, link.name)}
                  </span>
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="mx-auto mt-10 -ml-2">
              <LanguageSelector currentLang={currentLang} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;