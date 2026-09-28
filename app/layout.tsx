import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "자산매니저 MVP",
  description: "한국 개인 사용자용 수기 자산관리 MVP",
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
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <div className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white shadow-sm">
          {children}
        </div>
      </body>
    </html>
  );
}
