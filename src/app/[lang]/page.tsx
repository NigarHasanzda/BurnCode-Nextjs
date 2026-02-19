"use client";
import ChooseUsSection from "@/components/_homesections/ChooseUs/ChooseUSSection";
import Hero from "@/components/_homesections/HeroSection/HeroSection";
import OurWork from "@/components/_homesections/OurWork/OurWork";
import ServicesSection from "@/components/_homesections/ServicesSection/ServicesSection";
import WhyChooseUs from "@/components/_homesections/WhyChooseUs/WhyChooseUS";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Hero/>
    <ChooseUsSection/>
    <ServicesSection />
    <OurWork/>
    <WhyChooseUs/>


    </>
  );
}
