"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import PageHeader, { BlogDetail } from "@/components/HeaderContainer/PageHeader";
import { getBlogCategories, getSingleBlogPost } from "@/services/BlogService";
import SingleSkeleton from "@/components/LoadingSkeleton/SingleLoading";
import { BlogCategory } from "@/types/blog";
import { getContactInfo } from "@/services/Contact";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Page() {
  const { slug, lang } = useParams();

  const [blogDetail, setBlogDetail] = useState<BlogDetail | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [contactData, setContactData] = useState<any>(null); // ✅ State for contact info
  const [loading, setLoading] = useState(true);

  // 1. Fetch Contact Info
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await getContactInfo();
        setContactData(data); // ✅ Save to state
      } catch (err) {
        console.error("Contact məlumatı alınmadı:", err);
      }
    };
    fetchContact();
  }, []);

  // 2. Fetch Categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await getBlogCategories(lang as string);
        setCategories(res.data);
      } catch (error) {
        console.error("Category error:", error);
      }
    };
    if (lang) loadCategories();
  }, [lang]);

  // 3. Fetch Single Blog Post
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

  // Define socials inside the render or use useMemo
  const socials = [
    { 
      name: "facebook", 
      icon: <FacebookIcon />, 
      color: "#5D56F1", 
      href: contactData?.facebook_page || "#" 
    },
    { name: "instagram", icon: <InstagramIcon />, color: "#5D56F1", href: contactData?.instagram_page || "#"  },
    { name: "linkedin", icon: <LinkedInIcon />, color: "#5D56F1", href: contactData?.linkedin_page || "#" },
    { name: "twitter", icon: <TwitterIcon />, color: "#5D56F1", href: contactData?.twitter_page || "#" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="h-[200px] bg-gray-50 animate-pulse w-full mb-10" />
        <SingleSkeleton />
      </div>
    );
  }

  if (!blogDetail) {
    return <div className="text-center py-40 font-medium text-gray-500">Məqalə tapılmadı.</div>;
  }

  return (
    <>
      <PageHeader blogdetail={blogDetail} />
      <section className="py-[100px] pb-[50px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4">
          {blogDetail.image && (
            <div className="mb-10 w-full overflow-hidden">
              <div className="w-[98%] mx-auto overflow-hidden rounded-[48px] shadow-sm">
                <img
                  src={blogDetail.image}
                  alt={blogDetail.title}
                  className="w-full h-auto min-h-[450px] max-h-[650px] object-cover"
                />
              </div>
            </div>
          )}

          <div className="max-w-[1000px] mx-auto">
            {/* Content Body */}
            {blogDetail.body && (
              <div className="border-b border-gray-100 mb-12 pb-10">
                <div
                  className="prose prose-lg max-w-none text-[#1A1C20] leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: blogDetail.body }}
                />
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
              {/* Category Tags */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/${lang}/blog/category/${category.slug}`}
                    className="px-6 py-2.5 text-[15px] font-semibold bg-[#F5F7FA] text-[#25272c] rounded-full hover:bg-[#5D56F1] hover:text-white transition-all"
                  >
                    {category.name}
                  </a>
                ))}
              </div>

              <div className="flex gap-4">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
                    style={{ backgroundColor: social.color }}
                  >
                    {React.cloneElement(social.icon, { style: { color: "#fff" } })}
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