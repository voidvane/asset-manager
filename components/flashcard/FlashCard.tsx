"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { EconomicTerm } from "@/lib/econ-types";
import { DIFFICULTY_LABEL } from "@/lib/econ-types";
import { useFavorites } from "@/components/providers/FavoritesProvider";

interface FlashCardProps {
  term: EconomicTerm;
  index: number;
  total: number;
  prevSlug?: string;
  nextSlug?: string;
  relatedTerms: EconomicTerm[];
}

export function ProgressIndicator({ index, total }: { index: number; total: number }) {
  const percent = total > 0 ? Math.round(((index + 1) / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3" role="group" aria-label={`학습 진행도 ${index + 1} / ${total}`}>
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="용어 목록으로 돌아가기"
        className="grid h-11 w-11 flex-none place-items-center rounded-full border border-[var(--color-border)]"
      >
        ✕
      </button>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={index + 1} aria-valuemin={1} aria-valuemax={total} aria-label="학습 진행률">
        <div className="flash-progress-fill h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${percent}%` }} />
      </div>
      <span className="flex-none text-sm font-semibold tabular-nums" aria-hidden="true">
        {index + 1} / {total}
      </span>
    </div>
  );
}

export function FlashCard({ term, index, total, prevSlug, nextSlug, relatedTerms }: FlashCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { isFavorite, toggle } = useFavorites();
  const fav = isFavorite(term.slug);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    setFlipped(false);
  }, [term.slug]);

  const flip = useCallback(() => setFlipped((v) => !v), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        const target = e.target as HTMLElement;
        if (target.closest("button, a, input, select, textarea")) return;
        e.preventDefault();
        flip();
      } else if (e.key === "ArrowLeft" && prevSlug) {
        window.location.href = `/terms/${prevSlug}`;
      } else if (e.key === "ArrowRight" && nextSlug) {
        window.location.href = `/terms/${nextSlug}`;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flip, prevSlug, nextSlug]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    if (dx < 0 && nextSlug) window.location.href = `/terms/${nextSlug}`;
    if (dx > 0 && prevSlug) window.location.href = `/terms/${prevSlug}`;
  };

  return (
    <section aria-label={`${term.term} 플래시카드`} className="mx-auto w-full max-w-xl space-y-4">
      <ProgressIndicator index={index} total={total} />

      <div
        ref={stageRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        className="flash-stage"
      >
        <button
          type="button"
          onClick={flip}
          aria-pressed={flipped}
          aria-label={flipped ? `${term.term} 설명 닫고 용어만 보기` : `${term.term} 설명 보기`}
          className={`flash-card ${flipped ? "is-flipped" : ""}`}
        >
          <span className="flash-inner">
            <span className="flash-face flash-front">
              <span className="flex w-full items-center justify-between text-xs">
                <span className="rounded-full bg-white/20 px-2 py-0.5 font-semibold">{term.category} · {DIFFICULTY_LABEL[term.difficulty]}</span>
                <span className="rounded-full bg-white/20 px-2 py-0.5">앞면</span>
              </span>
              <span className="mt-6 text-3xl font-black leading-tight">{term.term}</span>
              <span className="mt-3 max-w-xs text-sm opacity-80">{term.hint ?? "카드를 눌러 쉬운 설명 확인"}</span>
              <span className="mt-8 rounded-full bg-white px-4 py-2 text-sm font-bold text-[var(--color-primary)]">
                {flipped ? "다시 용어만 보기" : "눌러서 설명 보기"}
              </span>
              <span className="sr-only">스페이스바로 뒤집을 수 있습니다</span>
            </span>
            <span className="flash-face flash-back">
              <span className="flex w-full items-center justify-between text-xs text-[var(--color-text-secondary)]">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold">{term.category}</span>
                <span>뒷면 · 쉬운 설명</span>
              </span>
              <span className="mt-3 w-full text-left">
                <strong className="block text-lg">{term.shortDescription}</strong>
                <span className="mt-2 block text-[15px] leading-relaxed">{term.easyExplanation}</span>
                <span className="mt-3 block rounded-xl bg-[var(--color-background)] p-3 text-sm leading-relaxed">
                  <strong>생활 예시 · </strong>{term.example}
                </span>
                {relatedTerms.length > 0 ? (
                  <span className="mt-3 block text-sm">
                    <strong>함께 보면 좋아요 · </strong>
                    {relatedTerms.map((r, i) => (
                      <span key={r.slug}>
                        {i > 0 ? ", " : ""}
                        <Link
                          href={`/terms/${r.slug}`}
                          onClick={(e) => e.stopPropagation()}
                          className="underline underline-offset-2"
                          aria-label={`관련 용어 ${r.term} 학습하기`}
                        >
                          {r.term}
                        </Link>
                      </span>
                    ))}
                  </span>
                ) : null}
              </span>
              <span className="mt-2 text-xs text-[var(--color-text-secondary)]">다시 누르면 용어면으로 돌아갑니다</span>
            </span>
          </span>
        </button>
      </div>

      <p className="hidden text-center text-xs text-[var(--color-text-secondary)] md:block">
        키보드: 스페이스바로 뒤집기 · ← → 이전/다음 · 모바일은 좌우로 밀어도 이동합니다
      </p>

      <div className="grid grid-cols-2 gap-3" role="group" aria-label="이전 다음 용어">
        {prevSlug ? (
          <Link href={`/terms/${prevSlug}`} className="btn-secondary min-h-[48px] justify-center" aria-label="이전 용어 학습하기">
            ← 이전 용어
          </Link>
        ) : (
          <span className="grid min-h-[48px] place-items-center rounded-xl bg-slate-100 text-sm text-slate-400" aria-disabled="true">
            첫 용어입니다
          </span>
        )}
        {nextSlug ? (
          <Link href={`/terms/${nextSlug}`} className="btn-primary min-h-[48px] justify-center" aria-label="다음 용어 학습하기">
            다음 용어 →
          </Link>
        ) : (
          <span className="grid min-h-[48px] place-items-center rounded-xl bg-slate-100 text-sm text-slate-400" aria-disabled="true">
            마지막 용어입니다
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => toggle(term.slug)}
          aria-pressed={fav}
          className="btn-secondary flex-1"
        >
          {fav ? "⭐ 즐겨찾기 해제" : "☆ 즐겨찾기에 저장"}
        </button>
        <Link href="/learn" className="btn-secondary flex-1 justify-center" aria-label="연속 학습 모드로 이동">
          🃏 연속 학습
        </Link>
      </div>
    </section>
  );
}
