import type { InterestRate, StockIndex, ExchangeRate, TrendDirection } from "@/lib/econ-types";
import { formatMarketValue, formatSigned } from "@/lib/market";

function TrendBadge({ direction, text }: { direction: TrendDirection; text: string }) {
  const label = direction === "up" ? "상승" : direction === "down" ? "하락" : "보합";
  const cls =
    direction === "up"
      ? "bg-red-50 text-red-700 border-red-200"
      : direction === "down"
        ? "bg-blue-50 text-blue-700 border-blue-200"
        : "bg-slate-100 text-slate-600 border-slate-200";
  const arrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "●";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${cls}`}>
      <span aria-hidden="true">{arrow}</span>
      {text}
      <span className="sr-only">({label})</span>
    </span>
  );
}

export function ExchangeRateCard({ item }: { item: ExchangeRate }) {
  return (
    <article className="card p-4" aria-label={`${item.label} ${item.pair}`}>
      <p className="text-xs font-medium text-[var(--color-text-secondary)]">{item.pair}</p>
      <h3 className="mt-0.5 text-sm font-semibold">{item.label}</h3>
      <p className="mt-2 text-xl font-bold tabular-nums">
        {formatMarketValue(item.value, item.code === "CNY" ? 2 : 1)}
        <span className="ml-1 text-xs font-medium text-[var(--color-text-secondary)]">{item.unit}</span>
      </p>
      <div className="mt-2">
        <TrendBadge
          direction={item.direction}
          text={`${formatSigned(item.change, 1)} (${formatSigned(item.changePercent, 2)}%)`}
        />
      </div>
    </article>
  );
}

export function StockIndexCard({ item }: { item: StockIndex }) {
  return (
    <article className="card p-4" aria-label={`${item.label} 지수`}>
      <h3 className="text-sm font-semibold">{item.label}</h3>
      <p className="mt-2 text-xl font-bold tabular-nums">{formatMarketValue(item.value, 2)}</p>
      <div className="mt-2">
        <TrendBadge
          direction={item.direction}
          text={`${formatSigned(item.change, 2)} (${formatSigned(item.changePercent, 2)}%)`}
        />
      </div>
    </article>
  );
}

export function InterestRateCard({ item }: { item: InterestRate }) {
  return (
    <article className="card p-4" aria-label={`${item.label} 금리`}>
      <h3 className="text-sm font-semibold">{item.label}</h3>
      <p className="mt-2 text-xl font-bold tabular-nums">
        {item.value.toFixed(2)}
        <span className="ml-1 text-xs font-medium text-[var(--color-text-secondary)]">{item.unit}</span>
      </p>
      <p className="mt-1 text-xs text-[var(--color-text-secondary)]">{item.description}</p>
    </article>
  );
}
