"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Category, Project } from "@/types/portfolio";
import Pagination from "@/Pagination/Paginations";
import { getPortfolioWithCategories, getPortfolioCategories,}
from "@/services/PortfolioService";
import SingleSkeleton from "@/components/LoadingSkeleton/SingleLoading";
import CategoriesSkeleton from "@/components/LoadingSkeleton/CategoriesSkelet";
import PortfolioCard from "@/components/Card/PortfolioCard";

export default function PortfolioPage() {
  const params = useParams();
  const router = useRouter();

  const lang = params?.lang as string;
  const categorySlug = params?.slug as string | undefined;
  const currentPage = Number(params?.page ?? 1);

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);


  const categoriesFetched = useRef(false);


  useEffect(() => {
    if (!lang || categoriesFetched.current) return;

    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);

        const data = await getPortfolioCategories(lang);

        const mapped: Category[] = data.map((item: any) => ({
          id: Number(item.id),
          name: String(item.name),
          slug: String(item.slug),
        }));

        setCategories(mapped);
        categoriesFetched.current = true; 
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

  useEffect(() => {
    let isMounted = true;

    const fetchProjects = async () => {
      if (categorySlug && !categoryId && !categoriesLoading) return;

      setLoading(true);

      try {
        const res = await getPortfolioWithCategories(
          currentPage,
          lang,
          categoryId
        );

        if (!isMounted) return;

        const formatted: Project[] = res.data.map((item: any) => ({
          id: item.id,
          title: item.name || item.title,
          image: item.image,
          description: item.description,
          slug: item.slug,
        }));

        setProjects(formatted);
        setTotalPages(res.meta?.last_page ?? 1);
      } catch (err) {
        console.error("Projects fetch error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, [currentPage, lang, categoryId, categoriesLoading]);


  const navigate = (slug: string | "*", page: number = 1) => {
    const path =
      slug === "*"
        ? `/${lang}/portfolios/${page}`
        : `/${lang}/portfolios/category/${slug}/${page}`;

    router.push(path);
  };
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-30">
        {categoriesLoading ? (
          <CategoriesSkeleton />
        ) : (
          <nav className="mb-[50px] mt-[20px]">
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
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <SingleSkeleton />
            <SingleSkeleton />
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 text-gray-400 text-lg">
            Məlumat tapılmadı
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((work) => (
              <PortfolioCard
                key={work.id}
                id={work.id}
                title={work.title}
                description={work.description}
                image={work.image}
                slug={work.slug}
                lang={lang}
              />
            ))}
          </div>
        )}

        {!loading && totalPages > 1 && (
          <div className="mt-20 flex justify-center">
            <Pagination
              currentPage={currentPage}
              lastPage={totalPages}
              onPageChange={(page) =>
                navigate(categorySlug ?? "*", page)
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}


function CategoryItem({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <li
      onClick={onClick}
      className={`cursor-pointer px-6 py-3 rounded-full font-bold text-[16px] transition-all duration-300
        ${
          isActive
            ? "bg-[#5D56F1] text-white shadow-lg shadow-indigo-200"
            : "bg-[#F4F7FA] text-[#1A1C20] hover:bg-[#5D56F1] hover:text-white"
        }`}
    >
      {label}
    </li>
  );
}