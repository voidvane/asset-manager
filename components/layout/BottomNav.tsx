import Link from "next/link";

const items = [
  { href: "/", label: "홈" },
  { href: "/dashboard", label: "대시보드" },
];

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 grid grid-cols-2 border-t border-slate-200 bg-white">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="p-4 text-center text-sm font-medium text-slate-700"
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
