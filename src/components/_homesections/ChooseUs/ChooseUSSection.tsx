"use client";

import React from 'react';
import Image from 'next/image';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PrimaryButton from '@/components/Button/Button';
import { useParams } from 'next/navigation';

import az from "@/locales/az.json";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import FadeInLeftWhenVisible from '../../../FadeInWhenVisible/FadeInLeftWhenVisible';
import FadeInRightWhenVisible from '@/FadeInWhenVisible/FadeInWhenVisible';

const ChooseUsSection = () => {
  const { lang } = useParams();
  
  // URL-dəki 'lang' parametrinə görə (az, en, ru) müvafiq mətni seçirik
  const translations: any = { az, en, ru };
  const t = translations[lang as string]?.chooseUs || en.chooseUs;

  const features = [
    { id: 1, text: t.features.scalability },
    { id: 4, text: t.features.impact },
    { id: 2, text: t.features.expertise },
    { id: 5, text: t.features.timezone },
    { id: 3, text: t.features.flexibility },
    { id: 6, text: t.features.support },
  ];

  return (
    <section className="py-14 md:py-20 px-4 sm:px-6 max-w-[1400px] mx-auto font-sans bg-white">
      
      {/* Header */}
      <div className="flex flex-col md:w-[70%] md:flex-row items-center gap-3 md:gap-4 mb-10 md:mb-14 md:ml-[30px] text-center md:text-left">
       <FadeInLeftWhenVisible>
         <h2 className="text-[26px] sm:text-[32px] md:text-[42px]  font-semibold text-[#1a1a2e] tracking-tight leading-tight">
          {t.title}
        </h2>
       </FadeInLeftWhenVisible>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-34 items-start relative">
        

        <div className="relative w-full lg:w-[41%]">
          <div className="rounded-[3rem] md:ml-[30px] overflow-hidden shadow-sm relative group">
            <FadeInLeftWhenVisible>
              <Image 
              src="/page-about-1.jpg" 
              alt="Team working" 
              width={700} 
              height={600}
              className="object-cover w-full h-[380px] sm:h-[450px] lg:h-[560px]"
            />
            </FadeInLeftWhenVisible>
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <span className="absolute w-[2px] h-full bg-white opacity-30 animate-slide1"></span>
              <span className="absolute w-[2px] h-full bg-white opacity-20 animate-slide2"></span>
            </div>
          </div>

          {/* Circles (Dizayn qorunur) */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-28 h-28 lg:hidden">
            <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
              <Image src="/about-circle.png" alt="Circle" fill className="object-contain" />
            </div>
          </div>

          <div className="absolute top-1/2 -right-24 xl:-right-30 -translate-y-1/2 hidden lg:flex items-center justify-center">
            <div className="relative w-34 h-34 xl:w-39 xl:h-39 flex items-center justify-center">
              <div className="absolute inset-0 animate-[spin_20s_linear_infinite]">
                <Image src="/about-circle.png" alt="Circle" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-[46%] py-8 md:py-[60px]">
          <FadeInRightWhenVisible>
            <div className="space-y-6 text-[#4a4a68] leading-[1.6] text-[15px] md:text-[16px] mb-6">
            {/* HTML teqlərini (span) oxumaq üçün dangerouslySetInnerHTML istifadə edirik */}
            <p dangerouslySetInnerHTML={{ __html: t.description1 }} />
            <p>{t.description2}</p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-8 md:mb-10">
            {features.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-[#5e5ce6] rounded-full w-6 h-6 flex items-center justify-center shrink-0">
                  <ChevronRightIcon className="text-white !text-[16px]" />
                </div>
                <span className="font-bold text-[#1a1a2e] text-[16px] md:text-[18px]">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Button - Cari dilə uyğun linklə */}
          <div className="inline-block">
            <PrimaryButton text={t.button} path={`/contact`} />
          </div>
          </FadeInRightWhenVisible>
        </div>

      </div>
    </section>
  );
};

export default ChooseUsSection;