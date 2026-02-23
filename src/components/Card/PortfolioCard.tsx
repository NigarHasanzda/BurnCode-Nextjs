"use client";

import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/${lang}/singleportfolio/${slug}`);
        window.scrollTo(0, 0);
      }}
      className="relative overflow-hidden bg-[#F7F8FD] rounded-[40px] p-2 h-full mb-8 group cursor-pointer transition hover:shadow-xl"
    >
      {/* Image */}
      <div className="rounded-[40px] overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={600}
          height={400}
          className="rounded-[40px] transition-all duration-500 group-hover:scale-110 object-cover"
        />
      </div>

      {/* Content */}
      <div className="m-5">
        <p className="flex items-center gap-2 text-sm mb-3 text-gray-600">
          <CalendarMonthIcon sx={{ fontSize: 16 }} />
          {date}
        </p>

        <h2 className="leading-[1.4] text-[22px] font-bold group-hover:text-[#5D56F1] transition">
          {title}
        </h2>
      </div>
    </div>
  );
}
