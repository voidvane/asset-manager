import Link from "next/link";
import { NAV_ITEMS } from "./SiteHeader";

export function BottomNav() {
  return (
    <nav
      className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="모바일 내비게이션"
    >
      {NAV_ITEMS.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className="px-2 py-3 text-center text-sm font-medium text-slate-700 active:bg-slate-100"
        >
          {it.label}
        </Link>
      ))}
    </nav>
  );
}
