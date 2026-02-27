"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import PrimaryButton from "@/components/Button/Button";
import { fetchServices } from "@/services/Services";
import { Service } from "@/types/services";
import SingleSkeleton from "@/components/LoadingSkeleton/SingleLoading";

const Page = () => {
    const params = useParams();
    const slug = params.slug as string;
    const lang = params.lang as string;

    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

const features = [
                "WordPress Support & Maintenance",
                "1,000+ Completed Projects",
                "Content Migration",
                "Plugin Installation and Customization",
                "Fast Load Time",
                "Easy Back-End Admin Panel"
            ]


    useEffect(() => {
        const loadService = async () => {
            setLoading(true);

            const services = await fetchServices(lang);

            // slug-a görə tapırıq
            const matched = services.find((item) => item.slug === slug) || null;

            setService(matched);
            setLoading(false);
        };

        if (slug && lang) {
            loadService();
        }
    }, [slug, lang]);

    if (loading) {
        return <SingleSkeleton/>;
    }

    if (!service) {
        return <div className="text-center py-20">Xidmət tapılmadı</div>;
    }

    return (
        <div className="bg-white py-14 md:py-24">
            <div className="max-w-[1400px] mx-auto px-4">
                <div className="flex flex-wrap -mx-6">

                    {/* Sol tərəf */}
                    <div className="w-full lg:w-[66%] px-6 mb-12 lg:mb-0">
                        <div className="relative h-[300px] md:h-[460px] w-full mb-10 overflow-hidden rounded-[48px] shadow-sm">
                            <Image
                                src={service.image}
                                alt={service.name}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div
                            className="text-[16px] leading-[1.65]"
                            dangerouslySetInnerHTML={{ __html: service.body || "" }}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-[33%] px-2">
                        <aside>
                            <div className="bg-[#F7F8FD] rounded-[48px] p-6 md:p-11">

                                <div className="mb-6 w-18 h-18">
                                    <img
                                        src="/icon-service-list.svg"
                                        alt="Service Icon"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <h3 className="text-[23px] md:text-[26px] font-[500] text-[#111827] mb-8 leading-tight">
                                    {service.name}
                                </h3>

                                {features && (
                                    <ul className="space-y-4 mb-10">
                                        {features.map((feature, index) => (
                                            <li key={index} className="flex items-center">
                                                <span className="mr-4 bg-[#635BFF] rounded-full flex items-center justify-center w-[15px] h-[15px]">
                                                    <ChevronRightIcon sx={{ fontSize: 14, color: "#ffffff" }} />
                                                </span>
                                                <span className="text-[#9CA3AF] text-[16px]">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <PrimaryButton text="Contact now" path={`/${lang}/contact`} />
                            </div>
                        </aside>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Page;