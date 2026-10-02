import Link from "next/link";
import { EconomicSummary } from "@/components/econ/EconomicSummary";
import { TermList } from "@/components/terms/TermCard";
import { ECONOMIC_TERMS } from "@/data/terms";

export default function HomePage() {
  const preview = ECONOMIC_TERMS.slice(0, 6);

  return (
    <main className="space-y-6">
      <section aria-label="서비스 소개" className="card overflow-hidden p-6">
        <p className="text-xs font-semibold text-[var(--color-primary)]">경제 초보자를 위한 하루 5분 경제</p>
        <h1 className="mt-1 text-2xl font-black leading-snug">
          오늘 경제 상황 확인하고,
          <br />
          카드 넘기며 용어 배우기
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-[var(--color-text-secondary)]">
          어려운 금융 뉴스부터 보지 마세요. 환율·증시·금리만 가볍게 확인하고,
          궁금한 용어부터 하나씩 배워 보세요.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link href="/learn" className="btn-primary justify-center">
            🃏 오늘의 카드 학습 시작
          </Link>
          <Link href="/terms" className="btn-secondary justify-center">
            📚 용어 찾아보기
          </Link>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 text-xs text-[var(--color-text-secondary)] sm:grid-cols-3">
          <li className="rounded-xl bg-slate-50 p-2">1 · 현황 빠르게 확인</li>
          <li className="rounded-xl bg-slate-50 p-2">2 · 용어 탐색 후 클릭</li>
          <li className="rounded-xl bg-slate-50 p-2">3 · 카드로 반복 학습</li>
        </ol>
      </section>

      <EconomicSummary />

      <section aria-label="추천 용어" className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">처음 보면 좋은 용어</h2>
          <Link href="/terms" className="text-sm font-semibold text-[var(--color-primary)] underline underline-offset-2">
            전체 보기
          </Link>
        </div>
        <TermList terms={preview} />
      </section>

      <section aria-label="기존 자산관리" className="card p-4">
        <h2 className="text-sm font-semibold text-[var(--color-text-secondary)]">기존 자산관리 기능</h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          수기 자산·부채 입력과 대시보드는 그대로 유지됩니다.
        </p>
        <Link href="/dashboard" className="mt-2 inline-block text-sm font-semibold text-[var(--color-primary)] underline underline-offset-2">
          자산 대시보드로 이동 →
        </Link>
      </section>
    </main>
  );
}
