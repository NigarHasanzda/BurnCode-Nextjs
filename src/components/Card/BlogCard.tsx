"use client";

import React from "react";
import Image from "next/image";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

interface BlogCardProps {
  title: string;
  image: string;
  date: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, image, date }) => {
  return (
    <div className="bg-[#F8F9FF] rounded-[35px] p-4 flex flex-col border-none transition-shadow duration-300 cursor-pointer">
      <div className="relative w-full h-[220px] rounded-[30px] overflow-hidden mb-5">
        <Image src={image} alt={title} fill className="object-cover" unoptimized />
      </div>
      <div className="px-2 pb-2">
        <div className="flex items-center gap-2 text-gray-500 text-[13px] mb-3 font-medium">
          <CalendarMonthIcon sx={{ fontSize: 16, color: "#6b7280" }} />
          <span>{date}</span>
        </div>
        <h2 className="text-[#1a1a2e] text-[19px] font-bold leading-[1.4] line-clamp-3">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default BlogCard;
