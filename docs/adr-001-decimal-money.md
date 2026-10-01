# ADR-001 — 금액은 Decimal(19,4) + bigint(scale 4), float 금지

- 상태: ACCEPTED (DB) / IMPLEMENTED (표시·계산 유틸 `lib/money.ts`)
- 날짜: 2026-10-01
- 분류: OBSERVED(스키마) + VERIFIED(테스트)

## 결정
1. 영속 계층: 모든 금액 컬럼 `Decimal(19,4)`. JS `number`/`float`로 저장·계산하지 않는다.
2. 애플리케이션 계층: 금액 연산은 소수 4자리 minor-unit `bigint` (`lib/money.ts`).
   표시 변환도 정수 연산만 사용하며, 경로상에 `Number()`를 두지 않는다.
3. `>4`자리 정밀도 입력은 반올림하지 않고 `RangeError`로 거부한다.

## 근거
- Binary floating point는 `0.1 + 0.2 !== 0.3`이며 2^53 이상 정수에서 정밀도를 잃는다.
  `formatKRW`가 `Number(value)`로 변환하던 경로가 이 위험을 갖고 있었음 (P1).
- `Decimal(19,4)`는 원화 정수·주식 소수점·코인 소수·환율을 하나의 스케일로 수용한다.
- 원화 표시는 반올림(half-up, 0.5원 기준)이 필요하므로 표시 계층(`formatKRW4`)에서
  명시적으로 수행하고, 원장 값 자체는 절대 반올림하지 않는다.

## 대안과 기각 이유
- `number` + 소수점 2자리: 코인/환율 정밀도 부족, 누적 오차. 기각.
- `string` 그대로 연산: 비교·합산 시 매번 파싱, 불변식 테스트 어려움. 기각.
- 외부 decimal 라이브러리: 현재 연산(합산·배분)이 정수 연산으로 충분하고
  의존성을 늘릴 이유가 없음. 필요해지면 재검토 (XIRR 등 무리수 연산 시점).

## 검증
- `tests/money.test.ts`: 0.1+0.2 정확 일치, max Decimal(19,4), 음수 순자산,
  배분 합계 10000bp 보장, 0원·무입력 edge case.
