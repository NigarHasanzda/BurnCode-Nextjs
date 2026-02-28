"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getBlogCategories, getBlogsByCategory } from "@/services/BlogService";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardSkeleton from "@/components/LoadingSkeleton/ThreeLOadingCard";
import FadeInFromBottom from "@/FadeInWhenVisible/FadeFromBottom";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  image: string;
  created_at: string;
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
}

export default function BlogByCategory() {
  const { slug, lang } = useParams();
  const router = useRouter();

  // ✅ TypeScript üçün lang string olaraq təsdiqlə
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
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <FadeInFromBottom key={post.id}>
            <div
              className="blog-item cursor-pointer rounded-[40px] bg-[#F7F8FD] p-5 pb-10 flex flex-col transition-all hover:shadow-lg"
              onClick={() => router.push(`/${language}/blog/${post.slug}`)}
            >
              <div className="overflow-hidden rounded-[30px] mb-6">
                <img src={post.image} alt={post.title} className="w-full h-[250px] object-cover" />
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <CalendarMonthIcon sx={{ fontSize: 15 }} />
                  {post.created_at}
                </p>
                <h2 className="text-lg font-semibold text-[#1A1C20]">{post.title}</h2>
              </div>
            </div>
          </FadeInFromBottom>
        ))}
      </div>
    </div>
  );
}