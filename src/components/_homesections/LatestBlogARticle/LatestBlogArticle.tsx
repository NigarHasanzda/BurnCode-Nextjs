"use client";

import React from "react";
import Image from "next/image";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PrimaryButton from "@/components/Button/Button";

const LatestBlogArticle = ({ t = {} }: { t?: any }) => {
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
      id: 3,
      title: "What is Algorithmic Trading? – The Smart Way to Trade in Modern Markets",
      image: "https://images.unsplash.com/photo-1611974717482-48a66500b39e", // Nümunə şəkil
      date: "2025-06-17",
    },
  ];

  return (
    <section className="py-20 px-60 bg-white">
      <div className="container mx-auto px-4 lg:px-20">
        
        {/* Header Bölməsi - Düyməni sağa çəkmək üçün */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <span className="block text-[#5e5ce6] font-bold text-sm mb-3 uppercase tracking-wider">
              {t?.ourServices || "Latest Blogs & Articles"}
            </span>
            <h2 className="text-[36px] md:text-[44px] font-extrabold text-[#1e1e2f] leading-tight">
              {t?.whatWeOffer || "The latest insights you need to know"}
            </h2>
          </div>

          <div className="flex items-center">
            <PrimaryButton 
              text={t?.viewAllArticles || "View All Articles "} 
              path={`services`} 
              // Qeyd: Düymənin daxilindəki stili PrimaryButton komponentində tənzimləyə bilərsiniz
            />
          </div>
        </div>

        {/* Grid Bölməsi */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {posts.slice(0,3).map((post) => (
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
    </section>
  );
};

export default LatestBlogArticle;