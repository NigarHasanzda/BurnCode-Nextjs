import ChooseUsSection from "@/components/_homesections/ChooseUs/ChooseUSSection";
import Hero from "@/components/_homesections/HeroSection/HeroSection";
import LatestBlogArticle from "@/components/_homesections/LatestBlogARticle/LatestBlogArticle";
import OurWork from "@/components/_homesections/OurWork/OurWork";
import ServicesSection from "@/components/_homesections/ServicesSection/ServicesSection";
import WhyChooseUs from "@/components/_homesections/WhyChooseUs/WhyChooseUS";

export const metadata = {
  title: "BurnCode | Web & Software Solutions",
  description:
    "BurnCode — Web development, mobil tətbiqlər, UI/UX dizayn və rəqəmsal həllər. Biz biznesinizi texnologiya ilə böyüdürük.",
  icons: {
    icon: "/logoVite.png",
    apple: "/logoVite.png",
  },
};

export default async function Home({
  params,
}: {
  params: { lang: string };
}) {
  const { lang } = await params; // burada await istifadə edirik

  return (
    <>
      <Hero />
      <ChooseUsSection />
      <ServicesSection lang={lang} />
      <OurWork />
      <WhyChooseUs />
      <LatestBlogArticle />
    </>
  );
}
