import { describe, expect, it } from "vitest";
import { ECONOMIC_TERMS, getTermBySlug, searchTerms } from "@/data/terms";

describe("economic terms data model", () => {
  it("has unique id and slug for every term", () => {
    const ids = new Set(ECONOMIC_TERMS.map((t) => t.id));
    const slugs = new Set(ECONOMIC_TERMS.map((t) => t.slug));
    expect(ids.size).toBe(ECONOMIC_TERMS.length);
    expect(slugs.size).toBe(ECONOMIC_TERMS.length);
  });

  it("every term has one-line, easy and example text", () => {
    for (const t of ECONOMIC_TERMS) {
      expect(t.term.length).toBeGreaterThan(0);
      expect(t.shortDescription.length).toBeGreaterThan(0);
      expect(t.easyExplanation.length).toBeGreaterThan(0);
      expect(t.example.length).toBeGreaterThan(0);
    }
  });

  it("finds terms by slug for shareable flashcard URLs", () => {
    expect(getTermBySlug("inflation")?.term).toBe("인플레이션");
    expect(getTermBySlug("no-such-term")).toBeUndefined();
  });
});

describe("searchTerms", () => {
  it("matches term name, description and keywords", () => {
    expect(searchTerms("인플레이션", "전체").map((t) => t.slug)).toContain("inflation");
    expect(searchTerms("달러", "전체").length).toBeGreaterThan(0);
    expect(searchTerms("금리", "전체").length).toBeGreaterThan(1);
  });

  it("filters by category", () => {
    const stocks = searchTerms("", "주식");
    expect(stocks.length).toBeGreaterThan(0);
    expect(stocks.every((t) => t.category === "주식")).toBe(true);
  });

  it("returns empty for unknown queries", () => {
    expect(searchTerms("zzz-no-match-zzz", "전체")).toEqual([]);
  });
});
