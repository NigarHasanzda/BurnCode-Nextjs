"use client";

import Image from "next/image";
// MUI İkonları
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';

interface Category {
  name: string;
}

// components/PageHeader/PageHeader.tsx
export interface BlogDetail {
  title: string;
  created_at: string;
  category?: { name: string };
  body?: string;
  image?: string;
}

interface PageHeaderProps {
  blogdetail: BlogDetail;
}

export default function PageHeader({ blogdetail }: PageHeaderProps) {
  return (
    <header className="relative w-full bg-[#F7F8FD] overflow-hidden min-h-[565px] flex items-center justify-center">
      {/* Background Image: Tam şəkildəki kimi sağ tərəfə fokuslanmış */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/page-header-bg.png"
          alt="background pattern"
          fill
          priority
          className="object-contain object-right select-none pointer-events-none"
        />
      </div>

      {/* Content: Mərkəzləşdirilmiş və Responsive */}
      <div className="relative z-10 container mx-auto px-6 py-20 text-center">
        {/* Başlıq: Şəkildəki qalınlıq və tracking (hərf arası məsafə) tənzimlənib */}
        <h1 className="text-[#111827] font-bold text-[36px] md:text-[56px] lg:text-[64px] leading-[1.15] tracking-tight max-w-[1300px] mx-auto mb-10">
          {blogdetail.title}
        </h1>

        {/* Metadata: MUI İkonları ilə */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {/* Tarix */}
          <div className="flex items-center gap-2 text-[#6366F1]">
            <CalendarMonthIcon sx={{ fontSize: 18 }} />
            <span className="text-[15px] font-medium text-gray-600">
              {blogdetail.created_at}
            </span>
          </div>

          {/* Kateqoriya */}
          <div className="flex items-center gap-2 text-[#6366F1]">
            <LocalOfferOutlinedIcon sx={{ fontSize: 18, transform: 'rotate(90deg)' }} />
            <span className="text-[15px] font-medium text-gray-600 uppercase tracking-wider">
              {blogdetail.category?.name}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}