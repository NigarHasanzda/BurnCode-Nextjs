"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getBlogCategories, getBlogsByCategory } from "@/services/BlogService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardSkeleton from "@/components/LoadingSkeleton/ThreeLOadingCard";
import FadeInFromBottom from "@/FadeInWhenVisible/FadeFromBottom";
import BlogCard from "@/components/Card/BlogCard";
import { BlogCategory, BlogPost } from "@/types/blog";





export default function BlogByCategory() {
const params = useParams<{ slug: string; lang: string }>();

const slug = params.slug;
const lang = params.lang;
  const router = useRouter();
  const language = lang as string;

  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1️⃣ Categories fetch
  useEffect(() => {
    if (!language) return;
    const fetchCategories = async () => {
      try {
        const res = await getBlogCategories(language);
        setCategories(res.data || []);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };
    fetchCategories();
  }, [language]);

  // 2️⃣ Get category ID from slug
  const selectedCategory = categories.find((c) => c.slug === slug);
  const categoryId = selectedCategory?.id;

  // 3️⃣ Fetch posts by category
  useEffect(() => {
    if (!categoryId || !language) return;
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const res = await getBlogsByCategory(categoryId, 1, language);
        setPosts(res.data || []);
      } catch (err: any) {
        setError(err.message || "Xəta baş verdi");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [categoryId, language]);

  // Skeleton və error handling
  if (!selectedCategory) return <CardSkeleton />;
  if (loading) return <CardSkeleton />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!posts.length) return <p className="text-center py-20 text-gray-500">Məqalə tapılmadı.</p>;

  return (
       <section className="py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-28">
        {loading ? (
          <CardSkeleton />
        ) : error ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <p className="col-span-full text-center text-red-500">{error}</p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 items-start">
            {posts.map((post, index) => (
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
        ) : (
          <p className="text-center text-gray-500 py-20">Məqalə tapılmadı.</p>
        )}

      </div>
    </section>
  );
}