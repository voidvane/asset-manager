import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <main className="space-y-4 py-6 md:py-10">
      <h1 className="text-xl font-bold md:text-2xl">설정</h1>
      <Card title="표시 설정">
        <p className="text-sm text-slate-600">
          통화: KRW 고정 · 입력 단위: 만원. 자산 입력값은 이 브라우저의
          localStorage에만 저장되며 서버로 전송되지 않습니다.
        </p>
      </Card>
    </main>
  );
}
