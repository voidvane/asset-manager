export function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 p-4 shadow-sm">
      <h2 className="mb-2 text-sm font-semibold text-slate-500">{title}</h2>
      {children}
    </section>
  );
}
