"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useParams } from "next/navigation";
import PortfolioCard from "@/components/Card/PortfolioCard";
import { Project, ProjectsResponse } from "@/types/portfolio";
import { getPortfolioCategories, getProjects } from "@/services/PortfolioService";
import Pagination from "@/Pagination/Paginations";

const ITEMS_PER_PAGE = 6;

export default function PortfolioPage() {
  const { lang, page } = useParams();
  const router = useRouter();
  const currentPage = Number(page) || 1;

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("*");

  // ================= FETCH PROJECTS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res: ProjectsResponse = await getProjects(lang as string, currentPage);
        setProjects(res.items || []);
        setTotalPages(res.meta?.last_page || 1);
      } catch (err) {
        setError("Layihələr gətirilərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [lang, currentPage]);

  // ================= FETCH CATEGORIES =================
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getPortfolioCategories(lang as string);
        setCategories(["*", ...cats]); // All üçün "*"
      } catch (err) {
        console.error("Kateqoriyalar gətirilərkən xəta:", err);
      }
    };
    fetchCategories();
  }, [lang]);

  // ================= FILTER =================
  const filteredData = useMemo(() => {
    if (activeFilter === "*") return projects;
   console.log("Active Filter:", activeFilter, "Projects:", projects); // Debug üçün əlavə edildi
  }, [activeFilter, projects]);

  // ================= HANDLERS =================
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    router.push(`/${lang}/portfolio/${page}`);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    router.push(`/${lang}/portfolio/1`);
  };

  // ================= RENDER =================
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">

        {/* FILTER */}
        <div className="flex justify-center flex-wrap gap-4 mb-12">
          {categories.map((filter) => (
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

        {/* LOADING / ERROR */}
        {loading && <p className="text-center text-gray-500">Yüklənir...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}


   
        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              lastPage={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </section>
  );
}