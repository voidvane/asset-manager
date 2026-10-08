"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MabiIcon, type MabiIconKind } from "./MabiIcons";

export const NAV_ITEMS: { href: string; label: string; icon: MabiIconKind }[] = [
  { href: "/", label: "홈", icon: "home" },
  { href: "/learn", label: "용어", icon: "terms" },
  { href: "/forecast", label: "학습", icon: "study" },
  { href: "/favorites", label: "즐겨찾기", icon: "fav" },
  { href: "/settings", label: "설정", icon: "settings" },
  { href: "/dashboard", label: "자산관리", icon: "assets" },
];

function todayKo(): string {
  try {
    return new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "short",
    });
  } catch {
    return "";
  }
}

export function SiteHeader() {
  const rawPath = usePathname();
  const pathname = rawPath ?? "";
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(todayKo());
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-700 text-lg font-black text-white shadow-sm"
          >
            W
          </span>
          <span className="leading-tight">
            <span className="block text-base font-bold text-slate-900">
              KKB 대표
            </span>
            {today && (
              <span className="block text-xs font-normal text-slate-500 tabular-nums">
                {today}
              </span>
            )}
          </span>
        </Link>
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="주 내비게이션"
        >
          {NAV_ITEMS.map((it) => {
            const active =
              it.href === "/"
                ? pathname === "/"
                : pathname === it.href ||
                  pathname.startsWith(it.href + "/");
            return (
              <Link
                key={it.href + it.label}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex items-center gap-1.5 rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-800"
                    : "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-amber-50 hover:text-slate-900"
                }
              >
                <MabiIcon kind={it.icon} size={20} />
                {it.label}
              </Link>
            );
          })}
        </nav>
        {/* 태블릿: 아이콘만 노출해 6개 항목이 넘치지 않게 */}
        <nav
          className="hidden items-center gap-1 md:flex lg:hidden"
          aria-label="주 내비게이션"
        >
          {NAV_ITEMS.map((it) => {
            const active =
              it.href === "/"
                ? pathname === "/"
                : pathname === it.href ||
                  pathname.startsWith(it.href + "/");
            return (
              <Link
                key={it.href + it.label}
                href={it.href}
                title={it.label}
                aria-label={it.label}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "flex items-center gap-1 rounded-lg bg-blue-100 px-2 py-2 text-xs font-semibold text-blue-800"
                    : "flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium text-slate-600 hover:bg-amber-50"
                }
              >
                <MabiIcon kind={it.icon} size={18} />
                <span className="hidden xl:inline">{it.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
