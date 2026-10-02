"use client";

import { useEffect, useState } from "react";
import type { MarketSnapshot } from "@/lib/econ-types";
import { fetchMarketSnapshot } from "@/lib/market";
import { getFallbackMarket } from "@/data/market-fallback";
import { ExchangeRateCard, InterestRateCard, StockIndexCard } from "@/components/econ/MarketCards";
import { EmptyState, ErrorState, LoadingState } from "@/components/states/States";

type Status = "loading" | "error" | "success";

export function EconomicSummary() {
  const [status, setStatus] = useState<Status>("loading");
  const [snapshot, setSnapshot] = useState<MarketSnapshot>(() => getFallbackMarket());

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    fetchMarketSnapshot(controller.signal)
      .then((data) => {
        if (cancelled) return;
        setSnapshot(data);
        setStatus("success");
      })
      .catch(() => {
        if (cancelled) return;
        setSnapshot(getFallbackMarket());
        setStatus("error");
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  if (status === "loading") {
    return (
      <section aria-label="경제 현황">
        <LoadingState message="오늘의 경제 현황을 불러오는 중입니다…" />
      </section>
    );
  }

  const retry = () => {
    setStatus("loading");
    fetchMarketSnapshot()
      .then((data) => {
        setSnapshot(data);
        setStatus("success");
      })
      .catch(() => {
        setSnapshot(getFallbackMarket());
        setStatus("error");
      });
  };

  return (
    <section aria-label="경제 현황" className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold">오늘의 경제 현황</h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            {snapshot.date} 기준 · {snapshot.source === "fallback" ? "예시 데이터" : "실시간 데이터"}
          </p>
        </div>
        {status === "error" ? (
          <span className="rounded-full bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-800">
            오프라인 예시로 표시 중
          </span>
        ) : null}
      </div>

      {status === "error" ? (
        <ErrorState
          title="실시간 시세를 불러오지 못했습니다"
          description="예시 데이터로 화면을 보여드립니다. 네트워크 연결 후 다시 시도해 주세요."
          onRetry={retry}
        />
      ) : null}

      {snapshot.exchange.length === 0 ? (
        <EmptyState title="표시할 환율 정보가 없습니다" />
      ) : (
        <div>
          <h3 className="mb-2 text-sm font-semibold text-[var(--color-text-secondary)]">환율</h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {snapshot.exchange.map((item) => (
              <ExchangeRateCard key={item.code} item={item} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="mb-2 text-sm font-semibold text-[var(--color-text-secondary)]">증시</h3>
        <div className="grid grid-cols-2 gap-3">
          {snapshot.stocks.map((item) => (
            <StockIndexCard key={item.code} item={item} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-sm font-semibold text-[var(--color-text-secondary)]">금리</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {snapshot.rates.map((item) => (
            <InterestRateCard key={item.code} item={item} />
          ))}
        </div>
      </div>

      <p className="text-xs text-[var(--color-text-secondary)]">{snapshot.notice}</p>
    </section>
  );
}
