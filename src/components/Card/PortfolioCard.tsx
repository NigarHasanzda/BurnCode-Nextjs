"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface PortfolioCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  slug: string;
  lang: string;
}

export default function PortfolioCard({
  title,
  description,
  image,
  slug,
  lang,
}: PortfolioCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${lang}/singleportfolio/${slug}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer group h-full"
    >
      <div className="bg-[#F8F9FD] rounded-[40px] p-5 pb-10 h-[calc(100%-30px)] mb-[30px] transition-all duration-300">

        {/* IMAGE */}
        <div className="relative mb-[30px] rounded-[30px] overflow-hidden">
          <div className="relative aspect-[16/10]">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover rounded-[30px] transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-5">
          <h2 className="text-[26px] capitalize mb-5 font-semibold text-[#1A1C20]">
            {title}
          </h2>
          <p className="text-[#52525B] leading-relaxed">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}