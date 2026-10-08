"use client";

import { useEffect, useState } from "react";
import { getTerm } from "@/lib/knowledge";

/**
 * Tappable financial term (문어발식 용어 설명).
 * Renders an inline button; opens a modal with definition → why →
 * example → formula → risk → mistakes → related terms (which are
 * themselves tappable, hence "octopus arms").
 */
export function Term({ slug, children }: { slug: string; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(slug);
  const entry = getTerm(current);

  useEffect(() => {
    if (open) setCurrent(slug);
  }, [open, slug]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);

  if (!entry) return <>{children ?? slug}</>;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-blue-700 underline decoration-dotted underline-offset-2 hover:text-blue-900"
      >
        {children ?? getTerm(slug)?.term ?? slug}
      </button>
      {open && entry && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={entry.term}
            className="max-h-[85vh] w-full max-w-lg overflow-auto rounded-t-2xl bg-white p-5 sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-1 flex items-start justify-between gap-2">
              <h2 className="text-lg font-bold">{entry.term}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="닫기"
                className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>
            <p className="mb-3 text-sm font-medium text-blue-700">{entry.short}</p>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="font-semibold">정의</dt>
                <dd className="text-slate-700">{entry.definition}</dd>
              </div>
              <div>
                <dt className="font-semibold">왜 중요한가</dt>
                <dd className="text-slate-700">{entry.whyItMatters}</dd>
              </div>
              <div>
                <dt className="font-semibold">예시</dt>
                <dd className="text-slate-700">{entry.example}</dd>
              </div>
              {entry.formula && (
                <div>
                  <dt className="font-semibold">공식</dt>
                  <dd className="rounded-lg bg-slate-100 px-3 py-2 font-mono text-[13px]">
                    {entry.formula}
                  </dd>
                </div>
              )}
              {entry.risk && (
                <div>
                  <dt className="font-semibold">위험</dt>
                  <dd className="text-slate-700">{entry.risk}</dd>
                </div>
              )}
              {entry.commonMistake && (
                <div>
                  <dt className="font-semibold">흔한 실수</dt>
                  <dd className="text-slate-700">{entry.commonMistake}</dd>
                </div>
              )}
            </dl>
            <div className="mt-4 border-t border-slate-200 pt-3">
              <p className="mb-2 text-xs font-semibold text-slate-500">
                연결된 용어
              </p>
              <div className="flex flex-wrap gap-2">
                {entry.related.map((r) => {
                  const t = getTerm(r);
                  if (!t) return null;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setCurrent(r)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        r === current
                          ? "border-blue-700 bg-blue-50 text-blue-800"
                          : "border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {t.term}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-400">{entry.sourceNote}</p>
          </div>
        </div>
      )}
    </>
  );
}
