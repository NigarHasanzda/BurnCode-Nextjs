import React from "react";
import BlogByCategory from "./BlogCategory";

export const metadata = {
  title: "BurnCode Blog – AI alətləri, Texnologiya Xəbərləri və Proqramlaşdırma Tövsiyələri",
  description: "BurnCode bloqunda AI alətləri, proqramlaşdırma tövsiyələri, texnologiya xəbərləri və layihə nümunələri ilə tanış olun. Ən son texnologiya trendlərini və praktiki məsləhətləri öyrənin.",
  icons: {
    icon: "/logoVite.png",
    apple: "/logoVite.png",
  },
  openGraph: {
    type: "article",
    url: "https://burncode.org/en/blog/category/ai",
    title: "BurnCode Blog – AI alətləri, Texnologiya Xəbərləri və Proqramlaşdırma Tövsiyələri",
    description: "BurnCode bloqunda AI alətləri, proqramlaşdırma tövsiyələri, texnologiya xəbərləri və layihə nümunələri ilə tanış olun.",
    siteName: "BurnCode",
    images: [
      {
        url: "/logoVite.png",
        width: 800,
        height: 600,
        alt: "BurnCode Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BurnCode Blog – AI alətləri, Texnologiya Xəbərləri və Proqramlaşdırma Tövsiyələri",
    description: "BurnCode bloqunda AI alətləri, proqramlaşdırma tövsiyələri və texnologiya xəbərləri ilə tanış olun.",
    creator: "@burncode",
    images: ["/logoVite.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://burncode.org/en/blog/category/ai",
  },
};

const SingleBlogPage = () => {
  return <BlogByCategory />;
};

export default SingleBlogPage;