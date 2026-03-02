"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSinglePortfolio } from "@/services/PortfolioService";
import { Project } from "@/types/portfolio";
import Image from "next/image";
import SingleSkeleton from "@/components/LoadingSkeleton/SingleLoading";
import PageHeader from "@/components/HeaderContainer/PageHeader";

export default function PortfolioDetails() {
  const params = useParams();

  const slug = params.slug as string;
  const lang = params.lang as string;

  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await getSinglePortfolio({ slug });
        setData(res);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  console.log("Single Portfolio Data:", data);

  if (loading) return <SingleSkeleton/>;
  if (error) return <div className="text-center py-20">Xəta baş verdi</div>;
  if (!data) return <div className="text-center py-20">Project tapılmadı</div>;

  return (
    <>
      {/* PAGE HEADER */}
          <header className="relative w-full bg-[#F7F8FD] overflow-hidden min-h-[430px] md:min-h-[450px] flex items-center justify-center">
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
            <h1 className="text-[#111827] font-[550] text-[32px] sm:text-[40px] md:text-[54px] lg:text-[71px] leading-[1.2] md:leading-[1.15] tracking-tight max-w-[1100px] mx-auto mb-6 md:mb-10">
              {data.name}
            </h1>

          </>
        )}
      </div>
    </header>

      {/* MAIN SECTION */}
     <div className="py-24  ">
  <div className="container mx-auto px-4 lg:px-30">

    {/* FEATURE IMAGE */}
    <div className="mb-14">
      <div className="rounded-[40px] overflow-hidden">
        <Image
          src={data.image}
          alt={data.name}
          width={1200}
          height={600}
          className="w-full object-cover"
        />
      </div>
    </div>

    {/* CUSTOM LAYOUT */}
    <div className="flex flex-col mt-[40px] lg:flex-row lg:gap-16">

      {/* SIDEBAR */}
      <aside className="lg:w-[370px] lg:sticky lg:top-28 mb-10 lg:mb-0">
        <div className="bg-[#F7F8FD] py-10 px-6 rounded-[30px] text-center transition-all duration-300 ">

          {/* CLIENT */}
          <div className="border-b border-gray-200 pb-8 mb-8 flex flex-col items-center">
            <img
              src="/icon-client.svg"
              alt="client icon"
              className="w-13 h-13 mb-4"
            />
            <p className="text-gray-500 text-sm mb-2">Client</p>
            <h3 className="text-[19px] font-semibold text-[#1A1C20]">
              {data.client_info}
            </h3>
          </div>

          {/* WEBSITE */}
          <div className="flex flex-col items-center">
            <img
              src="/icon-website.svg"
              alt="website icon"
              className="w-13 h-13 mb-4"
            />
            <p className="text-gray-800 text-sm font-[400] mb-2">Website</p>
            <a
              href={data.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D6EFD] text-lg font-[400] break-all hover:underline"
            >
              {data.project_link}
            </a>
          </div>

        </div>
      </aside>

      {/* CONTENT */}
      <div className="lg:w-2/3">
        <h2 className="text-4xl font-semibold mb-10">
          Project Overview
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          {data.description}
        </p>

        <div
          className="prose max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: data.body }}
        />
      </div>

    </div>
  </div>
</div>
    </>
  );
}