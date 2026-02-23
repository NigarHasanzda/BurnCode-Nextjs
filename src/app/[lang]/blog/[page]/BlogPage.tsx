"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Pagination from "@/Pagination/Paginations";
import BlogCard from "@/components/Card/BlogCard";

interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
}

interface BlogPageProps {
  lang?: string;
}

const BlogPage: React.FC<BlogPageProps> = ({ lang: initialLang }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [lang, setLang] = useState<string>(initialLang || "az");

  // Lang-i localStorage və prop-dan oxu
  useEffect(() => {
    if (initialLang) {
      localStorage.setItem("lang", initialLang);
      setLang(initialLang);
    } else {
      const storedLang = localStorage.getItem("lang");
      if (storedLang) setLang(storedLang);
    }
  }, [initialLang]);

  // URL-dən page-i oxu
  const pageFromURL = Number(pathname.split("/").pop());
  const currentPage = !isNaN(pageFromURL) ? pageFromURL : 1;
  const posts: Post[] = [
    { id: 1, title: "ASML: The Invisible Giant Powering Global Chip Production", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", date: "2025-09-24" },
    { id: 2, title: "The Future of Artificial Intelligence", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995", date: "2025-08-29" },
    { id: 3, title: "ASML: The Invisible Giant Powering Global Chip Production", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", date: "2025-09-24" },
    { id: 4, title: "The Future of Artificial Intelligence", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995", date: "2025-08-29" },
    { id: 5, title: "ASML: The Invisible Giant Powering Global Chip Production", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", date: "2025-09-24" },
    { id: 6, title: "The Future of Artificial Intelligence", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995", date: "2025-08-29" },
     { id: 1, title: "ASML: The Invisible Giant Powering Global Chip Production", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", date: "2025-09-24" },
     { id: 3, title: "ASML: The Invisible Giant Powering Global Chip Production", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", date: "2025-09-24" },
     { id: 4, title: "The Future of Artificial Intelligence", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995", date: "2025-08-29" },
     { id: 5, title: "ASML: The Invisible Giant Powering Global Chip Production", image: "https://images.unsplash.com/photo-1518770660439-4636190af475", date: "2025-09-24" },
    { id: 2, title: "The Future of Artificial Intelligence", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995", date: "2025-08-29" },
    { id: 6, title: "The Future of Artificial Intelligence", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995", date: "2025-08-29" },
    
  ];
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (page: number) => {
    router.push(`/${lang}/blog/${page}`, { scroll: false });
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 lg:px-26">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paginatedPosts.map((post) => (
            <BlogCard
      key={post.id}
      title={post.title}
      image={post.image}
      date={post.date}
    />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          lastPage={totalPages}
          lang={lang}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default BlogPage;
