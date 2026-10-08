"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { Term } from "@/components/knowledge/Term";
import { AllocationBar } from "@/components/charts/AllocationBar";
import {
  formatKRW4,
  sumMoney4,
  allocationBps,
} from "@/lib/money";
import { diagnosePortfolio } from "@/lib/portfolio";

const STORAGE_KEY = "kkb-assets-v1";

const FIELDS = [
  { key: "savings", label: "예·적금 (만원)", placeholder: "예: 1200" },
  { key: "stocks", label: "주식·ETF (만원)", placeholder: "예: 800" },
  { key: "estate", label: "부동산 (만원)", placeholder: "예: 3000" },
  { key: "cash", label: "현금 (만원)", placeholder: "예: 300" },
  { key: "other", label: "기타 자산 (만원)", placeholder: "예: 0" },
  { key: "loan", label: "대출 잔액 (만원)", placeholder: "예: 1500" },
  { key: "otherDebt", label: "기타 부채 (만원)", placeholder: "예: 0" },
] as const;

type FieldKey = (typeof FIELDS)[number]["key"];
type FormState = Record<FieldKey, string>;

const EMPTY: FormState = {
  savings: "",
  stocks: "",
  estate: "",
  cash: "",
  other: "",
  loan: "",
  otherDebt: "",
};

const ASSET_KEYS: FieldKey[] = ["savings", "stocks", "estate", "cash", "other"];
const DEBT_KEYS: FieldKey[] = ["loan", "otherDebt"];

const ASSET_LABELS = ["예·적금", "주식·ETF", "부동산", "현금", "기타"];
const PIE_COLORS = ["#1D4ED8", "#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6"];

function parseManwon(s: string): number | null {
  const t = s.trim();
  if (t === "") return 0;
  if (!/^\d+(\.\d{1,1})?$/.test(t)) return null;
  const n = Number(t);
  if (!Number.isFinite(n) || n < 0 || n > 100_000_000) return null;
  return n;
}

function manwonToMinor(manw: number): bigint {
  return BigInt(Math.round(manw * 10)) * 10_000_000n;
}

function minorToManwonNum(minor: bigint): number {
  const neg = minor < 0n;
  const abs = neg ? -minor : minor;
  const won = (abs + 5_000n) / 10_000n;
  const man = Number(won) / 10_000;
  return neg ? -man : man;
}

