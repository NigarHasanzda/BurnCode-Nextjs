import React from "react";
import BlogPage from "./BlogPage";

export const metadata = {
  title: "Blog | BurnCode",
  description: "BurnCode bloqu: AI alətləri, texnologiya xəbərləri və proqramlaşdırma tövsiyələri.",
  icons: {
    icon: "/logoVite.png",
    apple: "/logoVite.png",
  },
};

interface Props {
  params: {
    lang: string;
    page: string;
  };
}

// Next.js-in yeni versiyalarında params bir Promise ola bilər, 
// lakin standard istifadədə birbaşa oxumaq kifayətdir.
const BlogDynamicPage = ({ params }: Props) => {
  return <BlogPage />;
};

export default BlogDynamicPage;