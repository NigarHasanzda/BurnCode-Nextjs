"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "../LanguageButton/SeelectLanguage";
import { X } from "lucide-react"; // Ikon üçün (npm install lucide-react)

interface SidebarProps {
  isOpen: boolean;
  links: { name: string; path: string }[];
  onClose: () => void;
  currentLang: string;
}

const sidebarVariants = {
  closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  opened: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30, staggerChildren: 0.1, delayChildren: 0.2 } },
};

const linkVariants = {
  closed: { opacity: 0, x: 20 },
  opened: { opacity: 1, x: 0 },
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, links, onClose, currentLang }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 w-full max-w-[320px] h-screen bg-white z-[70] flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.1)]"
            // variants={sidebarVariants}
            initial="closed"
            animate="opened"
            exit="closed"
          >
            {/* Header: Bağlama düyməsi və Loqo yeri */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100">
              <span className="font-bold text-[#000000] text-xl tracking-tight">ME<span className="text-[#5D56F1]">N</span>U</span>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col h-full overflow-y-auto px-6 py-8">
              {/* Navigation */}
              <nav className="flex flex-col gap-2 flex-1">
                {links.map((link, index) => (
                  <motion.div key={index} variants={linkVariants}>
                    <Link
                      href={`/${currentLang}${link.path}`}
                      onClick={onClose}
                      className="group relative flex items-center p-4 rounded-xl transition-all duration-200 hover:bg-[#5D56F1]/5"
                    >
                      <span className="text-[17px] font-medium text-gray-700 group-hover:text-[#5D56F1] transition-colors">
                        {link.name}
                      </span>
                      
                      {/* Aktiv/Hover xətti */}
                      <span className="absolute left-0 w-1 h-0 bg-[#5D56F1] rounded-r-full transition-all duration-300 group-hover:h-3/5" />
                    </Link>

                    
                  </motion.div>
                  
                ))}
                <div className="px-2 mx-auto ml-[-2px]">
                  <LanguageSelector currentLang={currentLang} />
                </div>
              </nav>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;