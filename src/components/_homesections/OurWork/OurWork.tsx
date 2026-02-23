import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PrimaryButton from '@/components/Button/Button';

// Mock Data
const mockWorks = [
  {
    id: 1,
    title: "Operation Atlas",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/service-img-1.jpg",
  },
  {
    id: 2,
    title: "Quantum Quest",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/service-img-1.jpg",
  },
  {
    id: 3,
    title: "Blue Horizon Initiative",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/service-img-1.jpg",
  },
  {
    id: 4,
    title: "Project Alpha",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/service-img-1.jpg",
  }
];

const OurWork = () => {
  // Real proyektinizdə t və lang obyektləri props-dan gələcək
  const lang = "en";
  const t = {
    ourWorks: "our works",
    excellence: "Excellence from concept to completion",
    allPortfolio: "All portfolio"
  };

  return (
    <section className="py-[100px] pb-[70px] bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Başlıq Hissəsi */}
        <div className="flex flex-wrap items-center mb-12">
          <div className="w-full md:w-9/12 lg:w-8/12">
            <div className="mb-4">
              <span className="block text-[#5e5ce6] font-semibold mb-2 uppercase tracking-widest text-sm">
                {t.ourWorks}
              </span>
              <h2 className="text-[42px] font-bold text-[#1e1e2f] leading-tight">
                {t.excellence}
              </h2>
            </div>
          </div>
          
          <div className="w-full md:w-3/12 lg:w-4/12 flex md:justify-end">
            <PrimaryButton 
              text={t.allPortfolio} 
              path={`/portfolio`} 
            />
          </div>
        </div>

        {/* Grid Area */}
        <div className="flex flex-wrap -mx-4">
          {mockWorks.map((work) => (
            <div key={work.id} className="w-full md:w-1/2 px-4">
              {/* Works Item Card */}
              <div className="group bg-[#f3f4f6] rounded-[40px] p-5 pb-10 mb-[30px] h-[calc(100%-30px)] transition-all duration-300">
                
                {/* Image Section */}
                <div className="mb-[30px] rounded-[30px] overflow-hidden transform-gpu">
                  <div className="relative h-[300px] w-full overflow-hidden">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover rounded-[30px] transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-5">
                  <h2 className="text-[26px] font-bold text-[#1e1e2f] capitalize mb-5 leading-tight">
                    {work.title}
                  </h2>
                  <p className="text-[#666] m-0 leading-relaxed">
                    {work.description}
                  </p>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default OurWork;