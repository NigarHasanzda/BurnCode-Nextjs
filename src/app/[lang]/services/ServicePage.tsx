"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ServiceCard from "@/components/Card/ServicesCard";

const mockPosts = [
  { id: 1, title: "React ilə Frontend İnkişafı", image: "/service-img-1.jpg", created_at: "2026-02-01", slug: "react-frontend" },
  { id: 2, title: "Next.js ilə SSR və SEO", image: "/service-img-2.jpg", created_at: "2026-02-02", slug: "nextjs-ssr-seo" },
  { id: 3, title: "TypeScript ilə Təhlükəsiz Kod", image: "/service-img-3.jpg", created_at: "2026-02-03", slug: "typescript-safe-code" },
  { id: 4, title: "Node.js API Yaratmaq", image: "/service-img-4.jpg", created_at: "2026-02-04", slug: "nodejs-api" },
  { id: 5, title: "MERN Stack Layihəsi", image: "/service-img-5.jpg", created_at: "2026-02-05", slug: "mern-stack-project" },
  { id: 6, title: "UI/UX Dizayn Prinsipləri", image: "/service-img-6.jpg", created_at: "2026-02-06", slug: "ui-ux-design" },
  { id: 7, title: "SEO və Digital Marketinq", image: "/service-img-7.jpg", created_at: "2026-02-07", slug: "seo-digital-marketing" },
  { id: 8, title: "Web Performance Optimization", image: "/service-img-8.jpg", created_at: "2026-02-08", slug: "web-performance" },
  { id: 9, title: "Frontend Testing Strategiyaları", image: "/service-img-9.jpg", created_at: "2026-02-09", slug: "frontend-testing" },
  { id: 10, title: "Next.js Layout və Routing", image: "/service-img-10.jpg", created_at: "2026-02-10", slug: "nextjs-layout-routing" },
];

const POSTS_PER_PAGE = 6;

const Service: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const [posts, setPosts] = useState<typeof mockPosts>([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    setPosts(mockPosts.slice(start, end));
    setTotalPages(Math.ceil(mockPosts.length / POSTS_PER_PAGE));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleNavigation = (slug: string) => {
    router.push(`/blogs/${slug}`);
  };

  return (
    <div className="latest-news bg-[#F7F8FD] our-blog py-[80px] sm:py-[100px]">
      <div className="container mx-auto px-5 sm:px-6 lg:px-26">
        {/* Blog Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="cursor-pointer"
                onClick={() => handleNavigation(post.slug)}
              >
                <ServiceCard
                  name={post.title}
                  image={post.image}
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  slug={post.slug}
                  lang="az"
                  bgColor="#ffffff"
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              Heç bir məqalə tapılmadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Service;
