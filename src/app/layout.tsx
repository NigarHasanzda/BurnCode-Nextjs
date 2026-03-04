"use client";

import { useEffect, useState } from "react";
import CursorFollower from "@/crusorfollower/CrusorFollower";
import "./globals.css";
import IntroPage from "@/components/IntroPage/IntroPage";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="az">
      <body suppressHydrationWarning>
        {loading ? (
          <IntroPage />
        ) : (
          <>
            <CursorFollower />
            {children}
          </>
        )}
      </body>
    </html>
  );
}