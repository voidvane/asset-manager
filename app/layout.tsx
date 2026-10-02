import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";

export const metadata: Metadata = {
  title: "경제카드 — 쉽게 배우는 경제 용어",
  description: "경제 초보자를 위한 오늘의 경제 현황과 카드형 경제 용어 학습 웹앱",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] antialiased">
        <FavoritesProvider>
          <AppShell>{children}</AppShell>
        </FavoritesProvider>
      </body>
    </html>
  );
}
