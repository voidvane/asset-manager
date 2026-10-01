"use client";

import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { formatKRW4 } from "@/lib/money";
import {
  projectAll,
  defaultScenarios,
  minorToManwon,
} from "@/lib/forecast";

const LINE_COLORS = ["#F59E0B", "#1D4ED8", "#10B981"];

function toMinorFromManwon(manw: number): bigint | null {
  if (!Number.isFinite(manw) || manw < 0 || manw > 1_000_000_000_000) return null;
  return BigInt(Math.round(manw)) * 100_000_000n;
}

export default function ForecastPage() {
  const [start, setStart] = useState("8380");
  const [annual, setAnnual] = useState("1200");
  const [years, setYears] = useState("20");
  const [baseReturn, setBaseReturn] = useState("5");
  const [inflation, setInflation] = useState("2");

  const result = useMemo(() => {
    const startMinor = toMinorFromManwon(Number(start));
    const annualMinor = toMinorFromManwon(Number(annual));
    const y = Number(years);
    const r = Number(baseReturn);
    const inf = Number(inflation);
    if (
      startMinor === null ||
      annualMinor === null ||
      !Number.isInteger(y) ||
      y < 1 ||
      y > 50 ||
      !Number.isFinite(r) ||
      r < -50 ||
      r > 50 ||
      !Number.isFinite(inf) ||
      inf < -1 ||
      inf > 20
    ) {
      return { error: "입력을 확인하세요 (기간 1~50년, 수익률 -50~50%, 물가 -1~20%)." } as const;
    }
    try {
      const scenarios = defaultScenarios(Math.round(r * 100), Math.round(inf * 100));
      const results = projectAll(
        {
          startNetWorth: startMinor,
          annualContribution: annualMinor,
          contributionGrowthBps: 0,
          years: y,
        },
        scenarios
      );
      return { error: null, results } as const;
    } catch {
      return { error: "가정 범위를 초과했습니다. 값을 낮춰주세요." } as const;
    }
  }, [start, annual, years, baseReturn, inflation]);

  const chartData = useMemo(() => {
    if (result.error || !result.results) return [];
    const n = result.results[0].years.length;
    return Array.from({ length: n }, (_, i) => {
      const row: Record<string, number> = {
        year: result.results![0].years[i].year,
      };
      for (const r of result.results!) {
        row[r.scenario.name] = Math.round(
          minorToManwon(r.years[i].balanceNominal)
        );
      }
      return row;
    });
  }, [result]);

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums focus:border-blue-600 focus:outline-none";

  return (
    <main className="space-y-4 py-6 md:py-10">
      <div className="space-y-1">
        <h1 className="text-xl font-bold md:text-2xl">장기 시나리오 시뮬레이션</h1>
        <p className="text-sm text-slate-600">
          같은 저축액을 3가지 수익률 가정(보수/기본/낙관, ±2%p)으로 굴릴 때의
          궤적을 비교합니다.
        </p>
      </div>

      <Card title="가정 입력">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <label className="block text-xs text-slate-500">
            시작 순자산 (만원)
            <input
              type="number"
              min={0}
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block text-xs text-slate-500">
            연간 저축액 (만원)
            <input
              type="number"
              min={0}
              value={annual}
              onChange={(e) => setAnnual(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block text-xs text-slate-500">
            기간 (년, 1~50)
            <input
              type="number"
              min={1}
              max={50}
              value={years}
              onChange={(e) => setYears(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block text-xs text-slate-500">
            기본 수익률 (%/년)
            <input
              type="number"
              step={0.1}
              value={baseReturn}
              onChange={(e) => setBaseReturn(e.target.value)}
              className={inputCls}
            />
          </label>
          <label className="block text-xs text-slate-500">
            물가 (%/년)
            <input
              type="number"
              step={0.1}
              value={inflation}
              onChange={(e) => setInflation(e.target.value)}
              className={inputCls}
            />
          </label>
        </div>
      </Card>

      {result.error || !result.results ? (
        <Card title="결과">
          <p className="text-sm text-red-600">{result.error}</p>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {result.results.map((r) => {
              const last = r.years[r.years.length - 1];
              return (
                <Card key={r.scenario.name} title={`${r.scenario.name} 시나리오`}>
                  <p className="text-lg font-bold tabular-nums">
                    {formatKRW4(last.balanceNominal)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {last.year}년 후 명목 · 현재가치{" "}
                    {formatKRW4(last.balanceReal)}
                  </p>
                </Card>
              );
            })}
          </div>

          <Card title="연도별 순자산 추이 (만원, 명목)">
            <div className="h-72 w-full md:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={70} />
                  <Tooltip
                    formatter={(value) =>
                      `${Number(value).toLocaleString("ko-KR")}만원`
                    }
                  />
                  <Legend />
                  {result.results.map((r, i) => (
                    <Line
                      key={r.scenario.name}
                      type="monotone"
                      dataKey={r.scenario.name}
                      stroke={LINE_COLORS[i % LINE_COLORS.length]}
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="연도별 내역">
            <div className="max-h-96 overflow-auto">
              <table className="w-full min-w-[560px] text-sm tabular-nums">
                <thead className="sticky top-0 bg-white">
                  <tr className="border-b text-left text-xs text-slate-500">
                    <th className="py-2 pr-2">연도</th>
                    <th className="py-2 pr-2 text-right">연간 저축</th>
                    {result.results.map((r) => (
                      <th key={r.scenario.name} className="py-2 text-right">
                        {r.scenario.name} (명목)
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.results[0].years.map((_, i) => (
                    <tr key={i} className="border-b border-slate-100">
                      <td className="py-1.5 pr-2">
                        {result.results![0].years[i].year}년
                      </td>
                      <td className="py-1.5 pr-2 text-right">
                        {formatKRW4(result.results![0].years[i].contribution)}
                      </td>
                      {result.results!.map((r) => (
                        <td key={r.scenario.name} className="py-1.5 text-right">
                          {formatKRW4(r.years[i].balanceNominal)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      <Card title="면책 및 가정">
        <ul className="list-disc space-y-1 pl-5 text-xs text-slate-500">
          <li>연 1회 복리, 저축액은 연초 납입 가정(수익이 과대평가될 수 있음).</li>
          <li>세금·수수료·생애주기 소득변화를 반영하지 않음.</li>
          <li>결과는 보장된 미래가 아니라 가정 비교용 시뮬레이션임.</li>
          <li>방법론: `lib/forecast.ts` 주석 참조.</li>
        </ul>
      </Card>
    </main>
  );
}
