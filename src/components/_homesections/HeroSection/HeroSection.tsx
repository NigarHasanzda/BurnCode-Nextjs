"use client";
import React from 'react';
import PrimaryButton from '@/components/Button/Button';
import { useParams } from 'next/navigation';


export default function Hero() {
const params = useParams();
const lang = params?.lang as string || "az";

  // JSON faylları import edirik
  const locales: Record<string, any> = {
    az: require('../../../locales/az.json'),
    en: require('../../../locales/en.json'),
    ru: require('../../../locales/ru.json'),
  };

  const t = locales[lang]?.hero || locales["az"].hero; // fallback az

  return (
    <section 
      className="relative min-h-[80vh] bg-[#F7F8FD] w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden -mt-20 sm:mt-2 md:mt-0"
    >
      <div className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-70 pointer-events-none"  style={{ backgroundImage: "url('/hero-bg.png')" }}/>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <span className="text-[#5D5FEF] font-bold tracking-widest text-[12px] md:text-[16px] uppercase mb-1 block">
          {t.subtitle}
        </span>

        <h1 className="text-[32px] md:text-[90px] font-[650] text-[#1A1A1A] leading-[1.3] mb-2 tracking-tight">
          {t.titleLine1} <br />
          {t.titleLine2} <br />
          <span className="text-[#5D5FEF]">{t.titleHighlight}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-gray-400 text-[14px] md:text-lg font-normal leading-relaxed mb-12 px-4">
          {t.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <PrimaryButton text={t.button1} path="/consultation" />
          <PrimaryButton text={t.button2} path="/portfolio/1" />
        </div>
      </div>
    </section>
  );
}