"use client";
import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="w-full bg-[#F7F8FD] pt-16 pb-10 px-4 md:px-20 lg:px-79 font-sans text-[#1a1a1a]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
                <div className="md:col-span-6 lg:col-span-7">
                    <div className="flex items-center mb-6">
                        <Link href="/" className="logo flex items-center text-[41px] " >
                            <h1 className="Burncode_Logo">burn<span>c</span>ode</h1>
                        </Link>
                    </div>
                    <p className="text-[#4b5563] text-sm leading-relaxed max-w-md mb-8">
                        Burncode company has been serving its customers for more than 5 years.
                        During this period, we have implemented a number of small and large projects.
                        We offer you quality work and a reasonable price.
                    </p>
                    <div className="space-y-3">
                        <p className="font-bold text-lg">Info@Burncode.Org</p>
                        <p className="font-bold text-lg">+994508683623</p>
                    </div>
                </div>
                <div className="md:col-span-3 lg:col-span-2">
                    <h3 className="text-[22px] font-medium mb-6">Pages</h3>
                    <ul className="space-y-4 text-[#9ca3af] text-m">
                        <li><Link href="/" className="hover:text-black transition-colors">Home</Link></li>
                        <li><Link href="/services" className="hover:text-black transition-colors">Services</Link></li>
                        <li><Link href="/portfolio" className="hover:text-black transition-colors">Portfolio</Link></li>
                        <li><Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="md:col-span-3 lg:col-span-3">
                    <h3 className="text-[22px] font-medium mb-6">Socials</h3>
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
                    Copyright © 2026 BurnCode. All rights reserved.
                </p>
                <div className="flex gap-8 mt-4 md:mt-0 items-center">
                    <Link href="/privacy" className="text-[#9ca3af] hover:text-black transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="text-[#9ca3af] hover:text-black transition-colors">Terms Of Service</Link>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="font-semibold text-gray-700 hover:text-black"
                    >
                        Go To Top
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;