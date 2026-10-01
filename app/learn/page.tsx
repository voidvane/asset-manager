"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Term } from "@/components/knowledge/Term";
import { TERMS } from "@/lib/knowledge";

export default function LearnPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return TERMS;
    return TERMS.filter(
      (t) =>
        t.term.includes(q) || t.short.includes(q) || t.definition.includes(q)
    );
  }, [query]);

  return (
    <main className="space-y-4 py-6 md:py-10">
      <div className="space-y-1">
        <h1 className="text-xl font-bold md:text-2xl">금융 지식 사전</h1>
        <p className="text-sm text-slate-600">
          파란 용어를 탭하면 정의·예시·위험·흔한 실수가 열립니다. 연결된
          용어를 따라가며 문어발식으로 확장하세요.
        </p>
      </div>

      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="용어 검색 (예: 연금, 복리, 세금)"
        aria-label="용어 검색"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-blue-600 focus:outline-none"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t) => (
          <Card key={t.slug} title={t.term}>
            <p className="mb-3 text-sm text-slate-600">{t.short}</p>
            <Term slug={t.slug}>자세히 보기 →</Term>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-slate-500">
          검색 결과가 없습니다. 다른 단어로 검색해 보세요.
        </p>
      )}

      <Card title="출처 원칙">
        <p className="text-xs text-slate-500">
          수치는 기억이 아니라 공식 자료가 기준입니다. 세율·한도·수령 조건 등
          제도 수치는 다루지 않으며, 가입·신고 시점에는 국세청·국민연금공단 등
          공식 기관 자료를 직접 확인하세요.
        </p>
      </Card>
    </main>
  );
}
