import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function FavoritesPage() {
  return (
    <main className="space-y-4 py-6 md:py-10">
      <h1 className="text-xl font-bold md:text-2xl">즐겨찾기</h1>
      <Card title="저장한 용어">
        <p className="text-sm text-slate-600">
          용어 즐겨찾기(로컬 저장)는 준비 중입니다. 지금은{" "}
          <Link href="/learn" className="text-blue-700 underline">
            용어 사전
          </Link>
          에서 파란 용어를 탭해 학습을 이어가세요.
        </p>
      </Card>
    </main>
  );
}
