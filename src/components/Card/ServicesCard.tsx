"use client";

import React from "react";
import Link from "next/link";

interface ServiceCardProps {
  name: string;
  description: string;
  image: string;
  slug: string;
  lang: string;
  bgColor?: string; 
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, description, image, slug, lang, bgColor }) => {
  return (
    <div
      className="group rounded-[40px] p-5 h-[calc(100%-30px)] mb-[30px] transition-all duration-300"
      style={{ backgroundColor: bgColor || "#ffffff" }}
    >
      <div className="p-5">
        <div className="flex items-center justify-between border-b border-[#e5e7eb] pb-[25px] mb-[25px]">
          <h2 className="text-[24px] font-[500] text-[#1e1e2f] w-full max-w-[200px] capitalize leading-tight">
            {name}
          </h2>
          <Link
            href={`/${lang}/service/${slug}`}
            className="bg-[#5e5ce6] text-white rounded-full flex items-center justify-center w-[60px] h-[60px] shrink-0"
          >
            <img
              src="/arrow.svg"
              alt="arrow icon"
              className="transition-all duration-300 ease-in-out group-hover:rotate-[45deg]"
            />
          </Link>
        </div>

        <p className="text-[#555] m-0 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>
      <div className="rounded-[30px] overflow-hidden">
        <figure className="m-0 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-auto rounded-[30px] transition-all duration-500 ease-out group-hover:scale-110"
          />
        </figure>
      </div>
    </div>
  );
};

export default ServiceCard;
