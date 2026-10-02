import type { Metadata } from "next";
import { LearnDeck } from "@/components/flashcard/LearnDeck";
import { ECONOMIC_TERMS } from "@/data/terms";

export const metadata: Metadata = {
  title: "연속 학습 — 경제카드",
  description: "플래시카드를 넘기며 경제 용어를 반복 학습하세요",
};

export default function LearnPage({ searchParams }: { searchParams?: { from?: string } }) {
  const valid = searchParams?.from && ECONOMIC_TERMS.some((t) => t.slug === searchParams.from);
  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-black">연속 학습</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          카드를 눌러 뒤집고, 얼마나 기억나는지 골라 주세요. 모르겠어요 카드는 오늘 다시 복습합니다.
        </p>
      </div>
      <LearnDeck startSlug={valid ? searchParams?.from : undefined} />
    </main>
  );
}
