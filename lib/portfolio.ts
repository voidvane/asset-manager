/**
 * 포트폴리오 성격 진단 (표시용, 결정적 규칙).
 *
 * 입력은 모두 정수 bp(1bp = 0.01%)로 받아 부동소수 오차를 피한다.
 * - investBps: 주식·ETF / 총자산
 * - cashBps: (예·적금 + 현금) / 총자산
 * - estateBps: 부동산 / 총자산
 * - debtBps: 총부채 / 총자산 (총자산 0이면 별도 처리)
 */

export interface PortfolioRatios {
  investBps: number;
  cashBps: number;
  estateBps: number;
  /** 총자산이 0이면 null (부채비율 계산 불가). */
  debtBps: number | null;
  totalAssetsMinor: bigint;
}

export interface PortfolioProfile {
  id:
    | "empty"
    | "high-debt"
    | "aggressive"
    | "growth"
    | "estate-heavy"
    | "stable"
    | "balanced";
  label: string;
  summary: string;
  action: string;
}

export function diagnosePortfolio(r: PortfolioRatios): PortfolioProfile {
  if (r.totalAssetsMinor <= 0n) {
    return {
      id: "empty",
      label: "입력 대기",
      summary: "아직 집계할 자산이 없습니다. 아래 입력란에 현재 금액을 입력하세요.",
      action: "예·적금, 주식·ETF, 부동산, 현금 중 보유한 항목부터 입력하면 총자산·순자산이 계산됩니다.",
    };
  }
  const debt = r.debtBps ?? 0;
  if (debt > 7000) {
    return {
      id: "high-debt",
      label: "고부채 주의형",
      summary: `부채비율 ${(debt / 100).toFixed(1)}% — 총자산 대비 부채가 70%를 넘습니다.`,
      action: "고금리 부채부터 상환 순서를 정하고, 비상자금(월 지출 3~6개월분)이 있는지 점검하세요.",
    };
  }
  if (r.investBps >= 6000) {
    return {
      id: "aggressive",
      label: "공격성장형",
      summary: `주식·ETF 비중 ${(r.investBps / 100).toFixed(1)}% — 시장 변동에 크게 출렁입니다.`,
      action: "단일 테마 집중을 피하고 분산·리밸런싱 주기(예: 연 1회)를 정하세요.",
    };
  }
  if (r.investBps >= 3500) {
    return {
      id: "growth",
      label: "성장추구형",
      summary: `주식·ETF 비중 ${(r.investBps / 100).toFixed(1)}% — 성장과 안정의 중간 지대입니다.`,
      action: "현금성 비중과 부채비율을 함께 보며 시나리오 페이지에서 저축액을 바꿔보세요.",
    };
  }
  if (r.estateBps >= 5000) {
    return {
      id: "estate-heavy",
      label: "부동산집중형",
      summary: `부동산 비중 ${(r.estateBps / 100).toFixed(1)}% — 유동성이 낮고 편중이 큽니다.`,
      action: "급할 때 깨야 하는 자산이 없는지 현금성 비중을 먼저 확보하세요.",
    };
  }
  if (r.cashBps >= 6000) {
    return {
      id: "stable",
      label: "안정지향형",
      summary: `현금성 비중 ${(r.cashBps / 100).toFixed(1)}% — 안전하지만 물가 상승에 약합니다.`,
      action: "비상자금 외 여유분은 장기 시나리오(학습 메뉴)로 굴렸을 때를 비교해 보세요.",
    };
  }
  return {
    id: "balanced",
    label: "균형형",
    summary: "특정 자산군 쏠림이 크지 않은 상태입니다.",
    action: "목표 비중(예: 주식:현금:부동산)을 정해두고 분기마다 비중 이탈을 확인하세요.",
  };
}
