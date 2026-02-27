"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PrimaryButton from '@/components/Button/Button';
import { getProjects } from '@/services/PortfolioService';
import { Project } from '@/types/portfolio';

// Lokallaşdırma faylları
import az from "@/locales/az.json";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";
import Link from 'next/link';
import SingleSkeleton from '@/components/LoadingSkeleton/SingleLoading';
import FadeInLeftWhenVisible from '@/FadeInWhenVisible/FadeInLeftWhenVisible';
import FadeInRightWhenVisible from '@/FadeInWhenVisible/FadeInWhenVisible';

// Skeleton

const OurWork = () => {
  const params = useParams();
  const lang = (params?.lang as string) || "en";
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await getProjects(lang, 1);
        setProjects(data.items.slice(0, 4));
      } catch (error) {
        console.error("Data gətirilərkən xəta:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [lang]);

  const translations: any = { az, en, ru };
  const t = translations[lang]?.ourWork || en.ourWork;

  return (
    <section className="py-[100px] pb-[70px] bg-white">
      <div className="container mx-auto px-4 lg:max-w-[70%]">
        
        {/* Başlıq */}
        <div className="flex flex-wrap items-center mb-12">
          <div className="w-full md:w-9/12 lg:w-8/12 text-center md:text-left">
            <div className="mb-4">
              <FadeInLeftWhenVisible>
                <span className="block text-[#5e5ce6] font-semibold mb-2 uppercase tracking-widest text-sm">
                {t.subtitle}
              </span>
              <h2 className="text-[32px] md:text-[42px] font-bold text-[#1e1e2f] leading-tight">
                {t.title}
              </h2>
              </FadeInLeftWhenVisible>
            </div>
          </div>
          
          <div className="w-full md:w-3/12 lg:w-4/12 flex justify-center md:justify-end mt-4 md:mt-0">
            <FadeInRightWhenVisible>
              <PrimaryButton 
              text={t.allPortfolio} 
              path={`/portfolios/1`} 
            />
            </FadeInRightWhenVisible>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="flex flex-wrap -mx-4">
            {/* İki Skeleton yan-yana */}
            {[1,2].map((i) => (
              <div key={i} className="w-full md:w-1/2 px-4 mb-6">
                <SingleSkeleton />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap -mx-4">
            {projects.map((work) => (
              <div key={work.id} className="w-full md:w-1/2 px-4 mb-6">
                <div className="group bg-[#F7F8FD] rounded-[40px] p-5 pb-10 h-full transition-all duration-300 flex flex-col">
                  
                  <div className="mb-[30px] rounded-[30px] overflow-hidden">
                    <div className="relative h-[250px] md:h-[350px] w-full overflow-hidden">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="w-full h-full object-cover rounded-[30px] transition-transform duration-700 ease-in-out group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="px-5 flex-1">
                    <Link href={`/${lang}/portfolio/${work.slug}`} className="block mb-4">
                      <h3 className="text-[18px] md:text-[22px] font-semibold text-[#1e1e2f] transition-colors duration-300 group-hover:text-[#5e5ce6]">
                        {work.title}
                      </h3>
                    </Link>
                    <p className="text-[#6b6b84] m-0 leading-relaxed text-[15px] md:text-[16px] line-clamp-3">
                      {work.description}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default OurWork;