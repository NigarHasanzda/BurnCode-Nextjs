"use client";
import React from 'react';
import PrimaryButton from '@/components/Button/Button';

export default function Hero() {
  return (
    <section 
      className="relative min-h-[80vh] bg-[#F7F8FD] w-full flex flex-col items-center justify-center py-20 px-4 overflow-hidden -mt-20 sm:mt-2 md:mt-0"
    //   style={{    background: "linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(247, 248, 253, 1) 30%)"  }}  
      >
      
      <div   className="absolute inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-70 pointer-events-none"  style={{ backgroundImage: "url('/hero-bg.png')" }}/>

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <span className="text-[#5D5FEF] font-bold tracking-widest text-[12px] md:text-[16px] uppercase mb-1 block">
          ABOUT OUR COMPANY
        </span>

        <h1 className="text-[32px] md:text-[90px] font-[600] text-[#1A1A1A] leading-[1.3] mb-2 tracking-tight">
          Bring your business into <br />
          the virtual world <br />
          <span className="text-[#5D5FEF]">with Burncode</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-[14px] md:text-lg font-normal leading-relaxed mb-12 px-4">
          Burncode has been serving its clients for more than 5 years. During this time, we 
          have successfully delivered a number of small and large projects. We offer you both 
          quality work and reasonable prices.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <PrimaryButton text="Free Consultation" path="/consultation" />
          <PrimaryButton text="View Portfolio" path="/portfolio" />
        </div>
      </div>
    </section>
  );
}
