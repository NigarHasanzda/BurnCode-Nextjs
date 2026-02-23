"use client";

import { ReactNode, useEffect } from "react";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import * as React from "react"; 
import ClientOnly from "@/components/ClientOnly/ClientOnly";
import { notFound } from "next/navigation"; // <-- əlavə et

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

const supportedLangs = ["az", "en", "ru"];

export default function LangLayout({ children, params }: LayoutProps) {
  const resolvedParams = React.use(params); 
  const lang = resolvedParams.lang;

  // əgər lang supported deyil => notFound
  if (!supportedLangs.includes(lang)) {
    notFound(); // <-- burda avtomatik 404 göstərir
  }

  const selectedLang = lang; // artıq supported olduğunu bilirik

  // ✅ LocalStorage-a yaz
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
