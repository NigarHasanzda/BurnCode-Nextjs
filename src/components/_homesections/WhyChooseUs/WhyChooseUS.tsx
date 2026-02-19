import React from 'react';
import Link from 'next/link';

// Qeyd: Ikon yollarını öz layihənizə uyğun tənzimləyin
const mockItems = [
  { icon: "/icon-whyus-1.svg", title: "Innovation at Core", desc: "We stay ahead of the curve by implementing the latest technologies." },
  { icon: "/icon-whyus-2.svg", title: "Quality Driven", desc: "Our rigorous testing ensures we deliver high-performance products." },
  { icon: "/icon-whyus-3.svg", title: "Maximum Value", desc: "We optimize processes to deliver premium results for your investment." },
];

const WhyChooseUs = () => {
  // Mock verilənlər (t, lang, contact normalda props-dan gəlməlidir)
  const lang = "en";
  const contact = { linkedin_page: "#", instagram_page: "#" };
  const t = {
    whyBurncode: "Why Burncode",
    discoverTrust: "Discover the reasons to trust our expertise",
    readyExplore: "Ready to explore our digital universe?",
    transformIdeas: "We transform your boldest ideas into market-leading digital realities with precision and passion.",
    connectLinkedIn: "LinkedIn",
    connectInstagram: "Instagram"
  };

  return (
    <section className="bg-[#F7F8FD] py-[100px] px-0">
      <div className="max-w-[1320px] mx-auto px-4">
        
        {/* Üst Başlıq Hissəsi */}
        <div className="flex flex-wrap items-center mb-12">
          <div className="w-full lg:w-8/12 md:w-full px-3">
            <div className="space-y-2">
              <h3 className="text-[#5e5ce6] font-semibold text-sm uppercase tracking-wider">
                {t.whyBurncode}
              </h3>
              <h2 className="text-[42px] font-bold text-[#1e1e2f] leading-tight">
                {t.discoverTrust}
              </h2>
            </div>
          </div>
        </div>

        {/* 3-lü Kart Sırası */}
        <div className="flex flex-wrap -mx-3 mb-8">
          {mockItems.map((item, index) => (
            <div key={index} className="w-full lg:w-1/3 md:w-1/2 px-3 mb-8">
              <div className="bg-white rounded-[40px] p-10 h-[calc(100%-30px)] transition-all duration-300 hover:shadow-sm">
                <div className="mb-[30px]">
                  <img src={item.icon} alt={item.title} className="w-16 h-16 object-contain" />
                </div>
                <h3 className="text-[26px] font-bold text-[#1e1e2f] capitalize mb-5">
                  {item.title}
                </h3>
                <p className="text-[#666] m-0 leading-relaxed text-[16px]">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Explore Alt Kartı */}
        <div className="w-full px-3">
          <div className="relative bg-white rounded-[40px] p-[70px] overflow-hidden">
            
            {/* Sağ Üstdəki İkon */}
            <div className="absolute top-[70px] right-[70px] hidden lg:block">
              <img src="/icon-whyus-4.svg" alt="Explore Icon" className="w-20 h-20" />
            </div>

            <div className="flex flex-wrap mb-[60px]">
              <div className="w-full lg:w-10/12">
                <h2 className="text-[42px] font-bold text-[#1e1e2f] leading-tight max-w-[800px]">
                  {t.readyExplore}
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center">
              <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
                <p className="text-[#666] text-[17px] leading-relaxed m-0">
                  {t.transformIdeas}
                </p>
              </div>

              <div className="w-full lg:w-1/2 lg:text-end">
                <ul className="list-none p-0 m-0 flex lg:justify-end gap-5">
                  <li>
                    <a 
                      href={contact?.linkedin_page} 
                      target="_blank" 
                      className="inline-block bg-[#f3f4f6] text-[#1e1e2f] font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-[#5e5ce6] hover:text-white"
                    >
                      {t.connectLinkedIn}
                    </a>
                  </li>
                  <li>
                    <a 
                      href={contact?.instagram_page} 
                      target="_blank" 
                      className="inline-block bg-[#f3f4f6] text-[#1e1e2f] font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:bg-[#5e5ce6] hover:text-white"
                    >
                      {t.connectInstagram}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;