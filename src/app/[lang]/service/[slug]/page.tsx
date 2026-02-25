"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import CallMadeIcon from '@mui/icons-material/CallMade'; // Ox ikonu üçün MUI istifadə edə bilərsən
import PrimaryButton from '@/components/Button/Button';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Page = () => {
    const { slug, lang } = useParams();

    const SERVICES_DATA = [
        {
            slug: "web-development",
            name: "Embedded Programing", // Şəkildəki ada uyğunlaşdırıldı
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072",
            body: "<h2 class='text-[20px] font-bold text-[#111827] mb-4'>Embedded Programming Services</h2><p class='text-[#4B5563] mb-6'>Embedded programming is a specialized field of software development focused on creating software that runs on embedded systems. These systems are at the heart of countless everyday devices and machinery, ranging from smartphones and smart appliances to automotive control systems and industrial machinery.</p>",
            description: "Key Features of Our Embedded Programming Services:\n\n1. Expertise: Our team of experienced embedded software engineers possesses a deep understanding of microcontrollers, microprocessors, and real-time operating systems (RTOS).",
            features: [
                "WordPress Support & Maintenance",
                "1,000+ Completed Projects",
                "Content Migration",
                "Plugin Installation and Customization",
                "Fast Load Time",
                "Easy Back-End Admin Panel"
            ]
        }
    ];

    const matchedProduct = SERVICES_DATA.find((item) => item.slug === slug) || SERVICES_DATA[0];

    return (
        <div className="bg-white py-14 md:py-24">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex flex-wrap -mx-6">

                    {/* Sol Məzmun */}
                    <div className="w-full lg:w-[66%] px-6 mb-12 lg:mb-0">
                        <div className="service-single-content">
                            {/* Featured Image - Şəkildəki 48px radius */}
                            <div className="relative h-[300px] md:h-[460px] w-full mb-10 overflow-hidden rounded-[48px] shadow-sm">
                                <Image
                                    src={matchedProduct.image}
                                    alt={matchedProduct.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Entry Content */}
                            <div className="service-entry pr-4">
                                <div
                                    className="service-body text-[16px] leading-[1.65]"
                                    dangerouslySetInnerHTML={{ __html: matchedProduct.body }}
                                />
                                <div className="mt-6">
                                    <h3 className="text-[18px] font-bold text-[#111827] mb-4">Key Features of Our Embedded Programming Services:</h3>
                                    <p className="text-[#4B5563] leading-[1.7] text-[16px]">
                                        <span className="font-bold text-[#111827]">1. Expertise:</span> Our team of experienced embedded software engineers possesses a deep understanding of microcontrollers, microprocessors, and real-time operating systems (RTOS).
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Şəkildəki vizual ağırlıq */}
                    <div className="w-full lg:w-[33%] px-2">
                        <aside className=" top-28">
                            <div className="bg-[#F7F8FD] rounded-[48px] p-6 md:p-11 border-none">

                                {/* Şəkildəki Göy İllüstrasiya İkonu */}
                                <div className="mb-6 w-18 h-18">
                                    <img src="/icon-service-list.svg" alt="Service Icon" className="w-full h-full object-contain" />
                                </div>

                                <h3 className="text-[23px] md:text-[26px] font-[500] text-[#111827] mb-8 leading-tight">
                                    {matchedProduct.name}
                                </h3>

                                <ul className="space-y-4 mb-10">
                                    {matchedProduct.features.map((feature, index) => (
                                        <li key={index} className="flex  items-center group">
                                            {/* Kiçik nöqtə (Bullet point) */}
                                            <span className="mr-4 flex-shrink-0 bg-[#635BFF] rounded-full flex items-center justify-center w-[15px] h-[15px]">
                                                <ChevronRightIcon sx={{ fontSize: 14, color: "#ffffff" }} />
                                            </span>

                                            <span className="text-[#9CA3AF] text-[16px] font-[400] group-hover:text-[#635BFF] transition-colors duration-300 cursor-default">
                                                {feature}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Şəkildəki Oxlu Düymə */}
                                <PrimaryButton text='Contact now' path={`/contact`} />
                            </div>
                        </aside>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page;