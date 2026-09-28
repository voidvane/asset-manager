# 자산매니저 MVP

## 실행
```powershell
Copy-Item .env.example .env.local
# DATABASE_URL, JWT_SECRET 설정 후
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

## 구조
- `/app` Next.js App Router 화면 + API
- `/components` 재사용 UI + 레이아웃
- `/lib` DB/포맷/검증/인증 유틸
- `/types` 공유 타입
- `/prisma` DB 스키마 + 시드
- `/tests` Vitest
- `/public` PWA 매니페스트/아이콘
