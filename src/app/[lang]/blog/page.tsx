import BlogPage from "./BlogPage";

export const metadata = {
  title: "Blog | BurnCode",
  description:
    "BurnCode bloqu: AI alətləri, texnologiya xəbərləri və proqramlaşdırma tövsiyələri ilə işinizi daha səmərəli edin. Yenilikləri və faydalı məqalələri burada oxuyun.",
    
     icons: {
    icon: "/logoVite.png",      // kiçik logo (favicon)
    apple: "/logoVite.png", // Apple cihazları üçün
  },
};


export default function BlogPages() {
  return <BlogPage />;
}
