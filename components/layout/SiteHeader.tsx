import Link from "next/link";

export const NAV_ITEMS = [
  { href: "/", label: "홈" },
  { href: "/dashboard", label: "대시보드" },
  { href: "/forecast", label: "시나리오" },
  { href: "/learn", label: "지식" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-base font-bold text-slate-900">
          자산매니저
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="주 내비게이션">
          {NAV_ITEMS.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {it.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/forecast"
          className="hidden rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800 md:block"
        >
          시나리오 시작
        </Link>
      </div>
    </header>
  );
}
