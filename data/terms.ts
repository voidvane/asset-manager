import type { EconomicTerm } from "@/lib/econ-types";

export const ECONOMIC_TERMS: EconomicTerm[] = [
  {
    id: "t01",
    slug: "inflation",
    term: "인플레이션",
    shortDescription: "물가 수준이 지속적으로 상승하는 현상",
    description:
      "인플레이션은 일정 기간 동안 상품과 서비스의 전반적인 가격 수준이 오르고, 같은 돈으로 살 수 있는 양이 줄어드는 현상입니다.",
    easyExplanation:
      "장바구니에 담던 물건 값이 조금씩 계속 오르는 것입니다. 1,000원으로 사던 김밥이 1,500원이 되면, 돈의 가치는 그만큼 낮아진 것입니다.",
    example: "작년 5,000원이던 점심값이 올해 6,000원이 되었다면, 인플레이션을 체감한 것입니다.",
    hint: "물가가 오르면 돈의 가치는?",
    category: "거시경제",
    difficulty: "basic",
    keywords: ["물가", "물가상승", "통화", "구매력"],
    relatedTerms: ["deflation", "base-rate", "gdp"],
  },
  {
    id: "t02",
    slug: "gdp",
    term: "GDP",
    shortDescription: "일정 기간 동안 한 나라에서 생산된 최종 재화와 서비스의 가치",
    description:
      "GDP(국내총생산)는 일정 기간 동안 한 나라 안에서 생산된 모든 최종 재화와 서비스의 시장가치를 합한 것으로, 경제 규모를 보여주는 대표 지표입니다.",
    easyExplanation:
      "우리나라 가게와 공장이 1년 동안 만들어 낸 것을 전부 돈으로 환산한 성적표라고 생각하면 됩니다. 숫자가 커지면 경제가 성장한 것입니다.",
    example: "뉴스에서 올해 GDP 성장률이 2%라고 하면, 작년보다 경제 규모가 2% 커졌다는 뜻입니다.",
    hint: "나라 경제의 성적표",
    category: "거시경제",
    difficulty: "basic",
    keywords: ["국내총생산", "성장률", "경제규모"],
    relatedTerms: ["inflation", "trade-balance", "per-capita"],
  },
  {
    id: "t03",
    slug: "base-rate",
    term: "기준금리",
    shortDescription: "중앙은행이 금융시장 금리의 기준으로 사용하는 정책금리",
    description:
      "기준금리는 한국은행이 은행 간 자금 거래와 금융시장 전체 금리의 기준점으로 삼는 정책금리로, 예금·대출 금리에 영향을 줍니다.",
    easyExplanation:
      "모든 금리의 출발점입니다. 기준금리가 오르면 예금 이자는 조금 오르고, 대출 이자도 함께 오릅니다.",
    example: "기준금리가 2.5%에서 3.0%로 오르면, 주택담보대출 금리도 함께 오를 가능성이 큽니다.",
    hint: "모든 금리의 기준점",
    category: "금리",
    difficulty: "basic",
    keywords: ["한국은행", "정책금리", "금리인상", "금리인하"],
    relatedTerms: ["deposit-rate", "loan-rate", "bond"],
  },
  {
    id: "t04",
    slug: "exchange-rate",
    term: "환율",
    shortDescription: "서로 다른 나라의 돈을 교환하는 비율",
    description:
      "환율은 한 나라 통화를 다른 나라 통화로 바꿀 때 적용되는 교환 비율로, 수출·수입과 해외여행 비용에 직접 영향을 줍니다.",
    easyExplanation:
      "달러를 원화로 바꾸는 가격표입니다. 환율이 1,300원에서 1,400원으로 오르면 같은 1달러를 사는 데 더 많은 원화가 필요합니다.",
    example: "미국 여행을 앞두고 환율이 오르면 같은 경비로 바꿀 수 있는 달러가 줄어듭니다.",
    hint: "달러를 원화로 바꾸는 비율",
    category: "환율",
    difficulty: "basic",
    keywords: ["달러", "원화", "외환", "USD", "KRW"],
    relatedTerms: ["usd-krw", "jpy-krw", "trade-balance"],
  },
  {
    id: "t05",
    slug: "kospi",
    term: "코스피",
    shortDescription: "한국 대표 기업들의 주가를 종합한 지수",
    description:
      "코스피(KOSPI)는 유가증권시장에 상장된 종목들의 시가총액을 기준으로 산출하는 한국 대표 주가지수입니다.",
    easyExplanation:
      "한국 큰 회사들의 주가를 하나로 합친 체온계입니다. 지수가 오르면 대체로 주식 시장 분위기가 좋다는 뜻입니다.",
    example: "코스피가 2,600에서 2,700으로 오르면 대형주 중심의 시장이 상승했다는 의미입니다.",
    hint: "한국 주식시장의 체온계",
    category: "주식",
    difficulty: "basic",
    keywords: ["주식", "주가지수", "유가증권시장"],
    relatedTerms: ["kosdaq", "stock", "etf"],
  },
  {
    id: "t06",
    slug: "kosdaq",
    term: "코스닥",
    shortDescription: "기술주와 중소형주 중심의 한국 주식시장 지수",
    description:
      "코스닥(KOSDAQ)은 기술·성장 기업 중심으로 구성된 시장의 주가지수로, 변동성이 코스피보다 큰 편입니다.",
    easyExplanation:
      "젊고 성장 중인 회사들이 모인 시장입니다. 오를 때는 크게 오르지만 떨어질 때도 크게 떨어질 수 있습니다.",
    example: "바이오나 IT 스타트업에 투자하고 싶다면 코스닥 종목을 먼저 살펴봅니다.",
    hint: "성장 기업이 많은 시장",
    category: "주식",
    difficulty: "basic",
    keywords: ["주식", "성장주", "기술주"],
    relatedTerms: ["kospi", "stock", "etf"],
  },
  {
    id: "t07",
    slug: "stock",
    term: "주식",
    shortDescription: "회사의 소유권을 나누어 가진 증서",
    description:
      "주식은 회사의 자본을 이루는 단위로, 주식을 사면 그 회사의 주주가 되어 이익 배당과 의결권 등을 가질 수 있습니다.",
    easyExplanation:
      "회사를 조각 케이크처럼 나눈 한 조각입니다. 회사가 잘되면 조각의 값도 오르고, 못되면 떨어집니다.",
    example: "삼성전자 주식 1주를 사면 삼성전자의 아주 작은 주인이 됩니다.",
    hint: "회사의 작은 조각",
    category: "주식",
    difficulty: "basic",
    keywords: ["주주", "주가", "배당", "투자"],
    relatedTerms: ["kospi", "dividend", "etf"],
  },
  {
    id: "t08",
    slug: "bond",
    term: "채권",
    shortDescription: "돈을 빌려주고 받는 약속 증서",
    description:
      "채권은 국가나 기업이 자금을 빌리면서 원금과 이자를 갚겠다고 약속한 증서로, 정해진 만기와 이자율이 있습니다.",
    easyExplanation:
      "나라나 회사에 돈을 빌려주고 영수증을 받는 것입니다. 약속된 날짜에 이자와 함께 돌려받습니다.",
    example: "국채 3년물 금리가 3%라면, 나라에 3년간 돈을 빌려주고 연 3%의 이자를 받는 구조입니다.",
    hint: "빌려준 돈의 영수증",
    category: "채권",
    difficulty: "intermediate",
    keywords: ["국채", "회사채", "이자", "만기"],
    relatedTerms: ["base-rate", "deposit-rate", "stock"],
  },
  {
    id: "t09",
    slug: "deposit-rate",
    term: "예금금리",
    shortDescription: "은행에 돈을 맡겼을 때 받는 이자율",
    description:
      "예금금리는 은행에 돈을 예치했을 때 지급받는 이자의 비율로, 기준금리와 은행의 자금 사정에 따라 달라집니다.",
    easyExplanation:
      "은행에 돈을 맡긴 대가로 받는 용돈 비율입니다. 1,000만 원을 연 3%로 맡기면 1년에 약 30만 원을 받습니다.",
    example: "정기예금 금리가 2%에서 3.5%로 오르면 같은 금액을 맡겨도 이자가 늘어납니다.",
    hint: "은행에 맡긴 돈의 이자",
    category: "금리",
    difficulty: "basic",
    keywords: ["정기예금", "이자", "저축"],
    relatedTerms: ["base-rate", "loan-rate", "bond"],
  },
  {
    id: "t10",
    slug: "loan-rate",
    term: "대출금리",
    shortDescription: "은행에서 돈을 빌릴 때 내는 이자율",
    description:
      "대출금리는 금융기관에서 자금을 빌릴 때 적용되는 이자율로, 기준금리에 가산금리가 더해져 결정됩니다.",
    easyExplanation:
      "은행에서 돈을 빌린 대가로 내는 수수료율입니다. 금리가 높을수록 매달 갚아야 할 돈이 늘어납니다.",
    example: "1억 원을 연 5%로 빌리면 1년 이자로 약 500만 원을 냅니다.",
    hint: "빌린 돈에 붙는 이자",
    category: "금리",
    difficulty: "basic",
    keywords: ["주택담보대출", "신용대출", "이자부담"],
    relatedTerms: ["base-rate", "deposit-rate", "jeonse"],
  },
  {
    id: "t11",
    slug: "deflation",
    term: "디플레이션",
    shortDescription: "물가가 지속적으로 하락하고 돈의 가치가 오르는 현상",
    description:
      "디플레이션은 전반적인 물가 수준이 장기간 하락하는 현상으로, 소비가 위축되고 경기 침체로 이어질 수 있습니다.",
    easyExplanation:
      "물건 값이 계속 떨어지는 것입니다. 좋아 보이지만, 사람들이 나중에 더 싸질까 봐 소비를 미루면서 경기가 나빠질 수 있습니다.",
    example: "물가가 몇 년째 떨어지고 가게 매출도 줄어든다면 디플레이션 우려가 있다는 분석이 나옵니다.",
    hint: "인플레이션의 반대",
    category: "거시경제",
    difficulty: "intermediate",
    keywords: ["물가하락", "경기침체", "디플레"],
    relatedTerms: ["inflation", "stagflation", "gdp"],
  },
  {
    id: "t12",
    slug: "stagflation",
    term: "스태그플레이션",
    shortDescription: "경기는 나쁜데 물가는 오르는 힘든 상황",
    description:
      "스태그플레이션은 경기 침체와 물가 상승이 동시에 나타나는 현상으로, 정책 대응이 까다롭습니다.",
    easyExplanation:
      "월급은 그대로인데 장바구니 물가는 계속 오르는 상황입니다. 경기는 나쁜데 금리도 쉽게 못 내리는 딜레마입니다.",
    example: "유가 급등으로 물가는 오르는데 기업 실적은 나빠지면 스태그플레이션이라는 말이 나옵니다.",
    hint: "침체 + 물가상승",
    category: "거시경제",
    difficulty: "advanced",
    keywords: ["경기침체", "물가", "유가"],
    relatedTerms: ["inflation", "deflation", "base-rate"],
  },
  {
    id: "t13",
    slug: "usd-krw",
    term: "달러 환율",
    shortDescription: "미국 1달러를 사기 위해 필요한 원화 금액",
    description:
      "USD/KRW 환율은 미국 달러와 한국 원화의 교환 비율로, 원자재 가격과 수출 경쟁력에 영향을 줍니다.",
    easyExplanation:
      "1달러의 원화 가격표입니다. 숫자가 오르면 원화 가치가 떨어진 것이고, 수입 물가가 오르기 쉽습니다.",
    example: "환율이 1,300원에서 1,400원으로 오르면 수입 과자 값이 오를 수 있습니다.",
    hint: "1달러 = 몇 원?",
    category: "환율",
    difficulty: "basic",
    keywords: ["달러", "USD", "원달러환율"],
    relatedTerms: ["exchange-rate", "jpy-krw", "eur-krw"],
  },
  {
    id: "t14",
    slug: "jpy-krw",
    term: "엔화 환율",
    shortDescription: "일본 100엔을 사기 위해 필요한 원화 금액",
    description:
      "JPY/KRW 환율은 일본 엔화와 한국 원화의 교환 비율로, 보통 100엔 기준으로 표시합니다.",
    easyExplanation:
      "일본 여행 갈 때 확인하는 숫자입니다. 낮을수록 같은 원화로 더 많은 엔화를 바꿀 수 있습니다.",
    example: "100엔당 900원에서 850원으로 떨어지면 일본 여행 경비 부담이 줄어듭니다.",
    hint: "일본 여행 전 확인",
    category: "환율",
    difficulty: "basic",
    keywords: ["엔화", "JPY", "일본"],
    relatedTerms: ["exchange-rate", "usd-krw", "cny-krw"],
  },
  {
    id: "t15",
    slug: "eur-krw",
    term: "유로화 환율",
    shortDescription: "유럽 1유로를 사기 위해 필요한 원화 금액",
    description:
      "EUR/KRW 환율은 유로존 통화인 유로와 원화의 교환 비율로, 유럽 수입품 가격에 영향을 줍니다.",
    easyExplanation:
      "유럽 여행이나 유럽 브랜드 제품을 살 때 영향을 주는 숫자입니다.",
    example: "유로 환율이 오르면 유럽 직구 제품 가격이 비싸집니다.",
    hint: "유럽 돈의 원화 가격",
    category: "환율",
    difficulty: "basic",
    keywords: ["유로", "EUR", "유럽"],
    relatedTerms: ["exchange-rate", "usd-krw", "cny-krw"],
  },
  {
    id: "t16",
    slug: "cny-krw",
    term: "위안화 환율",
    shortDescription: "중국 1위안을 사기 위해 필요한 원화 금액",
    description:
      "CNY/KRW 환율은 중국 위안화와 원화의 교환 비율로, 대중 교역과 여행에 영향을 줍니다.",
    easyExplanation:
      "중국과 거래할 때 확인하는 숫자입니다. 무역 비중이 커서 기업들에게 중요합니다.",
    example: "위안화 환율이 오르면 중국산 원자재를 쓰는 기업의 비용이 늘어납니다.",
    hint: "중국 돈의 원화 가격",
    category: "환율",
    difficulty: "intermediate",
    keywords: ["위안화", "CNY", "중국"],
    relatedTerms: ["exchange-rate", "usd-krw", "jpy-krw"],
  },
  {
    id: "t17",
    slug: "dividend",
    term: "배당금",
    shortDescription: "회사가 이익의 일부를 주주에게 나눠주는 돈",
    description:
      "배당금은 기업이 한 해 벌어들인 이익 중 일부를 주주에게 현금이나 주식으로 지급하는 것입니다.",
    easyExplanation:
      "회사가 장사가 잘돼서 주주들에게 주는 보너스입니다. 주식을 가지고 있기만 해도 받을 수 있습니다.",
    example: "1주당 500원 배당금을 주는 주식 100주를 가지고 있으면 5만 원을 받습니다.",
    hint: "주주에게 주는 보너스",
    category: "주식",
    difficulty: "basic",
    keywords: ["주주환원", "배당수익률", "결산배당"],
    relatedTerms: ["stock", "etf", "kospi"],
  },
  {
    id: "t18",
    slug: "etf",
    term: "ETF",
    shortDescription: "여러 주식을 한 바구니에 담아 주식처럼 사고파는 상품",
    description:
      "ETF(상장지수펀드)는 특정 지수나 자산의 움직임을 따라가도록 설계된 펀드로, 주식시장에서 실시간으로 사고팔 수 있습니다.",
    easyExplanation:
      "여러 회사의 주식을 도시락처럼 묶어 파는 상품입니다. 하나만 사도 분산투자가 됩니다.",
    example: "코스피200 ETF 1주를 사면 한국 대표 기업 200곳에 나눠 투자하는 효과가 있습니다.",
    hint: "분산투자 도시락",
    category: "주식",
    difficulty: "intermediate",
    keywords: ["상장지수펀드", "분산투자", "인덱스"],
    relatedTerms: ["stock", "kospi", "bond"],
  },
  {
    id: "t19",
    slug: "jeonse",
    term: "전세",
    shortDescription: "집주인에게 큰돈을 맡기고 집을 빌려 사는 방식",
    description:
      "전세는 일정 금액의 보증금을 집주인에게 맡기고 계약 기간 동안 월세 없이 거주한 뒤, 만기에 돌려받는 임대 방식입니다.",
    easyExplanation:
      "집을 빌리는 대신 큰 보증금을 맡기는 것입니다. 월세는 없지만 목돈이 필요하고, 금리와 집값에 영향을 많이 받습니다.",
    example: "2억 원 전세는 2년간 2억 원을 맡기고 사는 대신, 집주인은 그 돈을 활용할 수 있습니다.",
    hint: "월세 없는 큰 보증금",
    category: "부동산",
    difficulty: "basic",
    keywords: ["보증금", "월세", "임대차"],
    relatedTerms: ["monthly-rent", "mortgage", "loan-rate"],
  },
  {
    id: "t20",
    slug: "monthly-rent",
    term: "월세",
    shortDescription: "매달 일정 금액을 내고 집을 빌려 사는 방식",
    description:
      "월세는 보증금과 함께 매달 일정 금액의 임대료를 내고 거주하는 방식으로, 초기 목돈 부담이 전세보다 작습니다.",
    easyExplanation:
      "집 사용료로 매달 돈을 내는 것입니다. 목돈은 적게 들지만 매달 고정 지출이 생깁니다.",
    example: "보증금 1,000만 원에 월 60만 원 조건은 대표적인 월세 계약입니다.",
    hint: "매달 내는 집값",
    category: "부동산",
    difficulty: "basic",
    keywords: ["임대료", "보증금", "주거비"],
    relatedTerms: ["jeonse", "mortgage", "loan-rate"],
  },
  {
    id: "t21",
    slug: "mortgage",
    term: "주택담보대출",
    shortDescription: "집을 담보로 은행에서 빌리는 돈",
    description:
      "주택담보대출은 주택을 담보로 제공하고 은행에서 자금을 빌리는 대출로, 금리와 만기에 따라 상환 부담이 달라집니다.",
    easyExplanation:
      "집을 산 뒤 그 집을 담보로 은행에서 돈을 빌리는 것입니다. 금리가 오르면 매달 갚는 돈이 늘어납니다.",
    example: "3억 원을 연 4%로 30년 빌리면 월 상환액이 약 140만 원 수준이 됩니다.",
    hint: "집으로 빌리는 돈",
    category: "부동산",
    difficulty: "intermediate",
    keywords: ["주담대", "담보", "상환"],
    relatedTerms: ["loan-rate", "jeonse", "base-rate"],
  },
  {
    id: "t22",
    slug: "trade-balance",
    term: "무역수지",
    shortDescription: "수출에서 수입을 뺀 차이",
    description:
      "무역수지는 일정 기간 상품 수출액에서 수입액을 뺀 것으로, 양수면 흑자, 음수면 적자라고 합니다.",
    easyExplanation:
      "나라의 장사 성적표입니다. 판 것보다 산 것이 많으면 적자, 판 것이 많으면 흑자입니다.",
    example: "수출 600억 달러, 수입 550억 달러라면 무역수지는 50억 달러 흑자입니다.",
    hint: "나라의 장사 성적",
    category: "국제경제",
    difficulty: "intermediate",
    keywords: ["수출", "수입", "흑자", "적자"],
    relatedTerms: ["exchange-rate", "gdp", "current-account"],
  },
  {
    id: "t23",
    slug: "current-account",
    term: "경상수지",
    shortDescription: "나라가 외국과 주고받은 돈의 전체 차이",
    description:
      "경상수지는 무역뿐 아니라 서비스, 소득, 이전소득까지 포함한 대외거래의 종합 수지로, 경제 건전성을 보여줍니다.",
    easyExplanation:
      "무역수지보다 넓은 개념의 가계부입니다. 외국과 돈거래에서 전체적으로 흑자인지 적자인지를 봅니다.",
    example: "경상수지 흑자가 이어지면 외국에서 벌어들인 돈이 나간 돈보다 많다는 뜻입니다.",
    hint: "넓은 의미의 나라 가계부",
    category: "국제경제",
    difficulty: "advanced",
    keywords: ["대외거래", "수지", "흑자"],
    relatedTerms: ["trade-balance", "exchange-rate", "gdp"],
  },
  {
    id: "t24",
    slug: "vat",
    term: "부가가치세",
    shortDescription: "물건을 살 때 가격에 포함되어 내는 세금",
    description:
      "부가가치세는 상품과 서비스가 생산·유통되는 각 단계에서 생긴 부가가치에 부과되는 세금으로, 소비자가 최종 부담합니다.",
    easyExplanation:
      "마트에서 물건 살 때 이미 내는 세금입니다. 가격표 1,100원 중 100원이 세금인 경우가 많습니다.",
    example: "1만 원짜리 옷을 사면 그중 약 909원이 세금 전 가격이고 나머지가 부가가치세입니다.",
    hint: "가격에 숨어 있는 세금",
    category: "세금",
    difficulty: "basic",
    keywords: ["VAT", "소비세", "10%"],
    relatedTerms: ["income-tax", "gdp", "inflation"],
  },
  {
    id: "t25",
    slug: "income-tax",
    term: "소득세",
    shortDescription: "벌어들인 소득에 대해 내는 세금",
    description:
      "소득세는 개인이 1년간 벌어들인 소득에 대해 부과되는 세금으로, 소득이 많을수록 세율이 높아지는 누진 구조입니다.",
    easyExplanation:
      "월급이나 사업으로 번 돈에서 내는 세금입니다. 많이 벌수록 비율도 올라갑니다.",
    example: "연봉이 오르면 적용 세율이 올라가 실수령액 증가 폭이 줄어들 수 있습니다.",
    hint: "번 돈에 붙는 세금",
    category: "세금",
    difficulty: "basic",
    keywords: ["종합소득세", "원천징수", "누진세"],
    relatedTerms: ["vat", "gdp", "deposit-rate"],
  },
  {
    id: "t26",
    slug: "central-bank",
    term: "중앙은행",
    shortDescription: "나라의 돈을 관리하는 은행 중의 은행",
    description:
      "중앙은행은 통화 발행과 금리 결정, 금융 안정을 책임지는 기관으로, 시중은행과 달리 이윤을 목적으로 하지 않습니다.",
    easyExplanation:
      "은행들을 관리하는 큰 은행입니다. 돈의 양과 금리의 방향을 정합니다.",
    example: "물가가 너무 오르면 중앙은행이 금리를 올려 돈의 흐름을 조절합니다.",
    hint: "은행들의 은행",
    category: "금융",
    difficulty: "basic",
    keywords: ["통화정책", "금리", "물가안정"],
    relatedTerms: ["bok", "base-rate", "inflation"],
  },
  {
    id: "t27",
    slug: "bok",
    term: "한국은행",
    shortDescription: "대한민국의 중앙은행",
    description:
      "한국은행은 대한민국의 중앙은행으로, 기준금리 결정과 화폐 발행, 금융 안정을 담당합니다.",
    easyExplanation:
      "우리나라 돈과 금리를 책임지는 곳입니다. 뉴스에서 금리 결정 소식이 나오면 바로 이곳의 결정입니다.",
    example: "한국은행 금융통화위원회가 기준금리를 동결했다는 뉴스가 대표적입니다.",
    hint: "우리나라 중앙은행",
    category: "금융",
    difficulty: "basic",
    keywords: ["한은", "금통위", "기준금리"],
    relatedTerms: ["central-bank", "base-rate", "inflation"],
  },
  {
    id: "t28",
    slug: "per-capita",
    term: "1인당 GDP",
    shortDescription: "나라 경제 규모를 인구수로 나눈 생활 수준 지표",
    description:
      "1인당 GDP는 GDP를 인구수로 나눈 값으로, 국민의 평균적인 경제 수준을 비교할 때 사용합니다.",
    easyExplanation:
      "나라 전체 성적을 인구수로 나눈 1인당 성적입니다. 높을수록 평균적으로 잘사는 나라에 가깝습니다.",
    example: "1인당 GDP가 3만 달러를 넘었다는 말은 평균 생활 수준이 선진국형이라는 뜻입니다.",
    hint: "1인당 경제 성적",
    category: "기초경제",
    difficulty: "intermediate",
    keywords: ["국민소득", "생활수준", "GDP"],
    relatedTerms: ["gdp", "inflation", "trade-balance"],
  },
  {
    id: "t29",
    slug: "compound",
    term: "복리",
    shortDescription: "이자가 원금에 붙어 다시 이자를 낳는 구조",
    description:
      "복리는 원금뿐 아니라 발생한 이자에도 이자가 붙는 방식으로, 시간이 길수록 자산이 눈덩이처럼 불어납니다.",
    easyExplanation:
      "눈덩이 효과입니다. 이자로 받은 돈이 다시 돈을 벌어주는 구조라 오래 둘수록 유리합니다.",
    example: "연 5% 복리로 10년이면 원금이 약 1.63배가 됩니다.",
    hint: "눈덩이처럼 불어나는 이자",
    category: "금융",
    difficulty: "basic",
    keywords: ["이자", "적금", "투자", "시간"],
    relatedTerms: ["deposit-rate", "stock", "etf"],
  },
  {
    id: "t30",
    slug: "bear-bull",
    term: "강세장과 약세장",
    shortDescription: "주가가 오르는 시기와 내리는 시기",
    description:
      "강세장(불마켓)은 주가가 장기간 상승하는 흐름이고, 약세장(베어마켓)은 주가가 장기간 하락하는 흐름을 말합니다.",
    easyExplanation:
      "황소가 뿔로 위로 받치면 상승, 곰이 발로 아래로 내리치면 하락이라고 외우면 쉽습니다.",
    example: "주가가 1년 넘게 계속 오르면 강세장이라는 말이 나옵니다.",
    hint: "황소와 곰의 싸움",
    category: "주식",
    difficulty: "intermediate",
    keywords: ["불마켓", "베어마켓", "주가", "투자심리"],
    relatedTerms: ["stock", "kospi", "kosdaq"],
  },
];

export function getTermBySlug(slug: string): EconomicTerm | undefined {
  return ECONOMIC_TERMS.find((t) => t.slug === slug);
}

export function getTermById(id: string): EconomicTerm | undefined {
  return ECONOMIC_TERMS.find((t) => t.id === id);
}

export function searchTerms(query: string, category?: string): EconomicTerm[] {
  const q = query.trim().toLowerCase();
  return ECONOMIC_TERMS.filter((t) => {
    const matchCategory = !category || category === "전체" || t.category === category;
    if (!matchCategory) return false;
    if (!q) return true;
    const haystack = [t.term, t.shortDescription, t.description, t.easyExplanation, ...(t.keywords ?? [])]
      .join(" ")
      .toLowerCase();
    return q.split(/\s+/).every((token) => haystack.includes(token));
  });
}
