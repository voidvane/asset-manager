import { describe, it, expect } from "vitest";
import {
  parseMoney4,
  toDecimalString,
  sumMoney4,
  netWorth4,
  formatKRW4,
  formatDecimal4,
  allocationBps,
  checkPortfolioTotal,
  MAX_DECIMAL_19_4,
} from "@/lib/money";

describe("parseMoney4", () => {
  it("parses integer and 4dp fractions exactly", () => {
    expect(parseMoney4("0")).toBe(0n);
    expect(parseMoney4("1")).toBe(10_000n);
    expect(parseMoney4("0.0001")).toBe(1n);
    expect(parseMoney4("125800000")).toBe(1_258_000_000_000n);
    expect(parseMoney4("-42.5")).toBe(-425_000n);
  });
  it("rejects >4dp instead of silently rounding", () => {
    expect(() => parseMoney4("1.00001")).toThrow(RangeError);
  });
  it("rejects non-numeric input", () => {
    expect(() => parseMoney4("")).toThrow(RangeError);
    expect(() => parseMoney4("abc")).toThrow(RangeError);
    expect(() => parseMoney4("NaN")).toThrow(RangeError);
  });
  it("handles max Decimal(19,4) without precision loss", () => {
    expect(toDecimalString(MAX_DECIMAL_19_4)).toBe("999999999999999.9999");
  });
});

describe("arithmetic invariants", () => {
  it("0.1 + 0.2 === 0.3 exactly (float trap)", () => {
    expect(sumMoney4([parseMoney4("0.1"), parseMoney4("0.2")])).toBe(
      parseMoney4("0.3")
    );
  });
  it("empty sum is zero", () => {
    expect(sumMoney4([])).toBe(0n);
  });
  it("net worth may be negative", () => {
    expect(netWorth4(parseMoney4("100"), parseMoney4("250"))).toBe(
      parseMoney4("-150")
    );
  });
  it("portfolio total = sum(positions) + cash", () => {
    const positions = [parseMoney4("10.5"), parseMoney4("20.25")];
    const cash = parseMoney4("5");
    const total = parseMoney4("35.75");
    expect(checkPortfolioTotal(positions, cash, total)).toBe(true);
    expect(checkPortfolioTotal(positions, cash, total + 1n)).toBe(false);
  });
});

describe("formatting without Number()", () => {
  it("formats KRW with grouping, half-up rounding", () => {
    expect(formatKRW4(parseMoney4("1000000"))).toBe("1,000,000원");
    expect(formatKRW4(parseMoney4("0.5"))).toBe("1원"); // 0.5원 half-up
    expect(formatKRW4(parseMoney4("0.4999"))).toBe("0원");
    expect(formatKRW4(parseMoney4("-1500000"))).toBe("-1,500,000원");
  });
  it("trims trailing zeros up to 4dp", () => {
    expect(formatDecimal4(parseMoney4("1.5000"))).toBe("1.5");
    expect(formatDecimal4(parseMoney4("0.0001"))).toBe("0.0001");
  });
});

describe("allocationBps", () => {
  it("always sums to exactly 10000", () => {
    const out = allocationBps(
      [parseMoney4("1"), parseMoney4("1"), parseMoney4("1")],
      parseMoney4("3")
    );
    expect(out.reduce((a, b) => a + b, 0)).toBe(10_000);
  });
  it("zero total yields zeros", () => {
    expect(allocationBps([0n, 0n], 0n)).toEqual([0, 0]);
  });
  it("single holding is 100%", () => {
    expect(allocationBps([parseMoney4("50")], parseMoney4("50"))).toEqual([
      10_000,
    ]);
  });
  it("rejects negative inputs", () => {
    expect(() => allocationBps([-1n], 10n)).toThrow(RangeError);
  });
});
