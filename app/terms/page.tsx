import type { Metadata } from "next";
import { TermExplorer } from "@/components/terms/TermExplorer";

export const metadata: Metadata = {
  title: "경제 용어 — 경제카드",
  description: "검색과 카테고리로 경제 용어를 찾아보고 카드로 학습하세요",
};

export default function TermsPage({
  searchParams,
}: {
  searchParams?: { q?: string; category?: string };
}) {
  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-black">경제 용어</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          용어를 눌러 카드를 뒤집으며 배워 보세요. 한 문장 설명 → 쉬운 설명 → 생활 예시 순서입니다.
        </p>
      </div>
      <TermExplorer initialQuery={searchParams?.q ?? ""} initialCategory={searchParams?.category ?? "전체"} />
    </main>
  );
}
