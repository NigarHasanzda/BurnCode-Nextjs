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
      className="group cursor-pointer bg-[#F7F9FB] rounded-[48px]  p-[14px]  pt-3 h-fit flex flex-col transition-all duration-300 "
    >
      <div className="relative w-full overflow-hidden rounded-[38px] bg-gray-200 min-h-[220px]">

        <img
          src={image}
          alt={title}
          className="w-full h-auto min-h-[220px] object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="pt-8 pb-4 px-4 flex flex-col gap-3">
        
        {/* Date - Şəkildəki kiçik və boz tonlu tarix */}
        <div className="flex items-center gap-2 text-[#1a1c20cb]">
          <CalendarMonthIcon sx={{ fontSize: 16, color: "#1A1C20" }} />
          <span className="text-[15px] font-medium opacity-90">
            {created_at}
          </span>
        </div>

        {/* Title - Şəkildəki qalınlıq və sətir arası məsafə */}
        <h2 className="text-[#1A1C20] text-[22px] font-[500] leading-[1.3] tracking-tight transition-colors duration-300 ">
          {title}
        </h2>
      </div>
    </div>
  );
}