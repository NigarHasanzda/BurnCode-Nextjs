// app/[lang]/blog/[page]/page.tsx  və ya uyğun dynamic route
import React from "react";
import BlogPage from "./BlogPage";

export const metadata = {
  title: "Blog | BurnCode",
  description:
    "BurnCode bloqu: AI alətləri, texnologiya xəbərləri və proqramlaşdırma tövsiyələri ilə işinizi daha səmərəli edin. Yenilikləri və faydalı məqalələri burada oxuyun.",
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

const BlogDynamicPage = ({ params }: Props) => {
  const { lang } = params;

  // Artıq currentPage-i prop kimi keçirməyə ehtiyac yoxdur,
  // BlogPage özü usePathname ilə oxuyacaq
  return <BlogPage lang={lang} />;
};

export default BlogDynamicPage;
