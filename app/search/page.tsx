import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "검색 — 경제카드",
  description: "경제 용어 검색",
};

export default function SearchPage({ searchParams }: { searchParams?: { q?: string } }) {
  const q = searchParams?.q ?? "";
  return (
    <main className="space-y-4">
      <h1 className="text-xl font-black">검색</h1>
      <p className="text-sm text-[var(--color-text-secondary)]">
        용어 검색은 용어 페이지에서 함께 제공합니다.
      </p>
      <Link
        href={q ? `/terms?q=${encodeURIComponent(q)}` : "/terms"}
        className="btn-primary justify-center"
      >
        용어 페이지에서{q ? ` “${q}” ` : " "}검색하기
      </Link>
    </main>
  );
}
