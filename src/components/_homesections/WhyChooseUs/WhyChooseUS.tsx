"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import { getContactInfo } from '@/services/Contact';

// JSON fayllarını import edirik
import az from '../../../locales/az.json';
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';

const translations = { az, en, ru };

interface ContactInfo {
  facebook_page: string;
  instagram_page: string;
  linkedin_page: string;
  twitter_page: string;
}

const WhyChooseUs = () => {
    const params = useParams();
    const lang = (params?.lang as "az" | "en" | "ru") || "az";
    
    const [contact, setContact] = useState<ContactInfo | null>(null);
    const [loading, setLoading] = useState(true);

    // Aktiv tərcümə obyektini seçirik
    const t = translations[lang] || translations.az;
    const icons = ["/icon-whyus-1.svg", "/icon-whyus-2.svg", "/icon-whyus-3.svg"];

    useEffect(() => {
      const fetchContact = async () => {
        try {
          const data = await getContactInfo();
          setContact(data);
        } catch (err) {
          console.error("Contact fetch error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchContact();
    }, []);

  return (
    <section className="bg-[#F7F8FD] py-16 md:py-[100px] px-0">
      <div className="w-[90%] lg:max-w-[70%] mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-wrap items-center mb-8 md:mb-12">
          <div className="w-full lg:w-8/12 px-3">
            <div className="space-y-2">
              <h3 className="text-[#5e5ce6] font-semibold text-sm uppercase tracking-wider">
                {t.whyBurncode}
              </h3>
              <h2 className="text-[32px] md:text-[42px] font-bold text-[#1e1e2f] leading-tight">
                {t.discoverTrust}
              </h2>
            </div>
          </div>
        </div>

        {/* 3-Card Grid */}
        <div className="flex flex-wrap -mx-3 mb-8">
          {t.mockItems.map((item: any, index: number) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-3 py-3 mb-4 md:mb-8">
              <div className="bg-white rounded-[40px] py-10 md:py-12 px-6 md:px-8 h-full transition-all duration-300">
                <div className="mb-[20px]">
                  <img src={icons[index]} alt={item.title} className="w-16 h-16 md:w-20 md:h-20 object-contain" />
                </div>
                <h3 className="text-[22px] md:text-[26px] font-bold text-[#1e1e2f] capitalize mb-4">
                  {item.title}
                </h3>
                <p className="text-[#666] m-0 leading-relaxed text-sm md:text-[16px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Card */}
        <div className="w-full">
          <div className="relative bg-white rounded-[40px] py-12 md:py-[80px] px-6 md:px-[80px] overflow-hidden">
            <div className="absolute top-[70px] right-[70px] hidden lg:block">
              <img src="/icon-whyus-4.svg" alt="Explore Icon" className="w-16 h-16" />
            </div>

            <div className="flex flex-wrap mb-8 md:mb-[40px]">
              <div className="w-full lg:w-10/12">
                <h2 className="text-[30px] md:text-[42px] font-bold text-[#5D56F1] leading-tight max-w-[800px]">
                  {t.readyExplore}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                <p className="text-[#666] text-base md:text-[17px] leading-relaxed m-0">
                  {t.transformIdeas}
                </p>
              </div>

              <div className="w-full lg:w-1/2">
                <ul className="list-none p-0 m-0 flex flex-col sm:flex-row flex-wrap lg:justify-end gap-4">
                  <li className="w-full sm:w-auto">
                    <a 
                      href={contact?.linkedin_page || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-center bg-[#f3f4f6] text-[#1e1e2f] font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-[#5e5ce6] hover:text-white"
                    >
                      {t.connectLinkedIn}
                    </a>
                  </li>
                  <li className="w-full sm:w-auto">
                    <a 
                      href={contact?.instagram_page || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block text-center bg-[#f3f4f6] text-[#1e1e2f] font-bold py-4 px-8 rounded-full transition-all duration-300 hover:bg-[#5e5ce6] hover:text-white"
                    >
                      {t.connectInstagram}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;