"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ServiceCard from "@/components/Card/ServicesCard";
import { fetchServices } from "@/services/Services";
import { Service } from "@/types/services";

const ServicePage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const langParam = searchParams.get("lang");
  const selectedLang = langParam || "az";

  const [posts, setPosts] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(posts)
  // API-dən dataları çəkirik
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchServices(selectedLang);
      setPosts(data);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    loadData();
  }, [selectedLang]);

  const handleNavigation = (slug: string) => {
    router.push(`/${selectedLang}/service/${slug}`);
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Yüklənir...
      </div>
    );
  }

  return (
    <div className="latest-news bg-[#F7F8FD] our-blog py-[80px] sm:py-[100px]">
      <div className="container mx-auto px-5 sm:px-6 lg:px-26">
        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="cursor-pointer"
                onClick={() => handleNavigation(post.slug)}
              >
                <ServiceCard
                  name={post.name}
                  image={post.image}
                  description={post.description}
                  slug={post.slug}
                  lang={selectedLang}
                  bgColor="#ffffff"
                />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">
              Heç bir xidmət tapılmadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;