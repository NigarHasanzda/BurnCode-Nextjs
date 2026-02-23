"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import PortfolioCard from "@/components/Card/PortfolioCard";
import Pagination from "@/Pagination/Paginations";

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  date: string;
  category: string;
  slug: string;
}

/* ================= MOCK DATA ================= */

const MOCK_DATA: PortfolioItem[] = Array.from({ length: 24 }).map(
  (_, index) => ({
    id: index + 1,
    title: `Project ${index + 1}`,
    image: "/service-img-1.jpg",
    date: "12 May 2024",
    category: index % 2 === 0 ? "web" : "mobile",
    slug: `project-${index + 1}`,
  })
);

const ITEMS_PER_PAGE = 6;

export default function PortfolioPage() {
  const { lang, page } = useParams();
  const router = useRouter();

  const currentPage = Number(page) || 1;
  const [activeFilter, setActiveFilter] = useState<string>("*");

  /* ================= FILTER ================= */

  const filteredData = useMemo(() => {
    if (activeFilter === "*") return MOCK_DATA;
    return MOCK_DATA.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  /* ================= PAGINATION ================= */

  const lastPage = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    router.push(`/${lang}/portfolio/${newPage}`);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    router.push(`/${lang}/portfolio/1`);
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        
        {/* FILTER */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {["*", "web", "mobile"].map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-6 py-3 rounded-full font-semibold transition
              ${
                activeFilter === filter
                  ? "bg-[#5D56F1] text-white"
                  : "bg-gray-200 hover:bg-[#5D56F1] hover:text-white"
              }`}
            >
              {filter === "*" ? "All" : filter}
            </button>
          ))}
        </div>

        {/* CARDS */}
        {paginatedData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedData.map((item) => (
              <PortfolioCard
                key={item.id}
                title={item.title}
                image={item.image}
                date={item.date}
                slug={item.slug}
                lang={lang as string}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Bu kateqoriyada layihə yoxdur.
          </p>
        )}

        {/* PAGINATION */}
        {lastPage > 1 && (
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
}