export default function DashboardPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<FormState>;
        setForm((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      /* 무시: 저장값 파손 시 빈 폼 유지 */
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch {
      /* 저장 실패 무시 */
    }
  }, [form, loaded]);

  const calc = useMemo(() => {
    const nums: Record<FieldKey, number | null> = {} as Record<
      FieldKey,
      number | null
    >;
    for (const f of FIELDS) nums[f.key] = parseManwon(form[f.key]);
    if (Object.values(nums).some((v) => v === null)) {
      return { error: "0 이상의 숫자만 입력하세요 (만원 단위, 소수 1자리까지)." } as const;
    }
    const vals = nums as Record<FieldKey, number>;
    const assetManwon = ASSET_KEYS.map((k) => vals[k]);
    const debtManwon = DEBT_KEYS.map((k) => vals[k]);
    const totalAssetManwon = assetManwon.reduce((a, b) => a + b, 0);
    const totalDebtManwon = debtManwon.reduce((a, b) => a + b, 0);
    const assetMinors = ASSET_KEYS.map((k) => manwonToMinor(vals[k]));
    const debtMinors = DEBT_KEYS.map((k) => manwonToMinor(vals[k]));
    const totalAssets = sumMoney4(assetMinors);
    const totalLiab = sumMoney4(debtMinors);
    const net = totalAssets - totalLiab;
    const bps = allocationBps(assetMinors, totalAssets);
    const investBps = bps[1];
    const cashBps = bps[0] + bps[3];
    const estateBps = bps[2];
    const debtBps =
      totalAssetManwon <= 0
        ? null
        : Math.round((totalDebtManwon / totalAssetManwon) * 10_000);
    const profile = diagnosePortfolio({
      investBps,
      cashBps,
      estateBps,
      debtBps,
      totalAssetsMinor: totalAssets,
    });
    return {
      error: null,
      vals,
      assetManwon,
      debtManwon,
      totalAssetManwon,
      totalDebtManwon,
      assetMinors,
      debtMinors,
      totalAssets,
      totalLiab,
      net,
      bps,
      investBps,
      cashBps,
      estateBps,
      debtBps,
      profile,
    } as const;
  }, [form]);

  const set = (key: FieldKey) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const reset = () => setForm(EMPTY);

  const pieData = useMemo(() => {
    if (!calc || calc.error) return [];
    return ASSET_LABELS.map((name, i) => ({
      name,
      value: Math.round(minorToManwonNum(calc.assetMinors[i])),
    })).filter((d) => d.value > 0);
  }, [calc]);

  const barData = useMemo(() => {
    if (!calc || calc.error) return [];
    return [
      { name: "총자산", 금액: Math.round(minorToManwonNum(calc.totalAssets)) },
      { name: "총부채", 금액: Math.round(minorToManwonNum(calc.totalLiab)) },
      { name: "순자산", 금액: Math.round(minorToManwonNum(calc.net)) },
    ];
  }, [calc]);

  const inputCls =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm tabular-nums focus:border-blue-600 focus:outline-none";

  return (
    <main className="space-y-4 py-6 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold md:text-2xl">자산 대시보드</h1>
          <p className="mt-1 text-sm text-slate-600">
            직접 입력한 현재 금액 기준입니다. 입력값은 이 브라우저에만
            저장됩니다.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50"
          >
            모두 지우기
          </button>
          <Link
            href="/forecast"
            className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            이 자산으로 시나리오 실행
          </Link>
        </div>
      </div>

      <Card title="내 자산 입력 (만원 단위)">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {FIELDS.map((f) => (
            <label key={f.key} className="block text-xs text-slate-500">
              {f.label}
              <input
                type="number"
                min={0}
                inputMode="decimal"
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={set(f.key)}
                className={inputCls}
              />
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">
          빈 칸은 0으로 계산됩니다. 예시 숫자가 아닌 본인 실제 잔액을
          입력하세요. {loaded ? "자동 저장됨." : "불러오는 중…"}
        </p>
      </Card>

      {!calc || calc.error ? (
        <Card title="결과">
          <p className="text-sm text-red-600">
            {(!calc && "계산 중…") || (calc && calc.error) || ""}
          </p>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 lg:grid-cols-3">
            <Card title="순자산 (총자산 − 총부채)">
              <p className="text-2xl font-bold tabular-nums md:text-3xl">
                {formatKRW4(calc.net)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                총자산 {formatKRW4(calc.totalAssets)} − 총부채{" "}
                {formatKRW4(calc.totalLiab)}
              </p>
            </Card>
            <Card title="총자산">
              <p className="text-xl font-semibold tabular-nums">
                {formatKRW4(calc.totalAssets)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                5개 자산군 합계 · 현금성 {(calc.cashBps / 100).toFixed(1)}%
              </p>
            </Card>
            <Card title="총부채">
              <p className="text-xl font-semibold tabular-nums">
                {formatKRW4(calc.totalLiab)}
              </p>
              <p className="mt-1 text-xs text-slate-500">
                {calc.debtBps === null
                  ? "총자산 입력 시 부채비율 계산"
                  : `부채비율 ${(calc.debtBps / 100).toFixed(1)}% (부채÷총자산)`}
              </p>
            </Card>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card title="자산 구성 (입력값 기준)">
              {calc.totalAssets === 0n ? (
                <p className="text-sm text-slate-500">
                  자산을 입력하면 분포 막대와 도넛 차트가 표시됩니다.
                </p>
              ) : (
                <>
                  <AllocationBar
                    labels={ASSET_LABELS}
                    values={calc.assetMinors}
                    total={calc.totalAssets}
                  />
                  <div className="mt-4 h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={52}
                          outerRadius={86}
                          paddingAngle={2}
                          isAnimationActive={false}
                        >
                          {pieData.map((_, i) => (
                            <Cell
                              key={i}
                              fill={PIE_COLORS[i % PIE_COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(v) =>
                            `${Number(v).toLocaleString("ko-KR")}만원`
                          }
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </Card>
            <Card title={`포트폴리오 성격 · ${calc.profile.label}`}>
              <p className="text-sm font-semibold text-slate-900">
                {calc.profile.summary}
              </p>
              <p className="mt-2 text-sm text-slate-700">
                {calc.profile.action}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-slate-700">
                <li>
                  투자(주식·ETF) {(calc.investBps / 100).toFixed(1)}% · 현금성{" "}
                  {(calc.cashBps / 100).toFixed(1)}% · 부동산{" "}
                  {(calc.estateBps / 100).toFixed(1)}%
                </li>
                <li>
                  핵심 점검:{" "}
                  <Term slug="allocation">자산배분</Term>,{" "}
                  <Term slug="diversification">분산</Term>,{" "}
                  <Term slug="cash">현금성자산</Term>,{" "}
                  <Term slug="rebalance">리밸런싱</Term>
                </li>
              </ul>
            </Card>
          </div>

          <Card title="자산·부채 내역 표">
            <div className="overflow-auto">
              <table className="w-full min-w-[520px] text-sm tabular-nums">
                <thead>
                  <tr className="border-b text-left text-xs text-slate-500">
                    <th className="py-2 pr-2">구분</th>
                    <th className="py-2 pr-2 text-right">금액</th>
                    <th className="py-2 text-right">총자산 대비</th>
                  </tr>
                </thead>
                <tbody>
                  {ASSET_LABELS.map((label, i) => (
                    <tr key={label} className="border-b border-slate-100">
                      <td className="py-1.5 pr-2">{label}</td>
                      <td className="py-1.5 pr-2 text-right">
                        {formatKRW4(calc.assetMinors[i])}
                      </td>
                      <td className="py-1.5 text-right">
                        {calc.totalAssets === 0n
                          ? "-"
                          : `${(calc.bps[i] / 100).toFixed(1)}%`}
                      </td>
                    </tr>
                  ))}
                  {["대출", "기타 부채"].map((label, i) => (
                    <tr
                      key={label}
                      className="border-b border-slate-100 text-slate-700"
                    >
                      <td className="py-1.5 pr-2">{label} (−)</td>
                      <td className="py-1.5 pr-2 text-right">
                        {formatKRW4(calc.debtMinors[i])}
                      </td>
                      <td className="py-1.5 text-right">
                        {calc.totalAssetManwon <= 0
                          ? "-"
                          : `${(
                              (calc.debtManwon[i] / calc.totalAssetManwon) *
                              100
                            ).toFixed(1)}%`}
                      </td>
                    </tr>
                  ))}
                  <tr className="font-semibold">
                    <td className="py-2 pr-2">순자산</td>
                    <td className="py-2 pr-2 text-right">
                      {formatKRW4(calc.net)}
                    </td>
                    <td className="py-2 text-right">
                      {calc.totalAssetManwon <= 0
                        ? "-"
                        : `${(
                            ((calc.totalAssetManwon - calc.totalDebtManwon) /
                              calc.totalAssetManwon) *
                            100
                          ).toFixed(1)}%`}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          <Card title="총자산 · 총부채 · 순자산 비교 (만원)">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={80} />
                  <Tooltip
                    formatter={(v) =>
                      `${Number(v).toLocaleString("ko-KR")}만원`
                    }
                  />
                  <Bar dataKey="금액" fill="#1D4ED8" isAnimationActive={false} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card title="인사이트 (입력값 기반)">
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
              <li>
                현금성(예·적금+현금) {(calc.cashBps / 100).toFixed(1)}% — 월
                지출 3~6개월분과 비교해 <Term slug="cash">비상자금</Term>을
                점검하세요.
              </li>
              <li>
                투자 집중이 높으면 <Term slug="diversification">분산</Term>과{" "}
                <Term slug="rebalance">리밸런싱</Term>을 검토하세요.
              </li>
              <li>
                <Link href="/forecast" className="text-blue-700 underline">
                  학습(시나리오) 페이지
                </Link>
                에서 순자산 {formatKRW4(calc.net)}을 시작값으로 넣어 미래
                궤적을 비교하세요.
              </li>
            </ul>
          </Card>
        </>
      )}

      <Link
        href="/"
        className="inline-block rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
      >
        ← 경제 학습 홈으로 돌아가기
      </Link>
    </main>
  );
}
