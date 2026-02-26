"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PrimaryButton from "@/components/Button/Button";
import { getBlogPosts } from "@/services/BlogService";
import { BlogPost } from "@/types/blog";
import BlogCard from "@/components/Card/BlogCard";

const LatestBlogArticle = ({ t = {} }: { t?: any }) => {
  const params = useParams();
  const lang = (params?.lang as string) || "az";

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const response = await getBlogPosts(1, lang);
        setPosts(response.data);
      } catch (error) {
        console.error("Blogları çəkərkən xəta baş verdi:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, [lang]);

  if (loading) return <div className="py-20 text-center">Yüklənir...</div>;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:max-w-[1240px]">

        {/* Header */}
        <div className="flex flex-col align-center md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl mx-auto md:mx-0 text-center md:text-left">
            <span className="block text-[#5e5ce6] font-[700] text-sm mb-3 uppercase tracking-wider">
              {t?.ourServices || "Latest Blogs & Articles"}
            </span>
            <h2 className="text-[36px] md:text-[40px] font-[600] text-[#1e1e2f] leading-tight">
              {t?.whatWeOffer || "The latest insights you need to know"}
            </h2>
          </div>

          <div className="flex justify-center md:justify-start mt-4 md:mt-0">
            <PrimaryButton
              text={t?.viewAllArticles || "View All Articles"}
              path={`/blog/1`}
            />
          </div>
        </div>

        {/* Grid - İlk 3 yazı */}
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

      </div>
    </section>
  );
};

export default LatestBlogArticle;