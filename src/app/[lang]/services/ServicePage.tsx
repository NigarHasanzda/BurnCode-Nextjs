"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import ServiceCard from "@/components/Card/ServicesCard";
import { fetchServices } from "@/services/Services";
import { Service } from "@/types/services";

const ServicePage: React.FC = () => {
  const router = useRouter();
const params = useParams();
const lang = (params.lang || "az") as string; 

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchServices(lang); // ✅ lang həmişə string
      setServices(data);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    loadData();
  }, [lang]);

  const handleNavigation = (slug: string) => {
    router.push(`/${lang}/service/${slug}`);
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Yüklənir...
      </div>
    );
  }

  return (
    <section className="bg-[#F7F8FD] py-[80px] sm:py-[100px]">
      <div className="container mx-auto px-5 sm:px-6 lg:px-26">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {services.length > 0 ? (
            services.map((service) => (
              <div
                key={service.id}
                className="cursor-pointer"
                onClick={() => handleNavigation(service.slug)}
              >
                <ServiceCard
                  name={service.name}
                  image={service.image}
                  description={service.description}
                  slug={service.slug}
                  lang={lang}
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
    </section>
  );
};

export default ServicePage;