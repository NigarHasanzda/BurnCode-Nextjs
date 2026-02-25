"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Pagination from "@/Pagination/Paginations";
import BlogCard from "@/components/Card/BlogCard";
import { BlogPost, BlogResponse } from "@/types/blog";
import api from "@/lib/api";

const BlogPage = () => {
  const router = useRouter();
  const params = useParams();

  // URL-dən məlumatları alırıq (Məsələn: /az/blog/2)
  const lang = (params.lang as string) || "en";
  const currentPage = parseInt(params.page as string, 10) || 1;

  // State-lər (Ancaq data üçün)
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // API sorğusu funksiyası
  const fetchPosts = useCallback(async (page: number, language: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/blog?page=${page}`, {
        headers: { "Accept-Language": language },
      });
      const data: BlogResponse = res.data;
      setPosts(data.data || []);
      setTotalPages(data.meta?.last_page || 1);
    } catch (err: any) {
      setError(err.message || "Xəta baş verdi");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effekt: Yalnız URL-dəki 'lang' və ya 'currentPage' dəyişəndə işə düşür
  useEffect(() => {
    fetchPosts(currentPage, lang);
    
    // LocalStorage-i sinxron saxlamaq üçün (istəyə bağlı)
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
  }, [currentPage, lang, fetchPosts]);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    // URL-i dəyişirik, useEffect avtomatik tutacaq
    router.push(`/${lang}/blog/${page}`, { scroll: true });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton Loader
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
            ))
          ) : error ? (
            <p className="col-span-3 text-center text-red-500">{error}</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                image={post.image}
                created_at={post.created_at}
                slug={post.slug}
                lang={lang}
              />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">Məqalə tapılmadı.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-12 flex justify-center">
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
};

export default BlogPage;