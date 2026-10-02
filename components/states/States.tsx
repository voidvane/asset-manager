export function LoadingState({ message = "불러오는 중입니다…" }: { message?: string }) {
  return (
    <div role="status" aria-live="polite" className="grid place-items-center gap-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
      <span aria-hidden="true" className="loader" />
      <p className="text-sm text-[var(--color-text-secondary)]">{message}</p>
    </div>
  );
}

export function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div role="status" className="grid place-items-center gap-2 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
      <p aria-hidden="true" className="text-3xl">🔍</p>
      <p className="font-semibold">{title}</p>
      {description ? <p className="max-w-sm text-sm text-[var(--color-text-secondary)]">{description}</p> : null}
      {action}
    </div>
  );
}

export function ErrorState({
  title = "정보를 불러오지 못했습니다",
  description = "잠시 후 다시 시도해 주세요.",
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="grid place-items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
      <p aria-hidden="true" className="text-3xl">⚠️</p>
      <p className="font-semibold">{title}</p>
      <p className="max-w-sm text-sm text-slate-600">{description}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 min-h-[44px] rounded-xl bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white"
        >
          다시 시도
        </button>
      ) : null}
    </div>
  );
}
