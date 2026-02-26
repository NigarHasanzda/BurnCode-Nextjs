"use client";

import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
  title: string;
  image: string;
  date: string;
  slug: string;
  lang: string;
}

export default function PortfolioCard({
  title,
  image,
  date,
  slug,
  lang,
}: PortfolioCardProps) {
  // Alt text default dəyər
  const altText = title || "Portfolio Project Image";

  return (
    <div className="border-none rounded-[40px] overflow-hidden shadow-md hover:shadow-lg transition">
      {/* Image */}
      <div className="relative w-full h-[250px] md:h-[200px] lg:h-[220px]">
        {image ? (
          <Image
            src={image}
            alt={altText}
            fill
            className="object-cover"
          />
        ) : (
          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
            <span className="text-gray-500">Şəkil yoxdur</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-4">{date}</p>

        {/* Link */}
        {slug && (
          <Link
            href={`/${lang}/portfolio/${slug}`}
            className="text-[#635BFF] font-medium hover:underline"
          >
            Layihəyə bax
          </Link>
        )}
      </div>
    </div>
  );
}