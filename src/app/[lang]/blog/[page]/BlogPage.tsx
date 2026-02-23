"use client";

import { useState, useEffect } from "react";
import Pagination from "@/Pagination/Paginations";
import BlogCard from "@/components/Card/BlogCard";
import { BlogPost, BlogResponse } from "@/types/blog";
import api from "@/lib/api";

const BlogPage = ({ lang: initialLang }: { lang?: string }) => {
  const [lang, setLang] = useState<string>(initialLang || "az");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  console.log(posts)

  console.log(posts);
  // Initial lang from localStorage
  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || initialLang || "az";
    setLang(storedLang);
  }, [initialLang]);

  // Fetch posts function
  const fetchPosts = async (page: number, language: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/blog?page=${page}`, {
        headers: { "Accept-Language": language }, // hər requestdə lang göndər
      });
      const data: BlogResponse = res.data;
      setPosts(data.data);
      setTotalPages(data.meta?.last_page || 1);
    } catch (err: any) {
      setError(err.message || "Failed to fetch posts");
      setPosts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Trigger API on lang or page change
  useEffect(() => {
    fetchPosts(currentPage, lang);
  }, [lang, currentPage]);

  // Handle lang change
  const handleLangChange = (newLang: string) => {
    if (newLang === lang) return;
    setLang(newLang);
    setCurrentPage(1); // page reset
    localStorage.setItem("lang", newLang);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-20">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-80 bg-gray-200 animate-pulse rounded-lg" />
              ))
            : error
            ? <p className="col-span-3 text-center text-red-500">{error}</p>
            : posts.map(post => (
                <BlogCard
                  key={post.id}
                  title={post.title}
                  image={post.image}
                  created_at={post.created_at}
                  slug={post.slug}
                  lang={lang}
                />
              ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            lastPage={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </section>
  );
};

export default BlogPage;