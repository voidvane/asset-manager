import { allocationBps } from "@/lib/money";

const COLORS = ["#1D4ED8", "#0EA5E9", "#10B981", "#F59E0B", "#8B5CF6"];

export function AllocationBar({
  labels,
  values,
  total,
}: {
  labels: string[];
  values: bigint[];
  total: bigint;
}) {
  const bps = allocationBps(values, total);
  return (
    <div>
      <div
        className="flex h-4 w-full overflow-hidden rounded-full bg-slate-100"
        role="img"
        aria-label={`자산 구성: ${labels
          .map((l, i) => `${l} ${(bps[i] / 100).toFixed(1)}%`)
          .join(", ")}`}
      >
        {bps.map((b, i) => (
          <div
            key={labels[i]}
            style={{
              width: `${b / 100}%`,
              backgroundColor: COLORS[i % COLORS.length],
            }}
          />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {labels.map((l, i) => (
          <li key={l} className="flex items-center gap-2 text-sm">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-slate-600">{l}</span>
            <span className="ml-auto font-semibold tabular-nums">
              {(bps[i] / 100).toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
