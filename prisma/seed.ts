import { PrismaClient, CategoryKind } from "@prisma/client";

const prisma = new PrismaClient();

const systemCategories: Array<{
  kind: CategoryKind;
  name: string;
  icon: string;
}> = [
  { kind: "ASSET", name: "현금", icon: "💵" },
  { kind: "ASSET", name: "예·적금", icon: "🏦" },
  { kind: "ASSET", name: "주식·ETF", icon: "📈" },
  { kind: "ASSET", name: "펀드", icon: "📊" },
  { kind: "ASSET", name: "채권", icon: "🧾" },
  { kind: "ASSET", name: "가상자산", icon: "🪙" },
  { kind: "ASSET", name: "부동산", icon: "🏠" },
  { kind: "ASSET", name: "자동차·기타", icon: "🚗" },
  { kind: "LIABILITY", name: "대출", icon: "🏧" },
  { kind: "LIABILITY", name: "신용카드", icon: "💳" },
  { kind: "INCOME", name: "급여", icon: "💰" },
  { kind: "EXPENSE", name: "생활비", icon: "🧺" },
];

async function main() {
  for (const c of systemCategories) {
    await prisma.category.upsert({
      where: {
        userId_kind_name: { userId: null as unknown as string, kind: c.kind, name: c.name },
      },
      update: {},
      create: {
        userId: null,
        kind: c.kind,
        name: c.name,
        icon: c.icon,
        isSystem: true,
      },
    }).catch(() => {
      // @@unique(userId...) 에서 NULL 비교 이슈 회피용 fallback
      return prisma.$executeRawUnsafe(
        `INSERT INTO categories (id, kind, name, icon, is_system, created_at)
         VALUES (gen_random_uuid(), $1::"CategoryKind", $2, $3, true, now())
         ON CONFLICT DO NOTHING`,
        c.kind,
        c.name,
        c.icon
      );
    });
  }
  console.log("seed done");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
