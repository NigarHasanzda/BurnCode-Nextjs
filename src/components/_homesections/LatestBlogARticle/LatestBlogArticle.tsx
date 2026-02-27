"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PrimaryButton from "@/components/Button/Button";
import { getBlogPosts } from "@/services/BlogService";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/Card/BlogCard";
import CardSkeleton from "@/components/LoadingSkeleton/ThreeLOadingCard";

// JSON-ları import edirik
import az from '../../../locales/az.json';
import en from '../../../locales/en.json';
import ru from '../../../locales/ru.json';
import FadeInLeftWhenVisible from "@/FadeInWhenVisible/FadeInLeftWhenVisible";
import FadeInRightWhenVisible from "@/FadeInWhenVisible/FadeInWhenVisible";

const translations = { az, en, ru };

const LatestBlogArticle = () => {
  const params = useParams();
  const lang = (params?.lang as "az" | "en" | "ru") || "az";
  
  // Aktiv tərcüməni seçirik
  const t = translations[lang]?.latestBlog || translations.az.latestBlog;

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogPosts(1, lang);
        setPosts(response.data);
      } catch (error) {
        console.error("Blog fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, [lang]);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:max-w-[70%]">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <FadeInLeftWhenVisible>
            <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-left">
            <span className="block text-[#5e5ce6] font-[700] text-sm mb-3 uppercase tracking-wider">
              {t.subtitle}
            </span>
            <h2 className="text-[32px] md:text-[40px] font-[600] text-[#1e1e2f] leading-tight">
              {t.title}
            </h2>
          </div>
          </FadeInLeftWhenVisible>
<FadeInRightWhenVisible>

          <div className="flex justify-center md:justify-start mt-4 md:mt-0">
            <PrimaryButton
              text={t.viewAll}
              path={`/blog/1`} 
            />
          </div>
</FadeInRightWhenVisible>
        </div>

        {/* Content Grid */}
        {loading ? (
          <CardSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
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
        )}

      </div>
    </section>
  );
};

export default LatestBlogArticle;