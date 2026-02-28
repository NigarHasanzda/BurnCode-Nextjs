"use client";

import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
  title: string;
  image: string;
  description: string; // Şəkildə qısa təsvir (description) var, date yox
  slug: string;
  lang: string;
}

export default function PortfolioCard({
  title,
  image,
  description,
  slug,
  lang,
}: PortfolioCardProps) {
  return (
    <div className="group flex flex-col bg-transparent">
      {/* Şəkil Konteyneri - Şəkildəki kimi açıq boz/mavi fon və böyük yuvarlaqlıq */}
      <div className="relative flex flex-col w-full aspect-[1.4/1] bg-[#F8F9FD] rounded-[40px] p-8 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-sm">
        {image ? (
          <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl shadow-gray-200">
             <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="text-gray-400">Şəkil yoxdur</div>
        )}
      <div className="mt-8 px-2">
        <h3 className="text-[28px] font-bold text-[#1A1C20] mb-4">
          {title}
        </h3>
        
        <p className="text-[#52525B] text-[18px] leading-relaxed mb-6 line-clamp-3">
          {description}
        </p>

        {/* Link - Şəkildə link görünmür amma funksionallıq üçün saxlayırıq */}
        {slug && (
          <Link
            href={`/${lang}/portfolio/${slug}`}
            className="inline-flex items-center text-[#5D56F1] font-semibold text-lg hover:gap-2 transition-all"
          >
            Daha ətraflı 
            <span className="ml-2">→</span>
          </Link>
        )}
      </div>
      </div>

      {/* Mətn Hissəsi */}
    </div>
  );
}