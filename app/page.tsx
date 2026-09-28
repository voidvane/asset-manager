import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <>
      <Header title="자산매니저" />
      <main className="flex-1 space-y-4 p-4">
        <Card title="MVP 1단계: 뼈대 완성">
          <p className="text-sm text-slate-600">
            Next.js + TypeScript + Tailwind 기반 반응형 웹앱입니다.
            모바일 우선(max-w-md) 레이아웃으로 시작합니다.
          </p>
        </Card>
        <Card title="다음 할 일">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>PostgreSQL 연결 + Prisma 마이그레이션</li>
            <li>회원가입/로그인(JWT HttpOnly 쿠키)</li>
            <li>자산/부채 CRUD + 대시보드 집계</li>
          </ul>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/dashboard"
            className="rounded-xl bg-blue-700 p-4 text-center text-sm font-semibold text-white"
          >
            대시보드 보기
          </Link>
          <Link
            href="/api/health"
            className="rounded-xl border border-slate-200 p-4 text-center text-sm font-semibold"
          >
            API 상태 확인
          </Link>
        </div>
      </main>
      <BottomNav />
    </>
  );
}
