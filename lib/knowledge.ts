/**
 * Financial knowledge base (section 11: Knowledge/Education engine).
 *
 * PROVENANCE RULE (section 12/38): entries are CONCEPTUAL only.
 * No tax rates, pension amounts, age thresholds, or deduction limits are
 * hardcoded — those change and must be verified against official publishers
 * (국세청, 국민연금공단, 금융감독원 등). Each entry carries jurisdiction +
 * sourceNote instead of a regulation snapshot.
 */

export interface TermEntry {
  slug: string;
  term: string;
  /** One-line summary shown on the chip/list. */
  short: string;
  definition: string;
  whyItMatters: string;
  example: string;
  formula?: string;
  risk?: string;
  commonMistake?: string;
  /** Slugs of related terms (octopus arms). Must all resolve. */
  related: string[];
  jurisdiction: "KR";
  sourceNote: string;
}

const SRC_SELF =
  "앱 내 기초 해설. 제도 수치·세율은 포함하지 않음. 정확한 기준은 공식 기관 자료를 확인할 것.";

export const TERMS: TermEntry[] = [
  {
    slug: "stock",
    term: "주식",
    short: "기업의 소유권을 나눈 증권",
    definition:
      "주식 한 주는 회사의 소유권 일부를 의미한다. 주가는 기업의 실적과 시장의 기대에 따라 매일 변한다.",
    whyItMatters:
      "장기 수익의 원천이지만 변동성이 크다. 전체 자산에서 차지하는 비중을 아는 것이 출발점이다.",
    example: "A기업 주식 10주를 5만 원에 사서 6만 원이 되면 평가액은 60만 원이다.",
    risk: "원금 손실 가능. 단일 종목 집중은 변동성을 키운다.",
    commonMistake: "단기 등락만 보고 전체 자산을 재편하는 것.",
    related: ["etf", "dividend", "diversification", "risk"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "etf",
    term: "ETF",
    short: "거래소에 상장된 인덱스 펀드",
    definition:
      "ETF는 특정 지수나 자산 바스켓을 따라가도록 설계된 펀드로, 주식처럼 장중에 사고팔 수 있다.",
    whyItMatters:
      "소액으로 분산투자를 시작하는 대표 수단이다. 같은 지수라도 보수(수수료)가 다르면 장기 수익이 갈린다.",
    example: "코스피200 ETF 1주는 200개 종목에 나눠 투자하는 효과를 낸다.",
    risk: "원금 손실 가능. 테마·레버리지 ETF는 변동성이 훨씬 크다.",
    commonMistake: "이름만 보고 구성 종목을 확인하지 않는 것.",
    related: ["stock", "fund", "fee", "diversification"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "fund",
    term: "펀드",
    short: "자금을 모아 전문가가 운용하는 상품",
    definition:
      "많은 투자자의 돈을 모아 운용사가 주식·채권 등에 투자한다. 기준가로 하루 한 번 거래되는 것이 일반적이다.",
    whyItMatters:
      "직접 종목을 고르기 어려울 때 대안이 되지만, 보수가 복리로 차감된다는 점을 계산에 넣어야 한다.",
    example: "보수 연 1.5% 펀드와 0.15% ETF의 20년 격차는 시나리오 페이지에서 감을 잡을 수 있다.",
    risk: "원금 손실 가능. 환매 제한·선취수수료 조건을 확인할 것.",
    commonMistake: "과거 수익률 순위만 보고 가입하는 것.",
    related: ["etf", "fee", "bond", "compounding"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "bond",
    term: "채권",
    short: "빌려준 돈에 대한 이자 증서",
    definition:
      "정부·기업이 자금을 빌리며 발행한다. 만기까지 보유하면 약정 이자를 받고 원금을 돌려받는 구조가 기본이다.",
    whyItMatters:
      "주식과 움직임이 다른 경우가 많아 자산배분의 완충재로 쓰인다. 금리와 가격은 반대로 움직인다.",
    example: "금리가 오르면 기존 채권의 시장가격은 내려간다.",
    risk: "발행자 부도(신용위험), 중도 매도 시 가격 변동.",
    commonMistake: "만기 전 매도 가격을 원금으로 착각하는 것.",
    related: ["rate", "allocation", "fund"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "deposit",
    term: "예금",
    short: "은행에 맡기고 이자를 받는 돈",
    definition:
      "보통예금·정기예금 등 은행에 예치하는 돈이다. 정기예금은 만기와 약정 금리가 정해져 있다.",
    whyItMatters:
      "비상자금과 단기 목표 자금의 보관처다. 만기·세후 이자·중도해지 조건을 함께 본다.",
    example: "정기예금 만기가 겹치면 만기 자금을 어떻게 굴릴지 미리 정해둔다.",
    risk: "낮음. 다만 인플레이션보다 금리가 낮으면 실질 구매력은 감소한다.",
    commonMistake: "중도해지 이자 조건을 확인하지 않는 것.",
    related: ["savings", "cash", "inflation", "rate"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "savings",
    term: "적금",
    short: "정기적으로 불입하는 저축",
    definition:
      "매월 일정액을 불입해 목돈을 만드는 상품이다. 적립식이라 저축 습관 형성에 유리하다.",
    whyItMatters:
      "사회초년생의 종잣돈 마련에 자주 쓰인다. 자동이체로 '선저축 후지출' 구조를 만든다.",
    example: "월 50만 원씩 1년이면 원금 600만 원 + 이자다.",
    risk: "낮음. 중도해지 시 약정 이자를 못 받을 수 있다.",
    commonMistake: "여러 개를 쪼개 들어 관리 포인트만 늘리는 것.",
    related: ["deposit", "cashflow", "cash"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "cash",
    term: "현금성자산",
    short: "바로 쓸 수 있는 안전 자금",
    definition:
      "현금·보통예금·수시입출금 상품처럼 즉시 인출 가능한 자산이다.",
    whyItMatters:
      "생활비 3~6개월분이 통념이지만 정답은 가구마다 다르다. 비중이 너무 낮으면 급할 때 투자자산을 깨야 한다.",
    example: "월 지출 300만 원이면 비상자금 900만~1800만 원이 출발선이다.",
    risk: "실질가치 하락(물가). 너무 많으면 기회비용.",
    commonMistake: "비상자금을 투자계좌에 섞어두는 것.",
    related: ["deposit", "cashflow", "allocation"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "fx",
    term: "외화와 환율",
    short: "다른 나라 돈과 그 교환비율",
    definition:
      "환율은 원화와 외화의 교환비율이다. 해외 주식·ETF를 들고 있으면 주가와 환율이 함께 수익을 결정한다.",
    whyItMatters:
      "원화가 약해지면 해외자산의 원화 가치는 올라가고, 강해지면 반대다. 환차손익을 주가 손익과 분리해서 본다.",
    example: "미국 ETF가 달러로 5% 올라도 원화가 5% 강해지면 원화 수익은 거의 0이다.",
    risk: "환율 변동성. 환전 수수료(스프레드).",
    commonMistake: "해외 수익을 환율 고려 없이 판단하는 것.",
    related: ["stock", "etf", "allocation"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "compounding",
    term: "복리",
    short: "수익에 수익이 붙는 구조",
    definition:
      "원금뿐 아니라 발생한 수익에도 수익이 붙는다. 기간이 길수록 가속이 붙는 이유다.",
    whyItMatters:
      "시작 시점이 늦어질수록 같은 목표에 필요한 저축액이 급격히 는다. 시나리오 페이지에서 기간을 바꿔보면 체감된다.",
    example: "연 5%로 10년이면 약 1.63배, 20년이면 약 2.65배다.",
    formula: "A = P × (1 + r)^n",
    risk: "수수료·세금도 복리로 깎는다. 복리는 양날이다.",
    commonMistake: "단리와 혼동해 장기 수익을 과소평가하는 것.",
    related: ["savings", "fund", "fee", "inflation"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "diversification",
    term: "분산투자",
    short: "달걀을 한 바구니에 담지 않기",
    definition:
      "서로 다르게 움직이는 자산에 나눠 담아 특정 자산의 충격을 완화하는 방법이다.",
    whyItMatters:
      "수익을 높이는 기술이 아니라 망하지 않는 기술이다. 종목 수보다 '다르게 움직이는가'가 핵심이다.",
    example: "같은 테마 주식 10개는 분산이 아니다. 주식+채권+현금이 분산의 출발이다.",
    risk: "과도한 분산은 관리 비용만 늘린다.",
    commonMistake: "개수만 늘리고 상관관계는 보지 않는 것.",
    related: ["allocation", "etf", "risk", "rebalance"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "allocation",
    term: "자산배분",
    short: "자산군별 비중 설계",
    definition:
      "현금·채권·주식·부동산 등 자산군별 목표 비중을 정하는 일이다. 수익의 대부분은 종목 선택이 아니라 배분에서 온다고 알려져 있다.",
    whyItMatters:
      "잠자는 밤의 질(수면의 질)을 결정한다. 목표 비중이 있어야 리밸런싱도 가능하다.",
    example: "주식 60 : 채권 30 : 현금 10 같은 형태가 목표 배분의 예다.",
    risk: "한 자산군이 불어나면 의도치 않게 위험이 커진다.",
    commonMistake: "목표 비중 없이 오를 때마다 추격 매수하는 것.",
    related: ["diversification", "rebalance", "risk", "networth"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "risk",
    term: "위험과 변동성",
    short: "얼마나 출렁이는가",
    definition:
      "금융에서 위험은 보통 수익률의 출렁임(변동성)으로 측정한다. 손실 가능성과는 다르지만 연결되어 있다.",
    whyItMatters:
      "감당 가능한 변동성을 알아야 시장 하락장에서 계획을 지킨다. 수익률은 위험의 대가다.",
    example: "연 7% 기대수익 자산은 연 -20% 구간을 만날 수 있다.",
    risk: "위험을 모르면 하락장에서 손절하고 상승장에서 추격한다.",
    commonMistake: "변동성 없는 고수익을 믿는 것.",
    related: ["allocation", "diversification", "stock"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "inflation",
    term: "인플레이션",
    short: "돈의 가치가 옅어지는 현상",
    definition:
      "물가가 오르면 같은 돈으로 살 수 있는 것이 줄어든다. 명목 금액과 실질 구매력을 구분해야 한다.",
    whyItMatters:
      "연 2% 물가도 20년이면 구매력을 3분의 1 가까이 깎는다. 시나리오의 '현재가치'가 바로 이 조정값이다.",
    example: "20년 후 6억 원도 현재가치로는 4억 원대일 수 있다.",
    risk: "안전자산만 들고 있으면 실질자산이 줄어든다.",
    commonMistake: "명목 금액만 보고 부자가 된 착각을 하는 것.",
    related: ["cash", "deposit", "rate", "compounding"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "rate",
    term: "금리",
    short: "돈의 값(사용료)",
    definition:
      "돈을 빌리거나 맡길 때의 가격이다. 기준금리가 움직이면 예금·대출·채권 가격이 함께 움직인다.",
    whyItMatters:
      "금리 상승기에는 대출 이자 부담이 늘고 채권 가격은 내린다. 내 대출과 예금을 함께 점검한다.",
    example: "주담대 변동금리라면 금리 1%p 상승이 월 상환액에 미치는 영향을 계산해본다.",
    risk: "금리 예측에 베팅하는 것은 투기에 가깝다.",
    commonMistake: "금리 전망 기사에 따라 자산 전체를 바꾸는 것.",
    related: ["bond", "deposit", "inflation"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "dividend",
    term: "배당",
    short: "기업 이익의 주주 분배",
    definition:
      "기업이 이익 일부를 주주에게 현금(또는 주식)으로 나눠준다. 배당수익률은 주가 대비 배당금 비율이다.",
    whyItMatters:
      "현금흐름이 생기지만 배당락만큼 주가가 조정되므로 '공짜 돈'이 아니다. 재투자하면 복리 효과가 난다.",
    example: "배당금을 받아 같은 주식을 다시 사면 복리 구조가 된다.",
    risk: "실적 악화 시 배당은 삭감된다.",
    commonMistake: "배당수익률만 보고 재무를 보지 않는 것.",
    related: ["stock", "cashflow", "tax"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "fee",
    term: "수수료",
    short: "조용히 복리로 빠져나가는 비용",
    definition:
      "펀드 보수·매매 수수료·환전 스프레드 등 투자 과정에서 나가는 모든 비용이다.",
    whyItMatters:
      "연 1%p의 비용 차이는 20년에 수천만 원 격차가 된다. 수익률보다 먼저 확인할 숫자다.",
    example: "같은 지수 추종 상품이라도 보수가 다르면 장기 결과가 다르다.",
    risk: "보이지 않아서 무시되기 쉽다.",
    commonMistake: "수익률만 비교하고 총보수를 비교하지 않는 것.",
    related: ["fund", "etf", "compounding", "fx"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "tax",
    term: "세금 (기초)",
    short: "수익의 일부는 세금으로",
    definition:
      "이자·배당·매매차익 등에는 종류별로 세금이 붙을 수 있다. 세후 수익이 진짜 수익이다.",
    whyItMatters:
      "같은 수익률이라도 계좌 종류(일반·연금·ISA 등)에 따라 세후 결과가 다르다. 세율·한도는 바뀌므로 가입 전 공식 자료를 확인한다.",
    example: "상품을 고를 때 '세전 수익률'이 아니라 '내 계좌에서의 세후'를 견준다.",
    risk: "세법은 자주 바뀐다. 기억 속 수치로 판단 금지.",
    commonMistake: "세전 수익률만 보고 상품을 고르는 것.",
    related: ["irp", "isa", "dividend", "ppension"],
    jurisdiction: "KR",
    sourceNote:
      "개념 해설만. 세율·한도·조건은 국세청 등 공식 자료에서 가입 시점에 직접 확인할 것.",
  },
  {
    slug: "npension",
    term: "국민연금",
    short: "국가가 운영하는 공적 연금",
    definition:
      "소득이 있는 국민이 보험료를 내고 노후에 연금을 받는 사회보장제도다. 물가연동 구조가 특징이다.",
    whyItMatters:
      "은퇴 현금흐름의 기초층이다. 예상 수령액을 알아야 부족분(사적연금·저축 목표)이 계산된다.",
    example: "국민연금 예상액 + 사적연금 + 저축 인출액을 합쳐 은퇴 월 현금흐름을 그린다.",
    risk: "제도 개편 가능성. 예상액은 추정치임을 유의.",
    commonMistake: "국민연금만으로 은퇴가 해결된다고 가정하는 것.",
    related: ["ppension", "irp", "cashflow", "severance"],
    jurisdiction: "KR",
    sourceNote:
      "개념 해설만. 수령 조건·금액은 국민연금공단의 내 연금 조회로 확인할 것.",
  },
  {
    slug: "ppension",
    term: "개인연금·연금저축",
    short: "스스로 쌓는 사적 연금",
    definition:
      "노후를 위해 개인이 자발적으로 불입하는 연금이다. 연금저축은 세제 혜택과 연계되어 가입 전 조건 확인이 필수다.",
    whyItMatters:
      "국민연금 위의 2층이다. 납입액은 은퇴 시나리오의 '연간 저축액' 입력값과 직결된다.",
    example: "월 불입액을 시나리오 페이지 연간 저축액에 넣어 궤적을 확인한다.",
    risk: "중도해지 시 혜택 환수·손실 가능. 상품별 수수료 상이.",
    commonMistake: "세제 혜택만 보고 상품 구조를 안 보는 것.",
    related: ["npension", "irp", "tax", "cashflow"],
    jurisdiction: "KR",
    sourceNote:
      "개념 해설만. 세제·한도는 가입 시점의 공식 자료를 확인할 것.",
  },
  {
    slug: "irp",
    term: "IRP",
    short: "개인형 퇴직연금 계좌",
    definition:
      "Individual Retirement Pension. 퇴직금 수령·개인 추가 불입을 담는 퇴직연금 계좌다. 운용은 가입자가 지시한다.",
    whyItMatters:
      "퇴직금을 일시금으로 써버리지 않고 연금 재원으로 묶는 그릇이다. 중도인출 제한이 강해 유동성 계획을 함께 세운다.",
    example: "이직 시 받은 퇴직금을 IRP로 이전해 운용을 이어간다.",
    risk: "원리금 보장형이 아니면 손실 가능. 중도해지 시 불이익.",
    commonMistake: "RIP 등으로 오기해 별도 상품으로 착각하는 것. IRP가 맞다.",
    related: ["severance", "ppension", "tax", "allocation"],
    jurisdiction: "KR",
    sourceNote:
      "개념 해설만. 운용 규제·세제는 가입 시점의 공식 자료를 확인할 것.",
  },
  {
    slug: "isa",
    term: "ISA",
    short: "만능 통장 형태의 절세 계좌",
    definition:
      "Individual Savings Account. 예금·펀드 등 여러 상품을 한 계좌에 담아 일정 범위 내 세제 혜택을 받는 구조다.",
    whyItMatters:
      "상품 선택과 세제 혜택을 한 계좌에서 묶을 수 있다. 종류(일반·서민형 등)와 의무 보유 조건을 먼저 확인한다.",
    example: "ETF와 예금을 ISA 안에서 함께 굴리는 식의 활용이 있다.",
    risk: "의무 기간·인출 조건 위반 시 혜택 축소.",
    commonMistake: "혜택만 보고 의무 보유 기간을 놓치는 것.",
    related: ["tax", "etf", "deposit", "fee"],
    jurisdiction: "KR",
    sourceNote:
      "개념 해설만. 유형·한도·조건은 가입 시점의 공식 자료를 확인할 것.",
  },
  {
    slug: "severance",
    term: "퇴직금·퇴직연금",
    short: "퇴직 시 받는 목돈과 그 연금화",
    definition:
      "계속근로에 대한 대가로 지급되는 목돈이다. 퇴직연금(DB·DC·IRP)은 이를 연금 형태로 굴리는 제도다.",
    whyItMatters:
      "은퇴 재원에서 가장 큰 단일 금액일 수 있다. 일시금 수령 후 방치가 가장 흔한 실패 패턴이다.",
    example: "퇴직금을 받으면 IRP 이전 → 자산배분에 편입 → 인출 계획을 세운다.",
    risk: "일시금 유혹. DB/DC 차이를 모르고 방치.",
    commonMistake: "퇴직금을 생활비와 같은 통장에 섞는 것.",
    related: ["irp", "npension", "allocation", "cashflow"],
    jurisdiction: "KR",
    sourceNote:
      "개념 해설만. DB/DC·수령 방식은 회사 제도와 공식 자료를 확인할 것.",
  },
  {
    slug: "insurance",
    term: "보험",
    short: "위험을 돈으로 이전하는 계약",
    definition:
      "보험료를 내고 질병·사고·사망 등 특정 위험 발생 시 보험금을 받는 계약이다. 보장과 저축은 분리해서 본다.",
    whyItMatters:
      "아픈 것과 돈을 버는 것은 다른 문제다. 보장성 보험은 '파산 방지' 용도, 저축은 투자 계좌 용도로 나눈다.",
    example: "실손·정기보험은 보장, 노후 자금은 연금·투자로 역할을 나눈다.",
    risk: "과보장(보험료 과다)으로 저축 여력 상실. 저축성 보험의 사업비.",
    commonMistake: "보험을 저축·투자 상품으로 착각하는 것.",
    related: ["cashflow", "risk", "fee"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "networth",
    term: "순자산",
    short: "총자산 − 총부채",
    definition:
      "가진 것 전부에서 빚 전부를 뺀 값이다. 이 앱 대시보드의 대표 숫자다.",
    whyItMatters:
      "월급이 아니라 순자산의 추이가 부의 방향을 말해준다. 전월 대비 증감을 매달 확인한다.",
    example: "총자산 1억 2580만 − 총부채 4200만 = 순자산 8380만 원.",
    formula: "순자산 = 총자산 − 총부채",
    risk: "자산 과대평가(부동산 호가 등)에 주의.",
    commonMistake: "빚을 빼지 않은 총자산만 보고 안심하는 것.",
    related: ["cashflow", "allocation", "compounding"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "cashflow",
    term: "현금흐름",
    short: "들어오고 나가는 돈의 흐름",
    definition:
      "수입에서 지출을 뺀 나머지가 저축 여력이다. 자산 증식의 연료다.",
    whyItMatters:
      "시나리오의 '연간 저축액'은 바로 이 숫자에서 나온다. 현금흐름이 없으면 복리도 소용없다.",
    example: "월 수입 400만 − 지출 280만 = 월 120만 저축 가능.",
    risk: "지출 creep(생활비 팽창)이 저축을 갉아먹는다.",
    commonMistake: "수익률에만 집착하고 저축액을 늘리지 않는 것.",
    related: ["networth", "savings", "ppension"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
  {
    slug: "rebalance",
    term: "리밸런싱",
    short: "목표 비중으로 되돌리기",
    definition:
      "오른 자산을 팔고 내린 자산을 사서 목표 배분으로 되돌리는 작업이다. 정해진 주기(예: 연 1회)에 기계적으로 한다.",
    whyItMatters:
      "오를 때 팔고 내릴 때 사는 역발상을 자동화한다. 감정이 아니라 규칙으로 한다.",
    example: "주식이 60%→70%가 되면 10%p를 팔아 채권·현금으로 옮긴다.",
    risk: "잦은 리밸런싱은 세금·수수료만 늘린다.",
    commonMistake: "하락장에서 리밸런싱을 멈추는 것.",
    related: ["allocation", "diversification", "fee", "tax"],
    jurisdiction: "KR",
    sourceNote: SRC_SELF,
  },
];

export const TERM_MAP: Record<string, TermEntry> = Object.fromEntries(
  TERMS.map((t) => [t.slug, t])
);

export function getTerm(slug: string): TermEntry | undefined {
  return TERM_MAP[slug];
}
