import { NextResponse } from "next/server";
import { getFallbackMarket } from "@/data/market-fallback";

export async function GET() {
  // TODO: 실제 시세 API(한국은행 ECOS, 공공데이터 등) 연결 시 이 route에서 fetch 후 캐시.
  // 현재는 UI와 데이터 계층 분리를 위해 fallback 스냅샷을 반환한다.
  return NextResponse.json(getFallbackMarket(), { status: 200 });
}
