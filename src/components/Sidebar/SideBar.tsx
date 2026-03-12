"use client";
import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSelector from "../LanguageButton/SeelectLanguage";

interface SidebarProps {
  isOpen: boolean;
  links: { name: string; path: string }[];
  onClose: () => void;
  currentLang: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, links, onClose, currentLang }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            className="fixed top-0 right-0 w-[270px] h-screen bg-white z-50 flex flex-col shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 24, stiffness: 170 }}
          >
            {/* Top accent */}
            <div className="h-[3px] w-full bg-[#5D56F1]" />

            <div className="flex flex-col h-full px-8 py-10">

              {/* Navigation */}
              <nav className="flex flex-col gap-6 flex-1">
                {links.map((link, index) => (
                  <Link
                    key={index}
                    href={`/${currentLang}${link.path}`}
                    onClick={onClose}
                    className="relative text-[16px]  mx-auto font-semibold text-[#444] tracking-wide"
                  >
                    {link.name}

                    {/* permanent gradient underline */}
                    <span
                      className="absolute left-0 -bottom-1 h-[2px] w-full"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(93,86,241,0) 0%, rgba(93,86,241,0.9) 50%, rgba(93,86,241,0) 100%)",
                        boxShadow: "0 0 8px rgba(93,86,241,0.25)"
                      }}
                    />
                  </Link>
                ))}
                <div className="!mx-auto  -ml-[1px]">

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