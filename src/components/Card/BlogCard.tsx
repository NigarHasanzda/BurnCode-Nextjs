"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface BlogCardProps {
  title: string;
  image: string;
  created_at: string;
  slug: string;
  lang: string;
}

export default function BlogCard({
  title,
  image,
  created_at,
  slug,
  lang,
}: BlogCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/${lang}/blogs/${slug}`);
        window.scrollTo(0, 0);
      }}
      className="group cursor-pointer bg-[#F7F9FB] rounded-[50px] p-3.5 h-full flex flex-col transition-all duration-300"
    >
      {/* Image Container */}
      <div className="relative min-h-[230px] w-full bg-yellow-200 overflow-hidden rounded-[40px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="pt-8 pb-4 px-2">
        {/* Date Section */}
        <div className="flex items-center gap-3 text-[#2c2f35] mb-4">
          {/* Şəkildəki təqvim ikonu üçün sadə SVG */}
          <CalendarMonthIcon sx={{ fontSize: 15, color: "#6b7280" }} />
          <span className="text-[16px] font-medium opacity-80">{created_at}</span>
        </div>

        {/* Title */}
        <h2 className="text-[#1A1C20] text-[23px] font-[500] leading-[1.3] tracking-tight transition-colors duration-300">
          {title}
        </h2>
      </div>
    </div>
  );
}