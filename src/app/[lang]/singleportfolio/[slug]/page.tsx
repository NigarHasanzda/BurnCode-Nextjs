import React from "react";
import PortfolioDetails from "./SinglePortfolio";

export const metadata = {
  title: "BurnCode Portfolio – Layihələr və Web Proyektlər",
  description: "BurnCode portfolioları: AI, web, və texnologiya layihələri ilə tanış olun. Hər layihənin ətraflı təsviri, müştəri məlumatları və canlı linki burada.",
  icons: {
    icon: "/logoVite.png",
    apple: "/logoVite.png",
  },
  openGraph: {
    type: "website",
    url: "https://burncode.org/en/portfolios/1",
    title: "BurnCode Portfolio – Layihələr və Web Proyektlər",
    description: "BurnCode portfolioları: AI, web, və texnologiya layihələri ilə tanış olun. Hər layihənin ətraflı təsviri, müştəri məlumatları və canlı linki burada.",
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
    title: "BurnCode Portfolio – Layihələr və Web Proyektlər",
    description: "BurnCode portfolioları: AI, web, və texnologiya layihələri ilə tanış olun. Hər layihənin ətraflı təsviri, müştəri məlumatları və canlı linki burada.",
    creator: "@burncode",
    images: ["/logoVite.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://burncode.org/en/portfolios/1",
  },
};

const SinglePortfolioPage = () => {
  return <PortfolioDetails />;
};

export default SinglePortfolioPage;