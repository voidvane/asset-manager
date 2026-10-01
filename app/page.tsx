import Link from "next/link";
import { Card } from "@/components/ui/Card";

const FEATURES = [
  {
    title: "자산 대시보드",
    desc: "총자산·총부채·순자산과 자산 구성비를 한눈에 확인합니다.",
    href: "/dashboard",
    cta: "대시보드 보기",
    primary: true,
  },
  {
    title: "시나리오 시뮬레이션",
    desc: "수익률·물가·저축 가정에 따른 3개 시나리오(보수/기본/낙관)를 비교합니다.",
    href: "/forecast",
    cta: "시나리오 실행",
    primary: true,
  },
  {
    title: "API 상태",
    desc: "백엔드 헬스체크 엔드포인트. 배포 확인용입니다.",
    href: "/api/health",
    cta: "상태 확인",
    primary: false,
  },
];

export default function HomePage() {
  return (
    <main className="space-y-6 py-6 md:py-10">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          내 자산을 기록하고, 미래를 시뮬레이션하세요
        </h1>
        <p className="max-w-2xl text-sm text-slate-600 md:text-base">
          수기 입력 중심의 자산관리 MVP입니다. 현재 자산을 집계하고, 가정을
          바꿔가며 장기 시나리오를 비교할 수 있습니다.
        </p>
      </section>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <Card key={f.href} title={f.title}>
            <p className="mb-4 min-h-10 text-sm text-slate-600">{f.desc}</p>
            <Link
              href={f.href}
              className={
                f.primary
                  ? "block rounded-xl bg-blue-700 p-3 text-center text-sm font-semibold text-white hover:bg-blue-800"
                  : "block rounded-xl border border-slate-200 p-3 text-center text-sm font-semibold hover:bg-slate-50"
              }
            >
              {f.cta}
            </Link>
          </Card>
        ))}
      </section>
      <section>
        <Card title="다음 할 일">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>PostgreSQL 연결 + Prisma 마이그레이션</li>
            <li>회원가입/로그인(JWT HttpOnly 쿠키)</li>
            <li>자산/부채 CRUD + 대시보드 실집계</li>
          </ul>
        </Card>
      </section>
    </main>
  );
}
