import type { MarketSnapshot } from "@/lib/econ-types";
import { getFallbackMarket } from "@/data/market-fallback";

export async function fetchMarketSnapshot(signal?: AbortSignal): Promise<MarketSnapshot> {
  try {
    const res = await fetch("/api/market", { signal, cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = (await res.json()) as MarketSnapshot;
    if (!json.exchange || !json.stocks || !json.rates) throw new Error("invalid payload");
    return json;
  } catch {
    return getFallbackMarket();
  }
}

export function formatMarketValue(value: number, digits = 2): string {
  return value.toLocaleString("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function formatSigned(value: number, digits = 2): string {
  const sign = value > 0 ? "+" : value < 0 ? "-" : "";
  return `${sign}${Math.abs(value).toLocaleString("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })}`;
}
