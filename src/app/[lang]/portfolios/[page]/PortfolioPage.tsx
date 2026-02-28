"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { Project } from "@/types/portfolio";
import Pagination from "@/Pagination/Paginations";

export default function PortfolioPage() {
  const params = useParams();
  const router = useRouter();

  const lang = params?.lang as string;
  const categorySlug = params?.slug as string | undefined; // undefined if no category
  const currentPage = Number(params?.page) || 1;

  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Kateqoriyaları gətir
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get(`/projects/categories`, {
          headers: { "Accept-Language": lang },
        });
        setCategories(res.data.data);
      } catch (err) {
        console.error("Kateqoriya xətası:", err);
      }
    };

    if (lang) fetchCategories();
  }, [lang]);

  // 2️⃣ Portfolioları gətir
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        let url = "";
        if (categorySlug) {
          // category slug varsa, category endpoint istifadə et
          url = `/projects/categories/${categorySlug}?page=${currentPage}&lang=${lang}`;
        } else {
          url = `/projects?page=${currentPage}&lang=${lang}`;
        }

        const res = await api.get(url);
        const items = res.data.data.map((item: any) => ({
          id: item.id,
          title: item.name || item.title,
          image: item.image,
          description: item.description,
          slug: item.slug,
        }));

        setProjects(items);
        setTotalPages(res.data.meta?.last_page || 1);
      } catch (err) {
        console.error("Layihə yükləmə xətası:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [categorySlug, currentPage, lang]);

  // 3️⃣ Category filter click
  const handleFilterClick = (slug: string | "*") => {
    if (slug === "*") {
      router.push(`/${lang}/portfolios/1`);
    } else {
      router.push(`/${lang}/portfolios/category/${slug}/1`);
    }
  };

  // 4️⃣ Pagination click
  const handlePageChange = (page: number) => {
    if (categorySlug) {
      router.push(`/${lang}/portfolios/category/${categorySlug}/${page}`);
    } else {
      router.push(`/${lang}/portfolios/${page}`);
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-10">

        {/* CATEGORY NAV */}
        <div className="mb-[50px]">
          <ul className="flex flex-wrap items-center justify-center gap-3">
            <li
              onClick={() => handleFilterClick("*")}
              className={`cursor-pointer px-6 py-3 rounded-full font-bold text-[16px] transition-all
                ${!categorySlug ? "bg-[#5D56F1] text-white" : "bg-[#F4F7FA] text-[#1A1C20] hover:bg-[#5D56F1] hover:text-white"}`}
            >
              All
            </li>
            {categories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => handleFilterClick(cat.slug)}
                className={`cursor-pointer px-6 py-3 rounded-full font-bold text-[16px] transition-all
                  ${categorySlug === cat.slug ? "bg-[#5D56F1] text-white" : "bg-[#F4F7FA] text-[#1A1C20] hover:bg-[#5D56F1] hover:text-white"}`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>

        {/* GRID SECTION */}
        {loading ? (
          <div className="text-center py-20">Yüklənir...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((work) => (
              <div key={work.id} className="bg-[#F8F9FD] rounded-[48px] p-8 flex flex-col group h-full">
                <div className="relative aspect-[1.5/1] rounded-[32px] overflow-hidden mb-8 shadow-sm">
                  <img src={work.image} alt={work.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="px-4 pb-4">
                  <Link href={`/${lang}/portfolios/detail/${work.slug}`}>
                    <h3 className="text-[28px] font-bold text-[#1A1C20] mb-4 group-hover:text-[#5D56F1] transition-colors">{work.title}</h3>
                  </Link>
                  <p className="text-[#52525B] text-[17px] leading-relaxed line-clamp-3">{work.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="mt-20 flex justify-center">
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