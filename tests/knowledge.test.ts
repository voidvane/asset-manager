import { describe, it, expect } from "vitest";
import { TERMS, getTerm } from "@/lib/knowledge";

describe("knowledge base integrity", () => {
  it("has enough terms to cover the required domains", () => {
    expect(TERMS.length).toBeGreaterThanOrEqual(20);
  });
  it("slugs are unique", () => {
    const slugs = TERMS.map((t) => t.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("required fields are non-empty", () => {
    for (const t of TERMS) {
      expect(t.term.trim().length).toBeGreaterThan(0);
      expect(t.short.trim().length).toBeGreaterThan(0);
      expect(t.definition.trim().length).toBeGreaterThan(0);
      expect(t.whyItMatters.trim().length).toBeGreaterThan(0);
      expect(t.example.trim().length).toBeGreaterThan(0);
      expect(t.sourceNote.trim().length).toBeGreaterThan(0);
      expect(t.jurisdiction).toBe("KR");
    }
  });
  it("every related slug resolves (octopus arms never dangle)", () => {
    for (const t of TERMS) {
      expect(t.related.length).toBeGreaterThan(0);
      for (const r of t.related) {
        expect(getTerm(r), `${t.slug} -> ${r}`).toBeDefined();
      }
    }
  });
  it("contains no URLs (never invent links)", () => {
    const blob = JSON.stringify(TERMS);
    expect(blob).not.toMatch(/https?:\/\//);
  });
  it("IRP entry exists and RIP does not (UNRESOLVED stays unresolved)", () => {
    expect(getTerm("irp")).toBeDefined();
    expect(getTerm("rip")).toBeUndefined();
  });
});
