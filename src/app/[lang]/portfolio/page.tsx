import PortfolioPage from "./PortfolioPage";

export const metadata = {
  title: "Portfolio | BurnCode",
  description:
    "BurnCode portfolioları: Son layihələrimizi, dizayn və inkişaf işlərini buradan izləyin. Kreativ və texnoloji həllərlə işinizi daha səmərəli edin.",
     icons: {
    icon: "/logoVite.png",      // kiçik logo (favicon)
    apple: "/logoVite.png", // Apple cihazları üçün
  },
};


export default function PortfolioPages() {
  return <PortfolioPage />;
}
