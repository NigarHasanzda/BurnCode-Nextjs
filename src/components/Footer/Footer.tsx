"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// Lokallaşdırma faylları
import az from "@/locales/az.json";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

const Footer = () => {
    const params = useParams();
    const lang = (params?.lang as string) || "az";

    const translations: any = { az, en, ru };
    const t = translations[lang]?.footer || en.footer;

    return (
        <footer className="w-full bg-[#F7F8FD] pt-16 pb-10 px-4 md:px-20 lg:px-79 font-sans text-[#1a1a1a]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
                <div className="md:col-span-6 lg:col-span-7">
                    <div className="flex items-center mb-6">
                        <Link href={`/${lang}`} className="logo flex items-center text-[41px] " >
                            <h1 className="Burncode_Logo">burn<span>c</span>ode</h1>
                        </Link>
                    </div>
                    <p className="text-[#4b5563] text-sm leading-relaxed max-w-md mb-8">
                        {t.description}
                    </p>
                    <div className="space-y-3">
                        <p className="font-bold text-lg">Info@Burncode.Org</p>
                        <p className="font-bold text-lg">+994508683623</p>
                    </div>
                </div>

                <div className="md:col-span-3 lg:col-span-2">
                    <h3 className="text-[22px] font-medium mb-6">{t.pagesTitle}</h3>
                    <ul className="space-y-4 text-[#9ca3af] text-m">
                        <li><Link href={`/${lang}`} className="hover:text-black transition-colors">{t.links.home}</Link></li>
                        <li><Link href={`/${lang}/services`} className="hover:text-black transition-colors">{t.links.services}</Link></li>
                        <li><Link href={`/${lang}/portfolio/1`} className="hover:text-black transition-colors">{t.links.portfolio}</Link></li>
                        <li><Link href={`/${lang}/contact`} className="hover:text-black transition-colors">{t.links.contact}</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-3 lg:col-span-3">
                    <h3 className="text-[22px] font-medium mb-6">{t.socialsTitle}</h3>
                    <ul className="space-y-4 text-[#9ca3af] text-m">
                        <li><a href="#" className="hover:text-black transition-colors">Instagram</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Facebook</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">Twitter</a></li>
                        <li><a href="#" className="hover:text-black transition-colors">LinkedIn</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#4b5563]">
                <p>
                    {t.copyright}
                </p>
                <div className="flex gap-8 mt-4 md:mt-0 items-center">
                    <Link href={`/${lang}/privacy`} className="text-[#9ca3af] hover:text-black transition-colors">{t.privacy}</Link>
                    <Link href={`/${lang}/terms`} className="text-[#9ca3af] hover:text-black transition-colors">{t.terms}</Link>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="font-semibold text-gray-700 hover:text-black"
                    >
                        {t.goToTop}
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;