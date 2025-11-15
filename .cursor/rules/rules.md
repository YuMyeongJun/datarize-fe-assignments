# Cursor AI 개발 룰

## 프로젝트 컨텍스트

이 프로젝트는 Datarize Frontend 과제로, 쇼핑몰 구매 데이터 대시보드 애플리케이션을 개발합니다.

## 핵심 규칙

### 1. 백엔드 코드 수정 금지

- `apps/backend` 폴더 내의 모든 파일은 절대 수정하지 마세요
- 백엔드 API는 이미 구현되어 있으므로 프론트엔드에서만 개발하세요

### 2. 필수 기능 구현

다음 세 가지 기능을 반드시 구현해야 합니다:

1. **가격대별 구매 빈도 차트**: 날짜 필터링 포함, 바 차트 형태
2. **고객 목록 및 검색**: 정렬 기능 포함 (ID 기본, 구매 금액 asc/desc)
3. **고객 상세 구매 내역**: Row 클릭 시 모달/사이드바로 표시

### 3. 필수 구현 사항

- 모든 API 호출은 비동기 처리
- 모든 데이터 요청에 로딩 상태 표시
- 모든 에러 상황에 대한 처리 및 사용자 피드백
- 단일 날짜 조회 지원 (from과 to가 같은 날짜)

### 4. 기술 스택

- React 18.3.1
- TypeScript
- Vite
- **tailwindcss@3.4.17**: CSS 프레임워크
- **shadcn@2.3.0**: UI 컴포넌트 라이브러리
- **react-router-dom**: 라우팅
- **@tanstack/react-query**: 서버 상태 관리 및 데이터 페칭
- **zustand**: 전역 상태 관리
- **react-hook-form + @hookform/resolvers + zod**: 폼 관리 및 검증
- **dayjs**: 날짜/시간 처리
- **classnames**: 클래스명 조합
- **echarts + echarts-for-react**: 차트 라이브러리
- **react-toastify**: 토스트 메시지
- **react-loading-skeleton**: 로딩 스켈레톤 UI

### 5. 코드 스타일 및 네이밍 규칙

- **컴포넌트명**: 파스칼 케이스 (예: `PurchaseFrequencyChart`)
- **변수명/함수명**: 카멜 케이스 (예: `getCustomerList`, `isLoading`)
- **인터페이스명**: `I` prefix 사용 (예: `ICustomerProps`)
- **폴더명**: 스네이크 케이스 (예: `customer_list`, `purchase_frequency`)
- 함수형 프로그래밍 및 선언형 패턴 사용 (클래스 사용 금지)
- Arrow 함수 형태로 작성
- 조건문에 필수로 중괄호 사용
- TypeScript 인터페이스를 타입보다 선호
- 열거형 대신 맵 사용

### 6. API 엔드포인트

- Base URL: `http://localhost:4000`
- `GET /api/purchase-frequency?from={ISO8601}&to={ISO8601}`
- `GET /api/customers?sortBy={asc|desc}&name={검색어}`
- `GET /api/customers/{id}/purchases`

### 7. 파일 구조

```
apps/frontend/src/
├── assets/
│   ├── icons/              # 아이콘 파일들 (ic_*.png)
│   └── index.ts            # 모든 에셋 export
├── components/
│   ├── common/             # 공통 컴포넌트
│   └── pages/
│       └── [페이지명]/     # 페이지별 컴포넌트 (스네이크 케이스)
│           ├── [페이지명]Component.tsx
│           ├── [페이지명]ViewModel.tsx
│           ├── [페이지명]Store.tsx
│           └── use[모델명]Schema.ts
├── hooks/
│   └── client/
│       └── [name]/
│           ├── use[name]Query.ts
│           └── use[name]Client.ts
├── models/
│   └── interface/
│       ├── req/            # I[RequestName]Req.ts
│       ├── res/            # I[ResponseName]Res.ts
│       └── dto/            # I[DtoName]Dto.ts
├── pages/
│   └── [페이지명]Page.tsx
├── utils/
│   └── __tests__/          # 유틸리티 테스트
└── setupTests.ts          # Jest 설정 파일
```

### 8. 상태 관리 패턴

- **전역 상태**: zustand 사용
- **페이지별 Store**: `create[PageName]Store` 함수로 생성
- **ViewModel 패턴**: `[PageName]ViewModel.tsx` 및 Provider 사용

### 9. API 클라이언트 패턴

- `hooks/client/[name]/` 폴더 구조 사용
- `use[Name]Client.ts`: API 호출 로직
- `use[Name]Query.ts`: React Query 훅
- 모든 API 타입은 `models/interface`에서 정의

### 10. 폼 처리 패턴

- `react-hook-form + @hookform/resolvers + zod` 조합 사용
- `use[ModelName]Schema.ts` 파일에서 zod 스키마 정의

### 11. 테스트 작성 규칙

- **테스트 프레임워크**: Jest + React Testing Library
- **테스트 파일 위치**: `__tests__/` 폴더 또는 `.test.ts` / `.test.tsx` 확장자
- **테스트 파일 네이밍**: `[파일명].test.ts` 또는 `[파일명].test.tsx`
- **유닛 테스트**: 유틸리티 함수, API 클라이언트 등
- **컴포넌트 테스트**: React Testing Library 사용
- **테스트 실행**: `yarn test`, `yarn test:watch`, `yarn test:coverage`

## 상세 규칙 문서

이 폴더의 다른 규칙 파일들:

- `.cursor/rules/development-rules.md`: 상세한 개발 룰 및 요구사항 명세서
- `.cursor/rules/agent-prompt.md`: 단계별 개발 가이드 및 구현 예시

## 추가 참고 문서

- `docs/TECHNICAL_DECISIONS.md`: 기술 스택 선택 이유 및 아키텍처 결정 사항
- `docs/TECH_STACK.md`: 기술 스택 설치 가이드
- `docs/FILE_ROLES.md`: 문서 파일 역할 설명
- README.md: 프로젝트 개요 및 실행 방법

## 응답 형식

- 한국어로 응답
- 코드는 명확하고 읽기 쉽게 작성
- 각 단계별로 진행 상황을 명확히 표시
