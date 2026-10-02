import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ECONOMIC_TERMS, getTermBySlug } from "@/data/terms";
import { FlashCard } from "@/components/flashcard/FlashCard";

export function generateStaticParams() {
  return ECONOMIC_TERMS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const term = getTermBySlug(params.slug);
  if (!term) return { title: "용어를 찾을 수 없습니다 — 경제카드" };
  return {
    title: `${term.term} — 경제카드`,
    description: term.shortDescription,
  };
}

export default function TermDetailPage({ params }: { params: { slug: string } }) {
  const term = getTermBySlug(params.slug);
  if (!term) notFound();

  const index = ECONOMIC_TERMS.findIndex((t) => t.slug === term.slug);
  const prev = index > 0 ? ECONOMIC_TERMS[index - 1] : undefined;
  const next = index < ECONOMIC_TERMS.length - 1 ? ECONOMIC_TERMS[index + 1] : undefined;
  const related = term.relatedTerms
    .map((slug) => ECONOMIC_TERMS.find((t) => t.slug === slug))
    .filter((t): t is (typeof ECONOMIC_TERMS)[number] => Boolean(t));

  return (
    <main className="space-y-4">
      <nav aria-label="현재 위치" className="text-sm text-[var(--color-text-secondary)]">
        <Link href="/" className="underline underline-offset-2">홈</Link>
        {" / "}
        <Link href="/terms" className="underline underline-offset-2">용어</Link>
        {" / "}
        <span aria-current="page" className="font-semibold text-[var(--color-text)]">{term.term}</span>
      </nav>
      <FlashCard
        term={term}
        index={index}
        total={ECONOMIC_TERMS.length}
        prevSlug={prev?.slug}
        nextSlug={next?.slug}
        relatedTerms={related}
      />
    </main>
  );
}
