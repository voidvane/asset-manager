/**
 * Decimal-safe money utilities (scale = 4, matches Prisma Decimal(19,4)).
 *
 * WHY: `Number` is a binary floating point. `0.1 + 0.2 !== 0.3` and integers
 * above 2^53 lose precision. Amounts are therefore carried as `bigint` minor
 * units (1 unit = 0.0001 of the currency unit) and only converted to display
 * strings via integer arithmetic. No `Number()` is used on money paths.
 *
 * UNIT: all arithmetic in minor units (10^-4). Display formatting is separate.
 * ASSUMPTIONS:
 *  - Input scale never exceeds 4 fractional digits; anything more precise
 *    throws instead of silently rounding (explicit > convenient in finance).
 *  - KRW display rounds half-up to whole won (KRW has no fractional coins in
 *    this system); other display keeps up to 4 decimals, trailing zeros trimmed.
 * EDGE CASES: zero, negative (net worth / loss), max Decimal(19,4)
 *  (999999999999999.9999), empty sum, zero-total allocation, invalid input.
 */

export const MONEY_SCALE = 4;
const UNIT = 10_000n;

const DECIMAL_RE = /^[+-]?(\d+)(?:\.(\d{1,4}))?$/;

/**
 * Parse a decimal string into minor units. Strict: >4 fractional digits,
 * non-numeric, empty, NaN/Infinity forms throw RangeError.
 */
export function parseMoney4(input: string): bigint {
  const text = input.trim();
  const m = DECIMAL_RE.exec(text);
  if (!m) throw new RangeError(`Invalid money value: ${JSON.stringify(input)}`);
  const negative = text.startsWith("-");
  const intPart = BigInt(m[1]);
  const fracPart = (m[2] ?? "").padEnd(MONEY_SCALE, "0");
  const minor = intPart * UNIT + BigInt(fracPart);
  return negative ? -minor : minor;
}

/** Render minor units back to a canonical "int.frac4" string (no float). */
export function toDecimalString(minor: bigint): string {
  const negative = minor < 0n;
  const abs = negative ? -minor : minor;
  const intPart = abs / UNIT;
  const fracPart = (abs % UNIT).toString().padStart(MONEY_SCALE, "0");
  return `${negative ? "-" : ""}${intPart.toString()}.${fracPart}`;
}

/** Exact sum over minor units. Empty list = 0. */
export function sumMoney4(values: readonly bigint[]): bigint {
  let total = 0n;
  for (const v of values) total += v;
  return total;
}

/** Net worth = assets - liabilities. May be negative (allowed, not an error). */
export function netWorth4(totalAssets: bigint, totalLiabilities: bigint): bigint {
  return totalAssets - totalLiabilities;
}

function groupThousands(digits: string): string {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Format minor units as KRW ("1,234원"). Rounds half-up on the 4dp fraction
 * (fraction >= 0.5 won rounds away from zero in magnitude handling below).
 */
export function formatKRW4(minor: bigint): string {
  const negative = minor < 0n;
  const abs = negative ? -minor : minor;
  const intPart = abs / UNIT;
  const frac = abs % UNIT;
  // 0.5 won = 5000 minor units; half-up
  const rounded = frac >= 5_000n ? intPart + 1n : intPart;
  return `${negative ? "-" : ""}${groupThousands(rounded.toString())}원`;
}

/** Format minor units with up to 4 decimals, trailing zeros trimmed. */
export function formatDecimal4(minor: bigint): string {
  const canonical = toDecimalString(minor);
  const trimmed = canonical
    .replace(/0+$/, "")
    .replace(/\.$/, ".0");
  return trimmed;
}

export const MAX_DECIMAL_19_4 = parseMoney4("999999999999999.9999");
export const MIN_DECIMAL_19_4 = parseMoney4("-999999999999999.9999");

/**
 * Allocation in basis points (1bp = 0.01%) via integer math with
 * largest-remainder, so the result ALWAYS sums to exactly 10000 (or all
 * zeros when total is 0). Formula per item: floor(value * 10000 / total),
 * then distribute leftover bps to largest remainders.
 */
export function allocationBps(
  values: readonly bigint[],
  total: bigint
): number[] {
  if (total < 0n) throw new RangeError("Allocation total must be >= 0");
  if (total === 0n) return values.map(() => 0);
  for (const v of values) {
    if (v < 0n) throw new RangeError("Allocation values must be >= 0");
  }
  const scaled = values.map((v) => v * 10_000n);
  const floors = scaled.map((s) => s / total);
  const remainders = scaled.map((s, i) => ({ i, r: s % total }));
  let leftover = 10_000n - floors.reduce((a, b) => a + b, 0n);
  remainders.sort((a, b) => (a.r > b.r ? -1 : a.r < b.r ? 1 : a.i - b.i));
  const out = floors.map(Number);
  for (let k = 0n; k < leftover; k++) out[remainders[Number(k)].i] += 1;
  return out;
}

/**
 * Portfolio invariant: total == sum(positions) + cash.
 * Pure comparison for tests and data-quality checks (section 16).
 */
export function checkPortfolioTotal(
  positions: readonly bigint[],
  cash: bigint,
  total: bigint
): boolean {
  return sumMoney4([...positions, cash]) === total;
}
