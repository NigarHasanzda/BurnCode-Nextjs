import ContactPage from "./Contact";


export const metadata = {
  title: "Əlaqə | BurnCode",
  description:
    "BurnCode ilə əlaqə qurun: suallarınızı göndərin, dəstək alın və layihəniz üçün konsultasiya əldə edin. Biz sizə sürətli və səmərəli cavab verməyə hazırıq.",
     icons: {
    icon: "/logoVite.png",      // kiçik logo (favicon)
    apple: "/logoVite.png", // Apple cihazları üçün
  },
};

export default function COntactPage() {
  return <ContactPage />;
}
