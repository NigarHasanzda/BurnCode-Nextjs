"use client";

import { ReactNode, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import * as React from "react"; 
import ClientOnly from "@/components/ClientOnly/ClientOnly";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

const supportedLangs = ["az", "en", "ru"];

export default function LangLayout({ children, params }: LayoutProps) {
  const resolvedParams = React.use(params); 
  const lang = resolvedParams.lang;
  const selectedLang = supportedLangs.includes(lang) ? lang : "az";

  // ✅ BU HİSSƏNİ ƏLAVƏ ET
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (savedLang !== selectedLang) {
      localStorage.setItem("lang", selectedLang);
    }
  }, [selectedLang]);

  return (
    <ClientOnly>
      <Header currentLang={selectedLang} />
      {children}
      <Footer />
    </ClientOnly>
  );
}
