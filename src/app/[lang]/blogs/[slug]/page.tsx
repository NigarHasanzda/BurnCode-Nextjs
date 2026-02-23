"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeader, { BlogDetail } from "@/components/PageHeader/PageHeader";
import { getSingleBlogPost } from "@/services/blog/BlogService";

export default function Page() {
  const { slug, lang } = useParams();
  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug || !lang) return;

    const fetchBlog = async () => {
      try {
        const res = await getSingleBlogPost(slug as string, lang as string);
        console.log("Slug-a görə gələn data:", res);
        setBlogDetail(res); // birbaşa res, .data yoxdur
      } catch (err) {
        console.error("Xəta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, lang]);

  if (loading) return <div className="text-center py-20">Yüklənir...</div>;
  if (!blogDetail) return <div className="text-center py-20">Data tapılmadı</div>;

  return <PageHeader blogdetail={blogDetail} />;
}