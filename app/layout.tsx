import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "KKB 대표",
  description: "KKB 대표 — 수기 자산관리와 경제 학습",
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#1D4ED8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-8 sm:px-6 md:pb-12 lg:px-8">
            {children}
          </div>
          <footer className="hidden border-t border-slate-200 bg-white md:block">
            <div className="mx-auto w-full max-w-6xl px-6 py-6 text-xs text-slate-500 lg:px-8">
              KKB 대표 — 수기 자산관리 및 시나리오 시뮬레이션. 예측 결과는
              가정에 기반한 시뮬레이션이며 미래를 보장하지 않습니다.
            </div>
          </footer>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
