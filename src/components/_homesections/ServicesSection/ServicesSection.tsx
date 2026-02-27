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
    <section className="bg-[#F7F8FD] py-[60px] md:py-[70px] px-4 md:px-75 pb-[40px] md:pb-[70px]">
      <div className="mx-auto w-full max-w-[1400px]">

        {/* Header */}
        <div className="flex flex-wrap items-center mb-12">

          <div className="w-full md:w-7/12 mb-6 md:mb-0 text-center md:text-left">
            <FadeInLeftWhenVisible>
              <span className="block text-[#5e5ce6] font-semibold mb-2 uppercase tracking-wide text-sm md:text-base">
                {t.ourServices}
              </span>
              <h2 className="text-[28px] md:text-[42px] font-bold text-[#1e1e2f] leading-tight">
                {t.whatWeOffer}
              </h2>
            </FadeInLeftWhenVisible>
          </div>

          <div className="w-full md:w-5/12 flex justify-center md:justify-end">
            <FadeInRightWhenVisible>
              <PrimaryButton
                text={t.viewAllServices}
                path="/services"
              />
            </FadeInRightWhenVisible>
          </div>

        </div>

        {/* Cards */}
        <div className="flex flex-wrap -mx-4">
          {loading ? (
            <CardSkeleton />
          ) : (
            posts.slice(0, 6).map((service) => (
              <div
                key={service.slug}
                className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8"
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