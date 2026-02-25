"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import PageHeader, { BlogDetail } from "@/components/HeaderContainer/PageHeader";
import { getSingleBlogPost } from "@/services/blog/BlogService";

export default function Page() {
  const { slug, lang } = useParams();
  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null);
  const [loading, setLoading] = useState(true);

  console.log("Slug:", slug, "Lang:", lang , "Data:", blogDetail); // Debug üçün əlavə edildi
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
      const response = await getSingleBlogPost(
        slug as string,
        lang as string
      );

      setBlogDetail(response.data); // ✅ İNDİ DÜZGÜNDÜR
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

  return (
    <>
      <PageHeader blogdetail={blogDetail} />

      <section className="py-[100px] pb-[50px]">
        <div className="max-w-[1200px] mx-auto px-4">

          {/* Image */}
          {blogDetail.image && (
            <div className="mb-10 overflow-hidden">
              <div className="w-[95%] h-[600px] mx-auto overflow-hidden rounded-[40px]">
                <img
                  src={blogDetail.image}
                  alt={blogDetail.title}
                  className="w-full h-[500px] object-cover rounded-[40px]"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="max-w-[1100px] mx-auto">

            {/* Body */}
            {blogDetail.body && (
              <div className="border-b border-gray-200 mb-8 -mt-[90px]">
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blogDetail.body }}
                />
              </div>
            )}

            {/* Tags + Social */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              {/* Tags */}
              <div className="flex flex-wrap gap-4">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="px-5 py-3 font-medium bg-gray-100 text-gray-800 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-300"
                  >
                    {category.name}
                  </a>
                ))}
              </div>

              {/* Social */}
              <div className="flex gap-3">
                {Object.entries(contactData).map(([key, value]) => (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[50px] h-[50px] rounded-full bg-indigo-600 border-2 border-indigo-600 flex items-center justify-center hover:bg-white transition-all duration-300"
                  >
                    <i className={`fa-brands fa-${key.split("_")[0]} text-white hover:text-indigo-600 text-[22px] transition-all`}></i>
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