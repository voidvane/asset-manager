import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Term } from "@/components/knowledge/Term";
import { AllocationBar } from "@/components/charts/AllocationBar";
import { parseMoney4, formatKRW4, sumMoney4 } from "@/lib/money";

// DB 연동 전 목업. 합계는 money.ts 불변식으로 검증됨:
// sum(classes) == totalAssets (빌드 시점이 아닌 테스트에서 검증, 아래 주석 참조).
const CLASSES = [
  { label: "예·적금", amount: "45800000" },
  { label: "주식·ETF", amount: "42000000" },
  { label: "부동산", amount: "30000000" },
  { label: "현금", amount: "8000000" },
];

const TOTAL_LIABILITIES = "42000000";
const MOM_DIFF = "1250000";

const fmt = (s: string | bigint): string =>
  formatKRW4(typeof s === "string" ? parseMoney4(s) : s);

export default function DashboardPage() {
  const classValues = CLASSES.map((c) => parseMoney4(c.amount));
  const totalAssets = sumMoney4(classValues);
  const netWorth = totalAssets - parseMoney4(TOTAL_LIABILITIES);

  return (
    <main className="space-y-4 py-6 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h1 className="text-xl font-bold md:text-2xl">자산 대시보드</h1>
        <Link
          href="/forecast"
          className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
        >
          이 자산으로 시나리오 실행
        </Link>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="순자산">
          <p className="text-2xl font-bold tabular-nums md:text-3xl">
            {fmt(netWorth)}
          </p>
          <p className="mt-1 text-sm text-blue-700">
            전월 대비 {fmt(MOM_DIFF)} 증가
          </p>
        </Card>
        <Card title="총자산">
          <p className="text-xl font-semibold tabular-nums">
            {fmt(totalAssets)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {CLASSES.length}개 자산군 합계
          </p>
        </Card>
        <Card title="총부채">
          <p className="text-xl font-semibold tabular-nums">
            {fmt(TOTAL_LIABILITIES)}
          </p>
          <p className="mt-1 text-xs text-slate-500">대출·신용카드 등</p>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="자산 구성">
          <AllocationBar
            labels={CLASSES.map((c) => c.label)}
            values={classValues}
            total={totalAssets}
          />
        </Card>
        <Card title="인사이트 (계산 기반)">
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            <li>
              현금성(<Term slug="cash">예·적금+현금</Term>) 비중을 확인하고
              비상자금을 점검하세요.
            </li>
            <li>
              투자자산(주식·ETF) 집중도가 높으면{" "}
              <Term slug="diversification">분산</Term>을 검토하세요.
            </li>
            <li>
              <Link href="/forecast" className="text-blue-700 underline">
                시나리오 페이지
              </Link>
              에서 저축액을 바꿔 미래 궤적을 비교하세요.
            </li>
          </ul>
        </Card>
      </div>
    </main>
  );
}
