"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./SiteHeader";
import { MabiIcon } from "./MabiIcons";

export function BottomNav() {
  const rawPath = usePathname();
  const pathname = rawPath ?? "";
  return (
    <nav
      className="sticky bottom-0 z-20 grid grid-cols-6 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="모바일 내비게이션"
    >
      {NAV_ITEMS.map((it) => {
        const active =
          it.href === "/"
            ? pathname === "/"
            : pathname === it.href || pathname.startsWith(it.href + "/");
        return (
          <Link
            key={it.href + it.label}
            href={it.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "flex flex-col items-center gap-1 bg-blue-50 px-1 py-2 text-[11px] font-semibold text-blue-800"
                : "flex flex-col items-center gap-1 px-1 py-2 text-[11px] font-medium text-slate-700 active:bg-slate-100"
            }
          >
            <MabiIcon kind={it.icon} size={18} />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
