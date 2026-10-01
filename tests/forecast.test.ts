import { describe, it, expect } from "vitest";
import { parseMoney4 } from "@/lib/money";
import {
  projectScenario,
  projectAll,
  defaultScenarios,
  minorToManwon,
} from "@/lib/forecast";

const base = { name: "기본", returnBps: 500, inflationBps: 200 };

describe("projectScenario math", () => {
  it("zero return + zero growth is exact linear accumulation", () => {
    const r = projectScenario(
      {
        startNetWorth: parseMoney4("100"),
        annualContribution: parseMoney4("10"),
        contributionGrowthBps: 0,
        years: 3,
      },
      { name: "zero", returnBps: 0, inflationBps: 0 }
    );
    expect(r.years.map((y) => y.balanceNominal)).toEqual([
      parseMoney4("110"),
      parseMoney4("120"),
      parseMoney4("130"),
    ]);
  });
  it("10% of 100 = 110 (single year, contribution at start)", () => {
    const r = projectScenario(
      {
        startNetWorth: parseMoney4("100"),
        annualContribution: parseMoney4("0"),
        contributionGrowthBps: 0,
        years: 1,
      },
      { name: "t", returnBps: 1000, inflationBps: 0 }
    );
    expect(r.years[0].balanceNominal).toBe(parseMoney4("110"));
  });
  it("real < nominal when inflation > 0", () => {
    const r = projectScenario(
      {
        startNetWorth: parseMoney4("100"),
        annualContribution: parseMoney4("0"),
        contributionGrowthBps: 0,
        years: 5,
      },
      base
    );
    const last = r.years[r.years.length - 1];
    expect(last.balanceReal < last.balanceNominal).toBe(true);
  });
  it("real == nominal when inflation == 0", () => {
    const r = projectScenario(
      {
        startNetWorth: parseMoney4("100"),
        annualContribution: parseMoney4("10"),
        contributionGrowthBps: 0,
        years: 5,
      },
      { name: "z", returnBps: 500, inflationBps: 0 }
    );
    for (const y of r.years) {
      expect(y.balanceReal).toBe(y.balanceNominal);
    }
  });
  it("contribution growth compounds", () => {
    const r = projectScenario(
      {
        startNetWorth: parseMoney4("0"),
        annualContribution: parseMoney4("100"),
        contributionGrowthBps: 1000, // +10%/yr
        years: 2,
      },
      { name: "g", returnBps: 0, inflationBps: 0 }
    );
    expect(r.years[0].contribution).toBe(parseMoney4("100"));
    expect(r.years[1].contribution).toBe(parseMoney4("110"));
    expect(r.years[1].balanceNominal).toBe(parseMoney4("210"));
  });
});

describe("scenario ordering", () => {
  it("upside final >= base final >= downside final", () => {
    const input = {
      startNetWorth: parseMoney4("1000"),
      annualContribution: parseMoney4("100"),
      contributionGrowthBps: 0,
      years: 10,
    };
    const results = projectAll(input, defaultScenarios(500, 200));
    expect(results).toHaveLength(3);
    const finals = results.map((r) => r.years[9].balanceNominal);
    expect(finals[0] <= finals[1]).toBe(true);
    expect(finals[1] <= finals[2]).toBe(true);
  });
});

describe("validation", () => {
  const okInput = {
    startNetWorth: 0n,
    annualContribution: 0n,
    contributionGrowthBps: 0,
    years: 1,
  };
  it("rejects out-of-range input", () => {
    expect(() =>
      projectScenario({ ...okInput, years: 0 }, base)
    ).toThrow(RangeError);
    expect(() =>
      projectScenario({ ...okInput, years: 51 }, base)
    ).toThrow(RangeError);
    expect(() =>
      projectScenario({ ...okInput, startNetWorth: -1n }, base)
    ).toThrow(RangeError);
    expect(() => projectAll(okInput, [])).toThrow(RangeError);
  });
  it("rejects extreme rates", () => {
    expect(() =>
      projectScenario(okInput, { ...base, returnBps: 99999 })
    ).toThrow(RangeError);
  });
});

describe("minorToManwon (display only)", () => {
  it("converts 83,800,000원 to 8380만원", () => {
    expect(minorToManwon(parseMoney4("83800000"))).toBe(8380);
  });
});
