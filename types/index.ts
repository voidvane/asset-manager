export type AssetType =
  | "CASH"
  | "DEPOSIT"
  | "BANK_ACCOUNT"
  | "STOCK_ETF"
  | "FUND"
  | "BOND"
  | "CRYPTO"
  | "REAL_ESTATE"
  | "VEHICLE"
  | "OTHER";

export type LiabilityType = "LOAN" | "CREDIT_CARD" | "OTHER";

export interface DashboardSummary {
  totalAssets: string;
  totalLiabilities: string;
  netWorth: string;
}
