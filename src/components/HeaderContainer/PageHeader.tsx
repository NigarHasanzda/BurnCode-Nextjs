"use client";

import Image from "next/image";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

export interface BlogDetail {
  title: string;
  created_at: string;
  category?: { name: string };
  body?: string;
  image?: string;
}

interface PageHeaderProps {
  blogdetail?: BlogDetail | null;
  loading?: boolean;
}

export default function PageHeader({ blogdetail, loading }: PageHeaderProps) {
  return (
    <header className="relative w-full bg-[#F7F8FD] overflow-hidden min-h-[450px] md:min-h-[480px] flex items-center justify-center">
      {/* Background Image: Mobildə çox yer tutmaması üçün object-right saxlanıldı */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/page-header-bg.png"
          alt="background pattern"
          fill
          priority
          className="object-contain object-right opacity-50 md:opacity-100 select-none pointer-events-none"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-12 md:py-20 text-center">
        {loading ? (
          /* ================= TEXT LOADING SKELETON (Tam Mərkəzdə) ================= */
          <div className="flex flex-col items-center justify-center animate-pulse gap-4 md:gap-6">
            {/* 40px-64px arası dinamik Başlıq Skeletonu */}
            <div className="h-10 md:h-16 w-[90%] md:w-[70%] lg:w-[60%] bg-gray-200 rounded-2xl mx-auto" />
            <div className="h-10 md:h-16 w-[60%] md:w-[40%] bg-gray-200 rounded-2xl mx-auto" />
            
            {/* Altındakı kiçik yazı (Metadata) */}
            <div className="flex flex-row gap-4 mt-4 justify-center items-center w-full">
              <div className="h-5 w-24 bg-gray-200 rounded-lg" />
              <div className="h-5 w-24 bg-gray-100 rounded-lg" />
            </div>
          </div>
        ) : (
          /* ================= REAL DATA ================= */
          <>
            {/* Başlıq: Mobildə 32px, Planşetdə 48px, Desktopda 64px */}
            <h1 className="text-[#111827] font-semibold text-[32px] sm:text-[40px] md:text-[56px] lg:text-[64px] leading-[1.2] md:leading-[1.15] tracking-tight max-w-[1100px] mx-auto mb-6 md:mb-10">
              {blogdetail?.title}
            </h1>

            {/* Metadata: Mobildə alt-alta düşməməsi üçün flex-wrap və gap tənzimləndi */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 md:gap-x-8 gap-y-3">
              {/* Tarix */}
              <div className="flex items-center gap-1.5 md:gap-2 text-[#6366F1]">
                <CalendarMonthIcon className="text-[16px] md:text-[18px]" />
                <span className="text-[13px] md:text-[15px] font-medium text-gray-600 whitespace-nowrap">
                  {blogdetail?.created_at}
                </span>
              </div>

              {/* Kateqoriya */}
              {blogdetail?.category && (
                <div className="flex items-center gap-1.5 md:gap-2 text-[#6366F1]">
                  <LocalOfferOutlinedIcon 
                    className="text-[16px] md:text-[18px]" 
                    style={{ transform: 'rotate(90deg)' }} 
                  />
                  <span className="text-[13px] md:text-[15px] font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    {blogdetail.category.name}
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
}