// ServicesSection.tsx
import React from 'react';
import PrimaryButton from '@/components/Button/Button'; 
import ServiceCard from '@/components/Card/ServicesCard';

interface Service {
  name: string;
  description: string;
  image: string;
  slug: string;
}

interface ServicesSectionProps {
  lang: string;
  t?: any; 
}

// Statik mock data
const dataArray: Service[] = [
  { name: "Web Development", description: "Responsive and modern web solutions Responsive and modern web solutions Responsive and modern web solutions.", image: "/service-img-1.jpg", slug: "web-development" },
  { name: "Mobile Apps", description: "Cross-platform mobile Responsive and modern web solutions applications.", image: "/service-img-1.jpg", slug: "mobile-apps" },
  { name: "UI/UX Design", description: "User-friendly and attractive interfaces.", image: "/service-img-1.jpg", slug: "ui-ux-design" },
  { name: "E-commerce Solutions", description: "Seamless online stores.", image: "/service-img-1.jpg", slug: "ecommerce-solutions" },
  { name: "Digital Marketing", description: "Boost your business visibility.", image: "/service-img-1.jpg", slug: "digital-marketing" },
  { name: "SEO Optimization", description: "Improve search engine ranking.", image: "/service-img-1.jpg", slug: "seo-optimization" },
];

const ServicesSection = ({ lang, t = {} }: ServicesSectionProps) => {
  return (
    <section className="bg-[#F7F8FD] py-[100px] px-10 pb-[70px]">
      <div className="container mx-auto px-4 max-w-[72%]">
        <div className="flex flex-wrap items-center mb-12">
          <div className="w-full md:w-7/12">
            <div className="mb-4">
              <span className="block text-[#5e5ce6] font-semibold mb-2 uppercase tracking-wide">
                {t?.ourServices || "Our Services"}
              </span>
              <h2 className="text-[42px] font-bold text-[#1e1e2f] leading-tight">
                {t?.whatWeOffer || "What We Offer"}
              </h2>
            </div>
          </div>

          <div className="w-full md:w-5/12 flex md:justify-end">
            <PrimaryButton 
              text={t?.viewAllServices || "View All Services"} 
              path={`services`} 
            />
          </div>
        </div>

        {/* Grid Area */}
        <div className="flex flex-wrap -mx-4">
          {dataArray.map((service, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <ServiceCard
                name={service.name}
                description={service.description}
                image={service.image}
                slug={service.slug}
                lang={lang}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
