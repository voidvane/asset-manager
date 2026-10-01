/**
 * Deterministic scenario projection engine (section 13).
 *
 * WHAT THIS IS: year-by-year compound projection under EXPLICIT assumptions.
 * WHAT THIS IS NOT: a prediction of the future, a guarantee, or Monte Carlo.
 * Monte Carlo is deliberately NOT implemented: with no ledger/market history
 * yet, probabilistic output would be fake precision (DESIGN_FIRST).
 *
 * METHODOLOGY (per scenario, integer math on minor units, scale 4):
 *   contribution[y] = round(contribution[y-1] * (10000 + growthBps) / 10000)
 *   balance[y]      = round((balance[y-1] + contribution[y]) * (10000 + returnBps) / 10000)
 *   priceIndex[y]   = round(priceIndex[y-1] * (10000 + inflationBps) / 10000)
 *   real[y]         = round(balance[y] * 10000 / priceIndex[y])
 * Contributions are added at the START of each year (conservative: full-year
 * growth on that year's contribution is an OVERESTIMATE — documented, not hidden).
 *
 * UNIT: minor units (10^-4) as bigint, same as lib/money.ts.
 * TIME HORIZON: 1..50 years. UNCERTAINTY: outputs span downside/base/upside;
 * a single number is never presented alone on the UI.
 */

export interface ScenarioDef {
  /** Display name, e.g. "보수", "기본", "낙관". */
  name: string;
  /** Annual nominal return in basis points (500 = 5%). Range -5000..5000. */
  returnBps: number;
  /** Annual inflation in basis points. Range -100..2000. */
  inflationBps: number;
}

export interface ProjectionInput {
  /** Starting net worth, minor units, >= 0. */
  startNetWorth: bigint;
  /** Year-1 annual contribution, minor units, >= 0. */
  annualContribution: bigint;
  /** Annual contribution growth, bps. Range 0..1000. */
  contributionGrowthBps: number;
  /** Projection horizon in years. Range 1..50. */
  years: number;
}

export interface ProjectionYear {
  year: number;
  /** This year's contribution (minor units). */
  contribution: bigint;
  /** Nominal balance at end of year (minor units). */
  balanceNominal: bigint;
  /** Inflation-adjusted balance in today's money (minor units). */
  balanceReal: bigint;
}

export interface ScenarioResult {
  scenario: ScenarioDef;
  years: ProjectionYear[];
}

/** Integer division with half-up rounding (q must be > 0). */
function roundDiv(p: bigint, q: bigint): bigint {
  if (q <= 0n) throw new RangeError("Divisor must be positive");
  return (p + (p >= 0n ? q / 2n : -(q / 2n))) / q;
}

function assertIntInRange(
  name: string,
  value: number,
  min: number,
  max: number
): void {
  if (!Number.isInteger(value) || value < min || value > max) {
    throw new RangeError(`${name} must be an integer in [${min}, ${max}]`);
  }
}

export function validateProjectionInput(input: ProjectionInput): void {
  if (input.startNetWorth < 0n)
    throw new RangeError("startNetWorth must be >= 0");
  if (input.annualContribution < 0n)
    throw new RangeError("annualContribution must be >= 0");
  assertIntInRange("years", input.years, 1, 50);
  assertIntInRange(
    "contributionGrowthBps",
    input.contributionGrowthBps,
    0,
    1000
  );
}

export function validateScenario(s: ScenarioDef): void {
  assertIntInRange("returnBps", s.returnBps, -5000, 5000);
  assertIntInRange("inflationBps", s.inflationBps, -100, 2000);
}

/** Project ONE scenario. Pure function, no I/O, no randomness. */
export function projectScenario(
  input: ProjectionInput,
  scenario: ScenarioDef
): ScenarioResult {
  validateProjectionInput(input);
  validateScenario(scenario);

  const r = BigInt(10_000 + scenario.returnBps);
  const g = BigInt(10_000 + input.contributionGrowthBps);
  const inf = BigInt(10_000 + scenario.inflationBps);

  let balance = input.startNetWorth;
  let contribution = input.annualContribution;
  let priceIndex = 10_000n;
  const years: ProjectionYear[] = [];

  for (let y = 1; y <= input.years; y++) {
    if (y > 1) contribution = roundDiv(contribution * g, 10_000n);
    balance = roundDiv((balance + contribution) * r, 10_000n);
    priceIndex = roundDiv(priceIndex * inf, 10_000n);
    years.push({
      year: y,
      contribution,
      balanceNominal: balance,
      balanceReal: roundDiv(balance * 10_000n, priceIndex),
    });
  }
  return { scenario, years };
}

/** Project all scenarios over the same input. */
export function projectAll(
  input: ProjectionInput,
  scenarios: readonly ScenarioDef[]
): ScenarioResult[] {
  if (scenarios.length === 0) throw new RangeError("Need >= 1 scenario");
  return scenarios.map((s) => projectScenario(input, s));
}

/** Default 3-scenario set built around a base return (all share inflation). */
export function defaultScenarios(
  baseReturnBps: number,
  inflationBps: number
): ScenarioDef[] {
  const spread = 200; // ±2%p
  const defs = [
    { name: "보수", returnBps: baseReturnBps - spread, inflationBps },
    { name: "기본", returnBps: baseReturnBps, inflationBps },
    { name: "낙관", returnBps: baseReturnBps + spread, inflationBps },
  ];
  for (const d of defs) validateScenario(d);
  return defs;
}

/**
 * Display helper: minor units -> 만원 as number.
 * DISPLAY ONLY (chart/table). Values here are hypothetical projections, and
 * chart-scale magnitudes (< 2^53) make float error negligible vs. the
 * assumption uncertainty (±2%p return). Ledger balances must NEVER use this.
 */
export function minorToManwon(minor: bigint): number {
  const won = roundDiv(minor, 10_000n);
  return Number(won) / 10_000;
}
