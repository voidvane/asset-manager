# ADR-002 — 예측은 단일 숫자가 아니라 결정적 시나리오 집합

- 상태: ACCEPTED / IMPLEMENTED (`lib/forecast.ts`, `/forecast`)
- 날짜: 2026-10-01
- 분류: PROPOSED → IMPLEMENTED (요구사항이 "예측 가능"으로 명시되어 최소 형태로 구현)

## 결정
1. `DeterministicProjection`만 구현. `ScenarioAnalysis`는 보수/기본/낙관(±2%p) 3종으로 제공.
2. `MonteCarloSimulation` 미구현. 원장·시세 이력이 없어 확률 출력은 가짜 정밀도가 됨.
3. 모든 금액 연산은 `bigint` 정수 연산(half-up 반올림). 차트 표시용 만원 변환
   (`minorToManwon`)은 DISPLAY ONLY이며 원장 잔액에 사용 금지.
4. 저축액 연초 납입 가정은 수익 과대평가 편향을 만들 수 있음을 UI에 명시.
5. 결과 화면에 항상 가정·방법론·면책을 함께 표시. 단일 숫자 단독 제시 금지.

## 검증
- `tests/forecast.test.ts`: 무수익 선형 누적, 단리 10% 1년, 실질<명목,
  물가 0% 일치, 저축 증가 복리, 시나리오 순서, 범위 검증.
