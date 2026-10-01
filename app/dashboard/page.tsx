import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Card } from "@/components/ui/Card";
import { parseMoney4, formatKRW4 } from "@/lib/money";

// 3단계 DB 연동 전: 목업 데이터로 UI 검증용 (표시는 decimal-safe 경로 사용)
const mock = {
  totalAssets: 125800000,
  totalLiabilities: 42000000,
  netWorth: 83800000,
  momDiff: 1250000,
};

const fmt = (n: number): string => formatKRW4(parseMoney4(String(n)));

export default function DashboardPage() {
  return (
    <>
      <Header title="자산 대시보드" />
      <main className="flex-1 space-y-4 p-4">
        <Card title="순자산">
          <p className="text-2xl font-bold">{fmt(mock.netWorth)}</p>
          <p className="mt-1 text-sm text-blue-700">
            전월 대비 {fmt(mock.momDiff)} 증가
          </p>
        </Card>
        <div className="grid grid-cols-2 gap-3">
          <Card title="총자산">
            <p className="text-lg font-semibold">{fmt(mock.totalAssets)}</p>
          </Card>
          <Card title="총부채">
            <p className="text-lg font-semibold">{fmt(mock.totalLiabilities)}</p>
          </Card>
        </div>
        <Card title="자산 구성 (DB 연동 후 차트)">
          <p className="text-sm text-slate-500">
            8단계에서 Recharts 도넛 차트로 교체 예정
          </p>
        </Card>
      </main>
      <BottomNav />
    </>
  );
}
