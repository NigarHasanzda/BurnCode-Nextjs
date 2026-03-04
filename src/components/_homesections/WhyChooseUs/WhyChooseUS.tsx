"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getContactInfo } from "@/services/Contact";

import az from "../../../locales/az.json";
import en from "../../../locales/en.json";
import ru from "../../../locales/ru.json";

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

  const t = translations[lang] || translations.az;

  const icons = [
    "/icon-whyus-1.svg",
    "/icon-whyus-2.svg",
    "/icon-whyus-3.svg",
  ];

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContactInfo();
        setContact(data);
      } catch (err) {
        console.error("Contact fetch error:", err);
      }
    };

    fetchContact();
  }, []);

  return (
    <section className="bg-[#F7F8FD] py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-10">
      <div className="w-full max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="mb-10 md:mb-14 text-center lg:text-left">
          <div className="max-w-3xl mx-auto lg:mx-0">
            <h3 className="text-[#5e5ce6] font-semibold text-xs sm:text-sm uppercase tracking-wider">
              {t.whyBurncode}
            </h3>

            <h2 className="font-bold text-[#1e1e2f] leading-tight text-[clamp(26px,4vw,42px)]">
              {t.discoverTrust}
            </h2>
          </div>
        </div>

        {/* 3 Cards */}
        <div className="flex flex-wrap -mx-3 mb-10 md:mb-14">
          {t.mockItems.map((item: any, index: number) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
            >
              <div className="bg-white rounded-[40px] py-8 sm:py-10 md:py-12 px-6 md:px-8 h-full transition-all duration-300">
                <div className="mb-5">
                  <img
                    src={icons[index]}
                    alt={item.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
                  />
                </div>

                <h3 className="font-bold text-[#1e1e2f] mb-4 text-[20px] sm:text-[22px] md:text-[26px]">
                  {item.title}
                </h3>

                <p className="text-[#666] leading-relaxed text-sm sm:text-[15px] md:text-[16px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Card */}
        {/* Bottom Card */}
        <div className="w-full">
          <div
            className="relative bg-white rounded-[40px]
               py-10 sm:py-14 md:py-20
               px-6 sm:px-8 md:px-14 lg:px-20
               overflow-hidden"
          >

            {/* Decorative Image */}
            <img
              src="/icon-whyus-4.svg"
              alt="Explore Icon"
              className="
        absolute 
        -top-4 -right-4
        sm:top-6 sm:right-6
        md:top-10 md:right-10
        lg:top-16 lg:right-16
        w-12 sm:w-14 md:w-16 lg:w-16
        opacity-90
        z-0
        pointer-events-none
      "
            />

            {/* Content */}
            <div className="relative z-10">

              <div className="mb-8 md:mb-12 max-w-4xl text-center lg:text-left">
                <h2 className="font-bold text-[#5D56F1] leading-tight text-[clamp(24px,4vw,42px)]">
                  {t.readyExplore}
                </h2>
              </div>

              <div className="flex flex-col lg:flex-row lg:items-center gap-10">

                <div className="w-full lg:w-1/2 text-center lg:text-left">
                  <p className="text-[#666] leading-relaxed text-sm sm:text-base md:text-[17px]">
                    {t.transformIdeas}
                  </p>
                </div>

                <div className="w-full lg:w-1/2">
                  <ul className="flex flex-col sm:flex-row flex-wrap lg:justify-end gap-4">
                    <li className="w-full sm:w-auto">
                      <a
                        href={contact?.linkedin_page || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-[#f3f4f6] text-[#1e1e2f] font-bold
                           py-3 sm:py-4 px-6 sm:px-8
                           rounded-full transition-all duration-300
                           hover:bg-[#5e5ce6] hover:text-white"
                      >
                        {t.connectLinkedIn}
                      </a>
                    </li>

                    <li className="w-full sm:w-auto">
                      <a
                        href={contact?.instagram_page || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center bg-[#f3f4f6] text-[#1e1e2f] font-bold
                           py-3 sm:py-4 px-6 sm:px-8
                           rounded-full transition-all duration-300
                           hover:bg-[#5e5ce6] hover:text-white"
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
      </div>
    </section>
  );
};

export default WhyChooseUs;