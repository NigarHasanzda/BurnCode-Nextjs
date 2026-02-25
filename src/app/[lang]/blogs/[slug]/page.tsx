"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeader, { BlogDetail } from "@/components/HeaderContainer/PageHeader";
import { getSingleBlogPost } from "@/services/BlogService";
import SingleSkeleton from "@/components/LoadingSkeleton/SingleLoading";

export default function Page() {
  const { slug, lang } = useParams();
  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ MOCK CATEGORIES
  const categories = [
    { id: 1, name: "Technology", slug: "technology" },
    { id: 2, name: "AI", slug: "ai" },
    { id: 3, name: "Startup", slug: "startup" },
  ];

  // ✅ MOCK CONTACT SOCIAL DATA
  const contactData = {
    facebook_page: "https://facebook.com",
    instagram_page: "https://instagram.com",
    linkedin_page: "https://linkedin.com",
    twitter_page: "https://twitter.com",
  };

  useEffect(() => {
    if (!slug || !lang) return;

    const fetchBlog = async () => {
      try {
        const response = await getSingleBlogPost(slug as string, lang as string);
        setBlogDetail(response.data);
      } catch (err) {
        console.error("Xəta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, lang]);

  // 1. LOADING HALI - SingleSkeleton burada işə düşür
  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header üçün də kiçik bir boşluq və ya skeleton əlavə edilə bilər */}
        <div className="h-[200px] bg-gray-50 animate-pulse w-full mb-10" /> 
        <SingleSkeleton />
      </div>
    );
  }

  // 2. DATA TAPILMADI HALI
  if (!blogDetail) {
    return (
      <div className="text-center py-40 font-medium text-gray-500">
        Məqalə tapılmadı.
      </div>
    );
  }

  return (
    <>
      <PageHeader blogdetail={blogDetail} />

      <section className="py-[100px] pb-[50px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          
          {/* Şəkildəki pixel-perfect yuvarlaqlıq və ölçülər */}
          {blogDetail.image && (
            <div className="mb-10 w-full overflow-hidden">
              <div className="w-[98%] mx-auto overflow-hidden rounded-[48px] shadow-sm">
                <img
                  src={blogDetail.image}
                  alt={blogDetail.title}
                  className="w-full h-auto min-h-[450px] max-h-[650px] object-cover transition-all duration-500"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="max-w-[1000px] mx-auto">
            {/* Body - Şəkildəki təmiz yazı stili */}
            {blogDetail.body && (
              <div className="border-b border-gray-100 mb-12 pb-10">
                <div
                  className="prose prose-lg max-w-none text-[#1A1C20] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogDetail.body }}
                />
              </div>
            )}

            {/* Tags + Social Share */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="px-6 py-2.5 text-[15px] font-semibold bg-[#F5F7FA] text-[#4A5568] rounded-full hover:bg-black hover:text-white transition-all duration-300"
                  >
                    #{category.name}
                  </a>
                ))}
              </div>

              {/* Social Icons - Dairəvi və estetik */}
              <div className="flex gap-4">
                {Object.entries(contactData).map(([key, value]) => (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#F5F7FA] hover:text-black hover:border-black transition-all duration-300"
                  >
                    <i className={`fa-brands fa-${key.split("_")[0]} text-[20px]`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}