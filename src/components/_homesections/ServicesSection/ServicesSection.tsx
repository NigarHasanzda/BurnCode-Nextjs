"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PrimaryButton from "@/components/Button/Button";
import ServiceCard from "@/components/Card/ServicesCard";

import { fetchServices } from "@/services/Services";

import az from "@/locales/az.json";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

import FadeInLeftWhenVisible from "@/FadeInWhenVisible/FadeInLeftWhenVisible";
import FadeInRightWhenVisible from "@/FadeInWhenVisible/FadeInWhenVisible";
import FadeInFromBottom from "@/FadeInWhenVisible/FadeFromBottom";
import CardSkeleton from "@/components/LoadingSkeleton/ThreeLOadingCard";

interface Service {
  name: string;
  description: string;
  image: string;
  slug: string;
}

const ServicesSection = () => {
  const params = useParams();
  const lang = (params?.lang as string) || "az";

  const translations: any = { az, en, ru };
  const t = translations[lang]?.servicesSection || en.servicesSection;

  const [posts, setPosts] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchServices(lang);
        setPosts(data);
      } catch (error) {
        console.error("Services fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [lang]);

  return (
    <section className="bg-[#F7F8FD] 
                        py-14 sm:py-16 md:py-20 
                        px-4 sm:px-6 lg:px-12 xl:px-20">

      <div className="mx-auto w-full max-w-[1400px]">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-12">

          <div className="w-full md:w-7/12 text-center md:text-left">
            <FadeInLeftWhenVisible>
              <span className="block text-[#5e5ce6] font-semibold mb-2 uppercase tracking-wide 
                               text-xs sm:text-sm md:text-base">
                {t.ourServices}
              </span>

              <h2 className="font-bold text-[#1e1e2f] leading-tight 
                             text-[26px] sm:text-[32px] md:text-[42px]">
                {t.whatWeOffer}
              </h2>
            </FadeInLeftWhenVisible>
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <FadeInRightWhenVisible>
              <div className="w-full sm:w-auto">
                <PrimaryButton
                  text={t.viewAllServices}
                  path="/services"
                />
              </div>
            </FadeInRightWhenVisible>
          </div>

        </div>

        {/* Cards */}
        <div className="flex flex-wrap -mx-3 sm:-mx-4">
          {loading ? (
            <CardSkeleton />
          ) : (
            posts.slice(0, 6).map((service) => (
              <div
                key={service.slug}
                className="w-full sm:w-1/2 lg:w-1/3 
                           px-3 sm:px-4 
                           mb-6 sm:mb-8"
              >
                <FadeInFromBottom>
                  <ServiceCard
                    name={service.name}
                    description={service.description}
                    image={service.image}
                    slug={service.slug}
                    lang={lang}
                  />
                </FadeInFromBottom>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;