// src/app/layout.tsx
import CursorFollower from "@/crusorfollower/CrusorFollower";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <body suppressHydrationWarning>
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}
