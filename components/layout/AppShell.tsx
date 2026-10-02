"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "@/lib/econ-types";

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  { href: "/", label: "홈", icon: "🏠", exact: true },
  { href: "/terms", label: "용어", icon: "📚" },
  { href: "/learn", label: "학습", icon: "🃏" },
  { href: "/favorites", label: "즐겨찾기", icon: "⭐" },
];

export const DESKTOP_NAV_ITEMS: NavItem[] = [
  { href: "/", label: "홈", icon: "🏠", exact: true },
  { href: "/terms", label: "용어", icon: "📚" },
  { href: "/learn", label: "학습", icon: "🃏" },
  { href: "/favorites", label: "즐겨찾기", icon: "⭐" },
  { href: "/settings", label: "설정", icon: "⚙️" },
  { href: "/dashboard", label: "자산관리", icon: "💰" },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export function Header() {
  const pathname = usePathname();
  const today = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <header
      className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label="경제카드 홈으로 이동">
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--color-primary)] text-lg text-white">
            ₩
          </span>
          <span className="flex flex-col leading-tight">
            <strong className="text-[15px] font-bold">경제카드</strong>
            <span className="text-xs text-[var(--color-text-secondary)]">{today}</span>
          </span>
        </Link>
        <nav aria-label="데스크톱 메뉴" className="hidden items-center gap-1 md:flex">
          {DESKTOP_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item) ? "page" : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive(pathname, item)
                  ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)] hover:bg-slate-100 hover:text-[var(--color-text)]"
              }`}
            >
              <span aria-hidden="true" className="mr-1">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/settings"
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--color-border)] text-lg md:hidden"
          aria-label="설정으로 이동"
        >
          <span aria-hidden="true">⚙️</span>
        </Link>
      </div>
    </header>
  );
}

export function BottomNavigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="하단 메뉴"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--color-border)] bg-[var(--color-surface)]/98 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid w-full max-w-6xl grid-cols-4">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const active = isActive(pathname, item);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-[60px] flex-col items-center justify-center gap-0.5 px-1 py-2 text-xs font-medium ${
                  active ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"
                }`}
              >
                <span aria-hidden="true" className={`text-xl leading-none ${active ? "scale-110" : ""}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className={`h-1 w-8 rounded-full ${active ? "bg-[var(--color-primary)]" : "bg-transparent"}`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 pb-24 pt-4 md:pb-12 md:pt-6">{children}</div>
      <BottomNavigation />
    </div>
  );
}
