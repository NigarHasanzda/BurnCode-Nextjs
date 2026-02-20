"use client";

import React from "react";
import Image from "next/image";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Pagination from "@/Pagination/Paginations";

const BlogPage = () => {
  // Mock Data
  const posts = [
    {
      id: 1,
      title: "ASML: The Invisible Giant Powering Global Chip Production",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "2025-09-24",
    },
    {
      id: 2,
      title: "The Future of Artificial Intelligence: Opportunities, Challenges, and Humanity's Next Step",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      date: "2025-08-29",
    },

     {
      id: 4,
      title: "ASML: The Invisible Giant Powering Global Chip Production",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "2025-09-24",
    },
    {
      id: 5,
      title: "The Future of Artificial Intelligence: Opportunities, Challenges, and Humanity's Next Step",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      date: "2025-08-29",
    },
       {
      id: 6,
      title: "ASML: The Invisible Giant Powering Global Chip Production",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      date: "2025-09-24",
    },
    {
      id: 7,
      title: "The Future of Artificial Intelligence: Opportunities, Challenges, and Humanity's Next Step",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      date: "2025-08-29",
    },
  
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto  px-4 lg:px-26">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="bg-[#F8F9FF] rounded-[35px] p-4 flex flex-col border-none transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative w-full h-[220px] rounded-[30px] overflow-hidden mb-5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              {/* Mətnlər */}
              <div className="px-2 pb-2">
                <div className="flex items-center gap-2 text-gray-500 text-[13px] mb-3 font-medium">
                  <CalendarMonthIcon sx={{ fontSize: 16, color: "#6b7280" }} />
                  <span>{post.date}</span>
                </div>

                <h2 className="text-[#1a1a2e] text-[19px] font-bold leading-[1.4] line-clamp-3">
                  {post.title}
                </h2>
              </div>
            </div>
          ))}

        </div>
      </div>
     <Pagination currentPage={1} lastPage={3} onPageChange={() => {}} />
    </section>
  );
};

export default BlogPage;