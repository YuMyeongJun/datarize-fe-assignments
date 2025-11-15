# 기술 스택 및 라이브러리 설치 가이드

## 필수 라이브러리 설치 명령어

```bash
# 라우팅
yarn add react-router react-router-dom

# CSS 및 UI 프레임워크
yarn add tailwindcss@3.4.17
# shadcn/ui는 별도 초기화 필요: npx shadcn-ui@latest init

# 상태 관리 및 데이터 페칭
yarn add @tanstack/react-query zustand

# 폼 관리 및 검증
yarn add react-hook-form @hookform/resolvers zod

# 날짜/시간 처리
yarn add dayjs

# 유틸리티
yarn add classnames

# 차트
yarn add echarts echarts-for-react

# UI 컴포넌트
yarn add react-toastify react-loading-skeleton
```

## 라이브러리별 용도

### 라우팅
- **react-router-dom**: 페이지 라우팅 및 네비게이션

### 스타일링
- **tailwindcss@3.4.17**: 유틸리티 기반 CSS 프레임워크
- **shadcn@2.3.0**: Radix UI 기반 컴포넌트 라이브러리
- **classnames**: 조건부 클래스명 조합 유틸리티

### 상태 관리
- **zustand**: 전역 상태 관리 (가벼운 상태 관리 라이브러리)
- **@tanstack/react-query**: 서버 상태 관리 및 데이터 페칭 (캐싱, 동기화 등)

### 폼 관리
- **react-hook-form**: 성능 최적화된 폼 관리
- **@hookform/resolvers**: 폼 검증 리졸버 (zod와 연동)
- **zod**: TypeScript-first 스키마 검증 라이브러리

### 날짜/시간
- **dayjs**: 경량 날짜/시간 처리 라이브러리 (moment.js 대체)

### 차트
- **echarts**: 강력한 차트 라이브러리
- **echarts-for-react**: React용 ECharts 래퍼

### UI 컴포넌트
- **react-toastify**: 토스트 메시지 알림 (에러, 성공 메시지 표시)
- **react-loading-skeleton**: 로딩 중 스켈레톤 UI

## 프로젝트 구조 참고

이 프로젝트는 단순한 워크스페이스 구조를 사용합니다:
- `apps/frontend`: 프론트엔드 애플리케이션
- `apps/backend`: 백엔드 서버 (수정 금지)

> 참고: 일반적인 monorepo 구조 (packages/models, packages/components 등)는 이 프로젝트에서 사용하지 않습니다.

## 설정 파일

### Tailwind CSS 설정
`tailwind.config.js` 또는 `tailwind.config.ts` 파일에서 설정

### Shadcn UI 초기화
```bash
npx shadcn-ui@latest init
```

### React Query Provider 설정
`main.tsx` 또는 `App.tsx`에서 QueryClientProvider 설정

### React Router 설정
`main.tsx`에서 BrowserRouter 설정

### Toastify 설정
`App.tsx`에서 ToastContainer 추가

