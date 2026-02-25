"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Pagination from "@/Pagination/Paginations";
import BlogCard from "@/components/Card/BlogCard";
import { BlogPost, BlogResponse } from "@/types/blog";
import api from "@/lib/api";
import CardSkeleton from "@/components/LoadingSkeleton/ThreeLOadingCard";

const BlogPage = () => {
  const router = useRouter();
  const params = useParams();

  const lang = (params.lang as string) || "en";
  const currentPage = parseInt(params.page as string, 10) || 1;

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchPosts(currentPage, lang);
  }, [currentPage, lang, fetchPosts]);

  const handlePageChange = (page: number) => {
    if (page === currentPage) return;
    router.push(`/${lang}/blog/${page}`, { scroll: true });
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-28">
        {/* Loading zamanı ayrıca Skeleton konteyneri göstəririk, 
            çünki Skeletonun daxilində artıq öz Grid sistemi var.
        */}
        {loading ? (
          <CardSkeleton />
        ) : error ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <p className="col-span-full text-center text-red-500">{error}</p>
          </div>
        ) : posts.length > 0 ? (
          /* Bura diqqət: 'items-start' əlavə etdim ki, 
             şəkildəki fərqli hündürlüklü kartlar bir-birini dartmasın (stretch etməsin).
          */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-start">
            {posts.map((post, index) => (
              <BlogCard
                key={post.id}
                title={post.title}
                image={post.image}
                created_at={post.created_at}
                slug={post.slug}
                lang={lang}
                // Əgər BlogCard daxilində pilləkən effekti (mt-X) 
                // yazıbsansa, 'index' ötürməyi unutma:
                // index={index} 
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-20">Məqalə tapılmadı.</p>
        )}

        {/* Pagination bölməsi */}
        {totalPages > 1 && !loading && (
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
};

export default BlogPage;