import { describe, it, expect } from "vitest";
import { formatKRW } from "@/lib/format";

describe("formatKRW", () => {
  it("formats number", () => {
    expect(formatKRW(1000000)).toBe("1,000,000원");
  });
  it("handles invalid", () => {
    expect(formatKRW(NaN)).toBe("0원");
  });
});
