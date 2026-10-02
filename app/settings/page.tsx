import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "설정 — 경제카드",
  description: "알림, 표시, 기존 자산관리 설정",
};

export default function SettingsPage() {
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-black">설정</h1>
      <section className="card space-y-1 p-2" aria-label="앱 설정">
        <div className="flex items-center justify-between gap-2 rounded-xl p-3">
          <div>
            <p className="font-semibold">쉬운 설명 우선 보기</p>
            <p className="text-sm text-[var(--color-text-secondary)]">플래시카드 뒷면에서 쉬운 설명을 먼저 보여줍니다</p>
          </div>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">사용 중</span>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-xl p-3">
          <div>
            <p className="font-semibold">예시 데이터 안내</p>
            <p className="text-sm text-[var(--color-text-secondary)]">실시간 API 연결 전까지 예시 시세를 표시합니다</p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">예시 표시 중</span>
        </div>
      </section>
      <section className="card p-4" aria-label="기존 기능">
        <h2 className="font-bold">기존 자산관리</h2>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          기존 자산·부채 입력과 대시보드 기능은 그대로 사용할 수 있습니다.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Link href="/dashboard" className="btn-secondary justify-center">자산 대시보드 열기</Link>
          <Link href="/api/health" className="btn-secondary justify-center">API 상태 확인</Link>
        </div>
      </section>
      <section className="card p-4" aria-label="오픈소스 안내">
        <h2 className="font-bold">데이터와 라이선스</h2>
        <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
          경제 용어 설명과 예시는 이 프로젝트에서 직접 작성한 학습용 콘텐츠입니다.
          참고한 오픈소스 프로젝트의 코드는 복사하지 않았으며, UX 패턴만 분석해 독자적으로 구현했습니다.
          your_finance(Flutter, MIT)의 홈 현황판 정보 구조 아이디어를 참고했습니다.
        </p>
      </section>
    </main>
  );
}
