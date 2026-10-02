export type Difficulty = "basic" | "intermediate" | "advanced";

export type TermCategory =
  | "기초경제"
  | "금융"
  | "금리"
  | "주식"
  | "채권"
  | "환율"
  | "부동산"
  | "거시경제"
  | "국제경제"
  | "세금";

export const TERM_CATEGORIES: TermCategory[] = [
  "기초경제",
  "금융",
  "금리",
  "주식",
  "채권",
  "환율",
  "부동산",
  "거시경제",
  "국제경제",
  "세금",
];

export interface EconomicTerm {
  id: string;
  slug: string;
  term: string;
  shortDescription: string;
  description: string;
  easyExplanation: string;
  example: string;
  hint?: string;
  category: TermCategory;
  difficulty: Difficulty;
  keywords: string[];
  relatedTerms: string[];
}

export type TrendDirection = "up" | "down" | "flat";

export interface ExchangeRate {
  code: string;
  label: string;
  pair: string;
  value: number;
  change: number;
  changePercent: number;
  direction: TrendDirection;
  unit: string;
}

export interface StockIndex {
  code: string;
  label: string;
  value: number;
  change: number;
  changePercent: number;
  direction: TrendDirection;
}

export interface InterestRate {
  code: string;
  label: string;
  value: number;
  unit: string;
  description: string;
  direction: TrendDirection;
  changePercent?: number;
}

export interface MarketSnapshot {
  date: string;
  source: "fallback" | "api";
  notice: string;
  exchange: ExchangeRate[];
  stocks: StockIndex[];
  rates: InterestRate[];
}

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; data: T };

export interface NavItem {
  href: string;
  label: string;
  icon: string;
  exact?: boolean;
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  basic: "기초",
  intermediate: "중급",
  advanced: "심화",
};
