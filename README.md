# 자산매니저 MVP

수기 입력 중심 개인 자산관리. `총자산 - 총부채 = 순자산`과 월별 변화를 보여준다.
금융기관 연동 없음 (연동은 별도 규제 단계, `docs/` 참고).

## 실행
```powershell
Copy-Item .env.example .env.local
# DATABASE_URL, JWT_SECRET 설정 후
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## 아키텍처
단일 Next.js 모놀리스 (App Router):
`Browser → Next.js(App+API) → Prisma → PostgreSQL`.
마이크로서비스·큐·캐시는 병목이 실측되기 전까지 도입하지 않는다.

## 도메인 모델 (`prisma/schema.prisma`)
User / Category(시스템+사용자) / Account(수기 계좌 실체) / Asset(Decimal 19,4) /
Liability / Transaction(수입·지출のみ) / Portfolio / AssetSnapshot(월 스냅샷) /
Notification / UserSetting / AuditLog(금액 미저장).
상세 근거: `docs/adr-001-decimal-money.md`.

## 금융 계산 규칙
- 모든 금액 연산은 `lib/money.ts`의 minor-unit `bigint`(scale 4). `number` 연산 금지.
- `>4`자리 입력은 거부 (암묵적 반올림 금지). 원화 표시에만 half-up 반올림.
- 배분율은 정수 bp + 최대잉여법으로 항상 합계 10000 보장.

## 환경 설정
`.env.example` 참조. 비밀값은 `.env.local`/Vercel Env에만. 커밋 금지.

## 개발·테스트
```powershell
npm run dev        # 개발 서버
npx tsc --noEmit   # 타입체크
npx vitest run     # 단위 테스트
npm run build      # 프로덕션 빌드 (prisma generate 포함)
```

## 알려진 제약
- `prisma/migrations` 없음: 첫 마이그레이션 전. 시스템 카테고리 NULL-unique는
  Postgres에서 중복을 막지 못하므로 시드 전에 부분 유니크 인덱스 설계 필요.
- `User.email` Citext는 `citext` 익스텐션 필요 (`CREATE EXTENSION`).
- `Transaction`은 수입/지출만 지원. 매매·배당·이자 원장 이벤트 미지원 (설계 단계).
- 단일 통화 표시 중심. FX 테이블·시세 공급자 없음 (설계 단계).
- 예측은 단일 숫자 형태 금지. 시나리오 기반부터 도입 예정.
