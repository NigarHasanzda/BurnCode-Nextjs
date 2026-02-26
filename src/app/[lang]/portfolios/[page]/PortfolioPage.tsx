"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import PortfolioCard from "@/components/Card/PortfolioCard";
import { Project, ProjectsResponse } from "@/types/portfolio";
import { getProjects } from "@/services/PortfolioService";
import Pagination from "@/Pagination/Paginations";

export default function PortfolioPage() {
  const params = useParams();
  const router = useRouter();

  const lang = params?.lang as string;
  const currentPage = Number(params?.page) || 1;

  const [projects, setProjects] = useState<Project[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ================= FETCH PROJECTS =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res: ProjectsResponse = await getProjects(lang, currentPage);
        setProjects(res.items || []);
        setTotalPages(res.meta?.last_page || 1);
      } catch (err) {
        setError("Layihələr gətirilərkən xəta baş verdi.");
      } finally {
        setLoading(false);
      }
    };

    if (lang) fetchData();
  }, [lang, currentPage]);

  // ================= PAGE CHANGE =================
  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    router.push(`/${lang}/portfolios/${page}`);
  };

  // ================= RENDER =================
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-20 xl:px-29">

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-500 py-10">
            Yüklənir...
          </p>
        )}

        {/* ERROR */}
        {error && (
          <p className="text-center text-red-500 py-10">
            {error}
          </p>
        )}

        {/* PROJECT GRID */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <PortfolioCard
                key={project.id}
                title={project.title}
                image={project.image}
                date={project.createdAt || ""}
                slug={project.slug}
                lang={lang}
              />
            ))}
          </div>
        )}

        {/* NO DATA */}
        {!loading && !error && projects.length === 0 && (
          <p className="text-center text-gray-500 py-10">
            Heç bir layihə tapılmadı.
          </p>
        )}

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="mt-14 flex justify-center">
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