import type { MarketSnapshot } from "@/lib/econ-types";

function todayKST(): string {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return now.toISOString().slice(0, 10);
}

export function getFallbackMarket(): MarketSnapshot {
  return {
    date: todayKST(),
    source: "fallback",
    notice: "현재는 예시 데이터입니다. 실제 API 연결 후 실시간 시세로 교체됩니다.",
    exchange: [
      { code: "USD", label: "미국 달러", pair: "USD/KRW", value: 1380.5, change: 4.5, changePercent: 0.33, direction: "up", unit: "원" },
      { code: "JPY", label: "일본 엔(100엔)", pair: "JPY/KRW", value: 920.3, change: -3.2, changePercent: -0.35, direction: "down", unit: "원" },
      { code: "EUR", label: "유로", pair: "EUR/KRW", value: 1492.8, change: 2.1, changePercent: 0.14, direction: "up", unit: "원" },
      { code: "CNY", label: "중국 위안", pair: "CNY/KRW", value: 190.42, change: 0.0, changePercent: 0.0, direction: "flat", unit: "원" },
    ],
    stocks: [
      { code: "KOSPI", label: "코스피", value: 2652.4, change: 12.6, changePercent: 0.48, direction: "up" },
      { code: "KOSDAQ", label: "코스닥", value: 842.15, change: -4.3, changePercent: -0.51, direction: "down" },
    ],
    rates: [
      { code: "BASE", label: "한국은행 기준금리", value: 3.0, unit: "%", description: "모든 금리의 기준점", direction: "flat", changePercent: 0 },
      { code: "DEPOSIT", label: "대표 정기예금", value: 3.52, unit: "%", description: "1년 만기 평균 예시", direction: "up", changePercent: 0.05 },
      { code: "LOAN", label: "대표 주택담보대출", value: 4.68, unit: "%", description: "신규 취급액 기준 예시", direction: "down", changePercent: -0.08 },
    ],
  };
}
