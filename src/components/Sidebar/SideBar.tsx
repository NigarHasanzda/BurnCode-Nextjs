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
}

const iconMap: { [key: string]: React.ReactNode } = {
  Home: <HomeIcon sx={{ fontSize: 23, color: "#5D56F1" }} />,
  Services: <MiscellaneousServicesIcon sx={{ fontSize: 23, color: "#5D56F1" }} />,
  Portfolio: <ShoppingCartIcon sx={{ fontSize: 23, color: "#5D56F1" }} />,
  Blog: <DescriptionIcon sx={{ fontSize: 23, color: "#5D56F1" }} />,
  Contact: <ContactMailIcon sx={{ fontSize: 22, color: "#5D56F1" }} />,
};


const Sidebar: React.FC<SidebarProps> = ({ isOpen, links, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 cursor-pointer"
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
            <nav className="flex flex-col gap-6 mt-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="flex items-center gap-3 text-[15px] font-semibold text-[#646464] hover:text-[#635BFF] transition-all duration-300 transform hover:translate-x-2"
                  onClick={onClose}
                >
                  {iconMap[link.name]}
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className=" mx-auto mt-6  -ml-2" >
              <LanguageSelector />
            </div>
          </motion.div>
        
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
