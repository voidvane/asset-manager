"use client";

import { useMemo, useState } from "react";
import { ECONOMIC_TERMS } from "@/data/terms";
import { TERM_CATEGORIES } from "@/lib/econ-types";
import { searchTerms } from "@/data/terms";
import { TermList } from "@/components/terms/TermCard";
import { EmptyState } from "@/components/states/States";

export function TermExplorer({ initialQuery = "", initialCategory = "전체" }: { initialQuery?: string; initialCategory?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);

  const results = useMemo(() => searchTerms(query, category), [query, category]);

  return (
    <section aria-label="경제 용어 탐색" className="space-y-4">
      <form
        role="search"
        aria-label="경제 용어 검색"
        onSubmit={(e) => e.preventDefault()}
        className="flex gap-2"
      >
        <label htmlFor="term-search" className="sr-only">
          용어명, 설명, 키워드로 검색
        </label>
        <input
          id="term-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="궁금한 용어를 검색해 보세요 (예: 금리, 환율)"
          autoComplete="off"
          className="min-h-[48px] flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]"
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="검색어 지우기"
            className="min-h-[48px] min-w-[48px] rounded-xl border border-[var(--color-border)] px-3"
          >
            ✕
          </button>
        ) : null}
      </form>

      <div role="group" aria-label="카테고리 필터" className="flex flex-wrap gap-2">
        {["전체", ...TERM_CATEGORIES].map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={active}
              className={`min-h-[40px] rounded-full border px-3 py-1.5 text-sm font-medium ${
                active
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white"
                  : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)]"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <p role="status" aria-live="polite" className="text-sm text-[var(--color-text-secondary)]">
        {results.length > 0
          ? `${results.length}개의 용어${query ? ` · “${query}” 검색 결과` : ""}`
          : "검색 결과가 없습니다"}
        <span className="sr-only">, 총 {ECONOMIC_TERMS.length}개 중</span>
      </p>

      {results.length === 0 ? (
        <EmptyState
          title="검색 결과가 없습니다"
          description="다른 단어로 검색하거나 카테고리를 바꿔 보세요. 예: 금리, 주식, 환율"
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("전체");
              }}
              className="mt-1 min-h-[44px] rounded-xl border border-[var(--color-border)] px-4 py-2 text-sm font-semibold"
            >
              검색 초기화
            </button>
          }
        />
      ) : (
        <TermList terms={results} />
      )}
    </section>
  );
}
