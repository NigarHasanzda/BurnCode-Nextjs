"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Category, Project } from "@/types/portfolio";
import Pagination from "@/Pagination/Paginations";
import { getPortfolioWithCategories, getPortfolioCategories } from "@/services/PortfolioService";
import SingleSkeleton from "@/components/LoadingSkeleton/SingleLoading";
import CategoriesSkeleton from "@/components/LoadingSkeleton/CategoriesSkelet";



export default function PortfolioPage() {
  const params = useParams();
  const router = useRouter();

  const lang = params.lang as string;
  const categorySlug = params.slug as string | undefined;
  const currentPage = Number(params.page) || 1;

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // 1. Kateqoriyaların Yüklənməsi
  useEffect(() => {
    if (!lang) return;

    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await getPortfolioCategories(lang);
        const mappedCats: Category[] = data.map((item: any) =>
          typeof item === "string"
            ? { id: 0, name: item, slug: item.toLowerCase().replace(/\s+/g, "-") }
            : { id: item.id, name: item.name, slug: item.slug }
        );
        setCategories(mappedCats);
      } catch (err) {
        console.error("Category fetch error:", err);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, [lang]);

  const categoryId = useMemo(() => {
    if (!categorySlug || categories.length === 0) return undefined;
    return categories.find((cat) => cat.slug === categorySlug)?.id;
  }, [categorySlug, categories]);

  // 3. Layihələrin Yüklənməsi
  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      // Əgər spesifik kateqoriya seçilibsə amma hələ ID tapılmayıbsa, gözlə
      if (categorySlug && !categoryId && !categoriesLoading) return;

      setLoading(true);
      try {
        const res = await getPortfolioWithCategories(currentPage, lang, categoryId);
        
        if (isMounted) {
          const formattedItems = res.data.map((item: any) => ({
            id: item.id,
            title: item.name || item.title,
            image: item.image,
            description: item.description,
            slug: item.slug,
          }));

          setProjects(formattedItems);
          setTotalPages(res.meta?.last_page || 1);
        }
      } catch (err) {
        console.error("Projects fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => { isMounted = false; };
  }, [currentPage, lang, categoryId, categorySlug, categoriesLoading]);


  const navigate = (slug: string | "*", page: number = 1) => {
    const path = slug === "*" 
      ? `/${lang}/portfolios/${page}` 
      : `/${lang}/portfolios/category/${slug}/${page}`;
    router.push(path);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-10">
        
        {/* KATEQORİYA NAVİQASİYASI */}
        {categoriesLoading ? (
          <CategoriesSkeleton />
        ) : (
          <nav className="mb-[50px]">
            <ul className="flex flex-wrap items-center justify-center gap-7">
              <CategoryItem 
                label="All" 
                isActive={!categorySlug} 
                onClick={() => navigate("*")} 
              />
              {categories.map((cat) => (
                <CategoryItem
                  key={cat.id}
                  label={cat.name}
                  isActive={categorySlug === cat.slug}
                  onClick={() => navigate(cat.slug)}
                />
              ))}
            </ul>
          </nav>
        )}

        {/* LAYİHƏLƏR SİYAHISI */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <SingleSkeleton />
            <SingleSkeleton />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">Məlumat tapılmadı</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((work) => (
              <ProjectCard key={work.id} work={work} lang={lang} />
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="mt-20 flex justify-center">
            <Pagination
              currentPage={currentPage}
              lastPage={totalPages}
              onPageChange={(page) => navigate(categorySlug || "*", page)}
            />
          </div>
        )}
      </div>
    </section>
  );
}

// Köməkçi Komponentlər (Clean Code üçün)
function CategoryItem({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer px-6 py-3 rounded-full font-bold text-[16px] transition-all duration-300
        ${isActive ? "bg-[#5D56F1] text-white shadow-lg shadow-indigo-200" : "bg-[#F4F7FA] text-[#1A1C20] hover:bg-[#5D56F1] hover:text-white"}`}
    >
      {label}
    </li>
  );
}

function ProjectCard({ work, lang }: { work: Project, lang: string }) {
  return (
    <article className="bg-[#F8F9FD] rounded-[48px] p-8 flex flex-col group h-full transition-all duration-300 ">
      <div className="relative aspect-[1.5/1] rounded-[32px] overflow-hidden mb-8 shadow-sm">
        <img
          src={work.image}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-4 pb-4">
        <Link href={`/${lang}/singleportfolio/${work.slug}`}>
          <h3 className="text-[28px] font-bold text-[#1A1C20] mb-4 group-hover:text-[#5D56F1] transition-colors leading-tight">
            {work.title}
          </h3>
        </Link>
        <p className="text-[#52525B] text-[17px] leading-relaxed line-clamp-3">
          {work.description}
        </p>
      </div>
    </article>
  );
}