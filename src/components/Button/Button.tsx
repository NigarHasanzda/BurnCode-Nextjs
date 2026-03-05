"use client"
import Link from "next/link";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import React, { useEffect, useState } from "react";

interface PrimaryButtonProps {
  text: string;
  path: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, path }) => {
  const [lang, setLang] = useState<string>("az");

  useEffect(() => {
    const storedLang = localStorage.getItem("lang");
    if (storedLang) setLang(storedLang);
  }, []);

  return (
    <Link
      href={`/${lang}/${path}`}
      className="group relative overflow-hidden flex items-center justify-center gap-2 px-7 py-[13px] bg-[#635BFF] border-[2px] border-[#635BFF] text-white hover:text-[#635BFF] text-[16px] font-[700] rounded-full transition-colors duration-500 ease-out"
    >
      
      {/* White fill animation */}
      <span className="absolute inset-0 w-0 bg-white rounded-full transition-all duration-500 ease-out group-hover:w-full"></span>

      {/* Text */}
      <span className="relative z-10">{text}</span>

      {/* Arrow */}
      <svg
        className="relative z-10 w-4.5 h-4.5 transform transition-all duration-500 ease-out group-hover:translate-x-1 group-hover:rotate-45"
        viewBox="0 0 22 22"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>

    </Link>
  );
};

export default PrimaryButton;