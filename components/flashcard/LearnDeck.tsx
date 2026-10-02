"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ECONOMIC_TERMS } from "@/data/terms";
import { EmptyState } from "@/components/states/States";

type Grade = "again" | "hard" | "good";

export function LearnDeck({ startSlug }: { startSlug?: string }) {
  const startIndex = useMemo(() => {
    if (!startSlug) return 0;
    const i = ECONOMIC_TERMS.findIndex((t) => t.slug === startSlug);
    return i >= 0 ? i : 0;
  }, [startSlug]);

  const [order, setOrder] = useState<number[]>(() =>
    ECONOMIC_TERMS.map((_, i) => (startIndex + i) % ECONOMIC_TERMS.length)
  );
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState<Record<Grade, number>>({ again: 0, hard: 0, good: 0 });
  const [finished, setFinished] = useState(false);

  const current = ECONOMIC_TERMS[order[pos]];
  const percent = Math.round(((pos + 1) / order.length) * 100);

  const grade = (g: Grade) => {
    setStats((s) => ({ ...s, [g]: s[g] + 1 }));
    try {
      const key = "econ-learn-progress-v1";
      const raw = localStorage.getItem(key);
      const parsed = raw ? (JSON.parse(raw) as Record<string, number>) : {};
      parsed[current.slug] = (parsed[current.slug] ?? 0) + (g === "good" ? 2 : g === "hard" ? 1 : 0);
      localStorage.setItem(key, JSON.stringify(parsed));
    } catch {
      // 무시
    }
    setFlipped(false);
    if (pos + 1 >= order.length) {
      setFinished(true);
    } else {
      setPos((p) => p + 1);
    }
  };

  const shuffle = () => {
    const arr = [...order].sort(() => Math.random() - 0.5);
    setOrder(arr);
    setPos(0);
    setFlipped(false);
    setFinished(false);
    setStats({ again: 0, hard: 0, good: 0 });
  };

  const restart = () => {
    setPos(0);
    setFlipped(false);
    setFinished(false);
    setStats({ again: 0, hard: 0, good: 0 });
  };

  if (!current) {
    return <EmptyState title="학습할 용어가 없습니다" />;
  }

  if (finished) {
    return (
      <section aria-label="학습 완료" className="mx-auto max-w-xl space-y-4 text-center">
        <div className="card p-8">
          <p aria-hidden="true" className="text-4xl">🎉</p>
          <h2 className="mt-2 text-xl font-bold">학습 완료!</h2>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {order.length}장의 카드를 모두 넘겼습니다
          </p>
          <dl className="mx-auto mt-4 grid max-w-sm grid-cols-3 gap-2 text-sm">
            <div className="rounded-xl bg-slate-100 p-3">
              <dt className="text-xs text-slate-500">모르겠어요</dt>
              <dd className="text-lg font-bold">{stats.again}</dd>
            </div>
            <div className="rounded-xl bg-slate-100 p-3">
              <dt className="text-xs text-slate-500">애쏭쏭</dt>
              <dd className="text-lg font-bold">{stats.hard}</dd>
            </div>
            <div className="rounded-xl bg-slate-100 p-3">
              <dt className="text-xs text-slate-500">알아요</dt>
              <dd className="text-lg font-bold">{stats.good}</dd>
            </div>
          </dl>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={restart} className="btn-primary flex-1 justify-center">🔁 다시 학습</button>
            <button type="button" onClick={shuffle} className="btn-secondary flex-1 justify-center">🔀 섞어서 학습</button>
          </div>
          <Link href="/terms" className="mt-3 inline-block text-sm underline underline-offset-2">
            용어 목록으로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="연속 학습" className="mx-auto w-full max-w-xl space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={pos + 1} aria-valuemin={1} aria-valuemax={order.length} aria-label="학습 진행률">
          <div className="flash-progress-fill h-full bg-[var(--color-primary)]" style={{ width: `${percent}%` }} />
        </div>
        <span className="text-sm font-semibold tabular-nums">{pos + 1} / {order.length}</span>
        <button type="button" onClick={shuffle} aria-label="카드 순서 섞기" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--color-border)]">
          🔀
        </button>
      </div>

      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={flipped ? `${current.term} 설명 닫기` : `${current.term} 설명 보기`}
        className={`flash-card ${flipped ? "is-flipped" : ""}`}
      >
        <span className="flash-inner">
          <span className="flash-face flash-front">
            <span className="text-xs opacity-80">{current.category}</span>
            <span className="mt-4 text-3xl font-black">{current.term}</span>
            <span className="mt-2 text-sm opacity-80">{current.hint ?? "눌러서 설명 보기"}</span>
          </span>
          <span className="flash-face flash-back">
            <strong className="text-lg">{current.shortDescription}</strong>
            <span className="mt-2 text-[15px] leading-relaxed">{current.easyExplanation}</span>
            <span className="mt-3 rounded-xl bg-[var(--color-background)] p-3 text-sm">생활 예시 · {current.example}</span>
          </span>
        </span>
      </button>

      <div className="grid grid-cols-3 gap-2" role="group" aria-label="학습 평가">
        <button type="button" onClick={() => grade("again")} className="min-h-[52px] rounded-xl border border-red-200 bg-red-50 text-sm font-bold text-red-700">
          모르겠어요
          <span className="block text-xs font-normal">오늘 다시</span>
        </button>
        <button type="button" onClick={() => grade("hard")} className="min-h-[52px] rounded-xl border border-amber-200 bg-amber-50 text-sm font-bold text-amber-800">
          애쏭쏭
          <span className="block text-xs font-normal">내일 복습</span>
        </button>
        <button type="button" onClick={() => grade("good")} className="min-h-[52px] rounded-xl border border-emerald-200 bg-emerald-50 text-sm font-bold text-emerald-700">
          알아요
          <span className="block text-xs font-normal">3일 뒤 복습</span>
        </button>
      </div>
      <p className="text-center text-xs text-[var(--color-text-secondary)]">
        카드를 눌러 뒤집고, 얼마나 기억나는지 골라 주세요
      </p>
    </section>
  );
}
