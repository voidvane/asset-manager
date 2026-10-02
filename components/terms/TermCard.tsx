"use client";

import Link from "next/link";
import type { EconomicTerm } from "@/lib/econ-types";
import { DIFFICULTY_LABEL } from "@/lib/econ-types";
import { useFavorites } from "@/components/providers/FavoritesProvider";

export function TermCard({ term }: { term: EconomicTerm }) {
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(term.slug);

  return (
    <article className="card group relative flex flex-col gap-2 p-4 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-[var(--color-primary-soft)] px-2 py-0.5 text-xs font-semibold text-[var(--color-primary)]">
            {term.category}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {DIFFICULTY_LABEL[term.difficulty]}
          </span>
        </div>
        <button
          type="button"
          onClick={() => toggle(term.slug)}
          aria-pressed={fav}
          aria-label={fav ? `${term.term} 즐겨찾기 해제` : `${term.term} 즐겨찾기 추가`}
          className="grid h-11 w-11 flex-none place-items-center rounded-full text-xl hover:bg-slate-100"
        >
          <span aria-hidden="true">{fav ? "⭐" : "☆"}</span>
        </button>
      </div>
      <Link href={`/terms/${term.slug}`} className="flex flex-1 flex-col gap-1 after:absolute after:inset-0" aria-label={`${term.term} 학습하기`}>
        <h3 className="truncate text-base font-bold">{term.term}</h3>
        <p className="line-clamp-2 text-sm text-[var(--color-text-secondary)]">{term.shortDescription}</p>
      </Link>
      <p className="text-xs text-[var(--color-text-secondary)]">카드 넘기며 학습하기 →</p>
    </article>
  );
}

export function TermList({ terms }: { terms: EconomicTerm[] }) {
  if (terms.length === 0) return null;
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3" aria-label="경제 용어 목록">
      {terms.map((term) => (
        <li key={term.id}>
          <TermCard term={term} />
        </li>
      ))}
    </ul>
  );
}
