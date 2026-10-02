"use client";

import Link from "next/link";
import { ECONOMIC_TERMS } from "@/data/terms";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { TermList } from "@/components/terms/TermCard";
import { EmptyState } from "@/components/states/States";

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const terms = ECONOMIC_TERMS.filter((t) => favorites.includes(t.slug));

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-black">즐겨찾기</h1>
        <p className="mt-1 text-sm text-[var(--color-text-secondary)]" role="status">
          {terms.length > 0 ? `${terms.length}개의 용어를 저장했습니다` : "아직 저장한 용어가 없습니다"}
        </p>
      </div>
      {terms.length === 0 ? (
        <EmptyState
          title="저장한 용어가 없습니다"
          description="용어 카드의 ☆ 버튼을 눌러 나중에 다시 보고 싶은 용어를 저장해 보세요."
          action={
            <Link href="/terms" className="btn-primary mt-1 justify-center">
              용어 보러 가기
            </Link>
          }
        />
      ) : (
        <>
          <TermList terms={terms} />
          <Link href={`/learn?from=${terms[0].slug}`} className="btn-primary justify-center">
            🃏 저장한 용어부터 학습하기
          </Link>
        </>
      )}
    </main>
  );
}
