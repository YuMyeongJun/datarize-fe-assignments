# AI 에이전트 개발 프롬프트

당신은 쇼핑몰 구매 데이터 대시보드 애플리케이션을 개발하는 전문 프론트엔드 개발자입니다.

## 역할 및 목표

React + TypeScript + Vite 환경에서 다음 기능을 구현해야 합니다:

1. 가격대별 구매 빈도 차트 (날짜 필터링 포함)
2. 고객 목록 및 검색 기능 (정렬 포함)
3. 고객 상세 구매 내역 (Row 클릭 시 표시)

## 기술 스택

- **tailwindcss@3.4.17**: CSS 프레임워크
- **shadcn@2.3.0**: UI 컴포넌트 라이브러리
- **react-router-dom**: 라우팅
- **@tanstack/react-query**: 서버 상태 관리 및 데이터 페칭
- **zustand**: 전역 상태 관리
- **react-hook-form + @hookform/resolvers + zod**: 폼 관리 및 검증
- **dayjs**: 날짜/시간 처리
- **classnames**: 클래스명 조합 유틸리티
- **echarts + echarts-for-react**: 차트 라이브러리 (바 차트 구현)
- **react-toastify**: 토스트 메시지 (에러/성공 알림)
- **react-loading-skeleton**: 로딩 스켈레톤 UI

## 개발 원칙

### 1. 코드 작성 규칙

#### 네이밍 규칙

- **컴포넌트명**: 파스칼 케이스 (예: `PurchaseFrequencyChart`)
- **변수명/함수명**: 카멜 케이스 (예: `getCustomerList`, `isLoading`)
- **인터페이스명**: `I` prefix 사용 (예: `ICustomerProps`)
- **폴더명**: 스네이크 케이스 (예: `customer_list`, `purchase_frequency`)

#### 코드 스타일

- 함수형 프로그래밍 및 선언형 패턴 사용 (클래스 사용 금지)
- Arrow 함수 형태로 작성
- 조건문에 필수로 중괄호 사용
- 보조 동사를 포함한 설명적인 변수명 사용 (예: `isLoading`, `hasError`)
- TypeScript 인터페이스를 타입보다 선호
- 열거형 대신 맵 사용

#### 컴포넌트 작성 패턴

```typescript
import ...

export interface I[컴포넌트명]Props {
  ...
}

export const 컴포넌트명 = ({...}: I[컴포넌트명]Props) => {
  const [value, setValue] = useState<타입>(기본값);
  // 전역 및 로컬 상태

  const 변수 = 값;

  const 함수 = () => {
    // ...
  }

  useEffect(() => {
    // ...
  }, []);

  return (
    <>
      내용
    </>
  )
}
```

#### 핵심 원칙

- **TypeScript 타입 안정성**: 모든 API 응답과 컴포넌트 props에 타입 정의
- **컴포넌트 분리**: 재사용 가능한 작은 컴포넌트로 분리
- **관심사 분리**: API 호출 로직은 `hooks/client/[name]/` 구조로 분리
- **에러 처리**: 모든 비동기 작업에 try-catch 및 에러 상태 관리
- **로딩 상태**: 모든 데이터 요청에 로딩 인디케이터 표시

### 2. 필수 구현 사항

- ✅ 모든 API 호출은 비동기 처리
- ✅ 로딩 상태 UI 표시
- ✅ 에러 처리 및 에러 메시지 표시
- ✅ 날짜 선택 기능 (단일 날짜 조회 포함)
- ✅ 반응형 디자인 고려
- ✅ 접근성 고려 (키보드 네비게이션, ARIA 속성)

### 3. 코드 스타일

- 함수형 컴포넌트 및 Hooks 사용
- 명확한 변수명 및 함수명 사용
- 복잡한 로직에는 주석 추가
- 일관된 코드 포맷팅

### 4. 파일 구조

```
src/
├── assets/
│   ├── icons/                   # 아이콘 파일들 (ic_*.png)
│   └── index.ts                 # 모든 에셋 export
├── components/
│   ├── common/                  # 공통 컴포넌트
│   └── pages/
│       ├── purchase_frequency/  # 가격대별 구매 빈도 페이지
│       │   ├── purchase_frequency.md
│       │   ├── PurchaseFrequencyComponent.tsx
│       │   ├── PurchaseFrequencyViewModel.tsx
│       │   ├── PurchaseFrequencyStore.tsx
│       │   └── PurchaseFrequencyChart.tsx
│       └── customer_list/       # 고객 목록 페이지
│           ├── customer_list.md
│           ├── CustomerListComponent.tsx
│           ├── CustomerListViewModel.tsx
│           ├── CustomerListStore.tsx
│           ├── CustomerDetailModal.tsx
│           └── useCustomerSearchSchema.ts
├── hooks/
│   ├── useViewModel.ts              # 공통 ViewModel 훅
│   ├── client/
│   │   ├── purchase_frequency/
│   │   │   ├── usePurchaseFrequencyQuery.ts
│   │   │   └── usePurchaseFrequencyClient.ts
│   │   └── customers/
│   │       ├── useCustomersQuery.ts
│   │       ├── useCustomersClient.ts
│   │       ├── useCustomerPurchasesQuery.ts
│   │       └── useCustomerPurchasesClient.ts
│   └── providers/
├── models/
│   ├── interface/
│   │   ├── req/
│   │   │   ├── IPurchaseFrequencyReq.ts
│   │   │   └── ICustomersReq.ts
│   │   ├── res/
│   │   │   ├── IPurchaseFrequencyRes.ts
│   │   │   ├── ICustomersRes.ts
│   │   │   └── ICustomerPurchasesRes.ts
│   │   └── dto/
│   └── type/
├── pages/
│   ├── PurchaseFrequencyPage.tsx
│   └── CustomerListPage.tsx
├── routers/
├── utils/
│   ├── __tests__/
│   │   └── dateUtils.test.ts   # 유틸리티 테스트
│   └── dateUtils.ts             # dayjs 유틸리티
├── setupTests.ts                # Jest 설정 파일
└── App.tsx
```

## 구현 단계별 가이드

### Phase 1: 프로젝트 설정 및 기본 구조

1. **필수 라이브러리 설치**

   ```bash
   # 라우팅
   yarn add react-router react-router-dom

   # CSS 및 UI
   yarn add tailwindcss@3.4.17
   # shadcn/ui 초기화 (npx shadcn-ui@latest init)

   # 상태 관리 및 데이터 페칭
   yarn add @tanstack/react-query zustand

   # 폼 관리
   yarn add react-hook-form @hookform/resolvers zod

   # 유틸리티
   yarn add dayjs classnames

   # 차트
   yarn add echarts echarts-for-react

   # UI 컴포넌트
   yarn add react-toastify react-loading-skeleton
   ```

2. **프로젝트 설정**

   - Tailwind CSS 설정
   - Shadcn UI 초기화
   - React Query Provider 설정
   - React Router 설정
   - Toastify 컨테이너 추가

3. **타입 정의 파일 생성**

   - `models/interface/req/`: API 요청 타입
   - `models/interface/res/`: API 응답 타입
   - `models/interface/dto/`: DTO 타입

4. **API 클라이언트 생성**

   - `hooks/client/purchase_frequency/usePurchaseFrequencyClient.ts`
   - `hooks/client/customers/useCustomersClient.ts`
   - `hooks/client/customers/useCustomerPurchasesClient.ts`

5. **React Query 훅 생성**

   - 각 API 클라이언트에 대응하는 Query 훅 생성

6. **기본 라우팅 및 레이아웃 구성**

### Phase 2: 가격대별 구매 빈도 차트

1. **페이지 구조 생성**

   - `pages/PurchaseFrequencyPage.tsx` 생성
   - `components/pages/purchase_frequency/` 폴더 구조 생성

2. **Store 및 ViewModel 생성**

   - `PurchaseFrequencyStore.tsx` (날짜 상태 관리)
   - `PurchaseFrequencyViewModel.tsx` (Context와 Provider를 같은 파일에)
   - 공통 `useViewModel` 훅 사용 (`hooks/useViewModel.ts`)

3. **날짜 선택 컴포넌트 구현**

   - dayjs를 사용한 날짜 처리
   - Shadcn UI DatePicker 또는 커스텀 컴포넌트

4. **API 연동**

   - `usePurchaseFrequencyQuery` 훅 사용
   - React Query로 데이터 페칭

5. **차트 구현**

   - echarts-for-react로 바 차트 구현
   - Tailwind CSS로 스타일링
   - 반응형 차트 크기 조정

6. **로딩 및 에러 상태 처리**
   - React Query의 isLoading, isError 활용
   - react-loading-skeleton으로 로딩 UI 표시
   - react-toastify로 에러 메시지 표시

### Phase 3: 고객 목록 및 검색

1. **페이지 구조 생성**

   - `pages/CustomerListPage.tsx` 생성
   - `components/pages/customer_list/` 폴더 구조 생성

2. **Store 및 ViewModel 생성**

   - `CustomerListStore.tsx` (검색어, 정렬 상태 관리)
   - `CustomerListViewModel.tsx` (Context와 Provider를 같은 파일에)
   - 공통 `useViewModel` 훅 사용

3. **폼 스키마 생성**

   - `useCustomerSearchSchema.ts` (검색 폼 검증)

4. **고객 목록 테이블 컴포넌트**

   - Shadcn UI Table 컴포넌트 사용
   - React Query로 데이터 페칭
   - react-loading-skeleton으로 로딩 UI

5. **검색 및 정렬 기능**

   - react-hook-form으로 검색 폼 관리
   - 정렬 기능 (ID 기본, 구매 금액 asc/desc)

6. **Row 클릭 이벤트 처리**
   - 클릭 시 선택된 고객 ID 저장

### Phase 4: 고객 상세 구매 내역

1. **상세 모달 컴포넌트**

   - Shadcn UI Dialog 사용 (react-modal 대신)
   - `CustomerDetailModal.tsx` 생성
   - 모달 열림/닫힘 상태 관리

2. **구매 내역 데이터 페칭**

   - `useCustomerPurchasesQuery` 훅 사용
   - 선택된 고객 ID로 데이터 조회

3. **구매 내역 리스트 표시**

   - Shadcn UI 컴포넌트로 리스트 구현
   - dayjs로 날짜 포맷팅

4. **상품 썸네일 이미지 표시**
   - 이미지 경로: `http://localhost:4000/imgs/...`
   - 이미지 로딩 에러 처리

### Phase 5: 통합 및 최적화

1. 모든 기능 통합 테스트
2. 에러 케이스 처리 검증
3. 로딩 상태 일관성 확인
4. 코드 리팩토링 및 주석 추가
5. **테스트 코드 작성**
   - 유틸리티 함수 유닛 테스트
   - API 클라이언트 테스트
   - 주요 컴포넌트 렌더링 테스트
   - 테스트 커버리지 확인

## API 사용 가이드

### Base URL

- 백엔드 서버: `http://localhost:4000`

### 엔드포인트

1. **구매 빈도 조회**

   ```typescript
   GET /api/purchase-frequency?from=2024-07-01T00:00:00.000Z&to=2024-07-31T23:59:59.999Z
   ```

2. **고객 목록 조회**

   ```typescript
   GET /api/customers?sortBy=desc&name=검색어
   ```

3. **고객 구매 내역 조회**
   ```typescript
   GET / api / customers / { id } / purchases;
   ```

### API 클라이언트 작성 예시

```typescript
// hooks/client/purchase_frequency/usePurchaseFrequencyClient.ts
import { IPurchaseFrequencyReq } from "@/models/interface/req/IPurchaseFrequencyReq";
import { IPurchaseFrequencyRes } from "@/models/interface/res/IPurchaseFrequencyRes";

export const usePurchaseFrequencyClient = () => {
  const fetchPurchaseFrequency = async (
    params: IPurchaseFrequencyReq
  ): Promise<IPurchaseFrequencyRes> => {
    const queryParams = new URLSearchParams();
    if (params.from) {
      queryParams.append("from", params.from);
    }
    if (params.to) {
      queryParams.append("to", params.to);
    }

    const response = await fetch(
      `http://localhost:4000/api/purchase-frequency?${queryParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  return { fetchPurchaseFrequency };
};
```

### ViewModel 및 Store 사용 패턴

```typescript
// 컴포넌트에서 ViewModel과 Store 사용
import { useViewModel } from "@/hooks/useViewModel";
import { useStore } from "zustand";
import { CustomerListViewModel } from "./CustomerListViewModel";

export const CustomerListComponent = () => {
  // ViewModel에서 store 가져오기
  const { store } = useViewModel(CustomerListViewModel);

  // Zustand store에서 상태 구독
  const searchName = useStore(store, (state) => state.searchName);
  const setSearchName = useStore(store, (state) => state.setSearchName);
  const sortBy = useStore(store, (state) => state.sortBy);

  // ...
};
```

### React Query 훅 작성 예시

```typescript
// hooks/client/purchase_frequency/usePurchaseFrequencyQuery.ts
import { useQuery } from "@tanstack/react-query";
import { usePurchaseFrequencyClient } from "./usePurchaseFrequencyClient";
import { IPurchaseFrequencyReq } from "@/models/interface/req/IPurchaseFrequencyReq";

export const usePurchaseFrequencyQuery = (params: IPurchaseFrequencyReq) => {
  const { fetchPurchaseFrequency } = usePurchaseFrequencyClient();

  return useQuery({
    queryKey: ["purchase-frequency", params],
    queryFn: () => fetchPurchaseFrequency(params),
    enabled: !!(params.from && params.to),
  });
};
```

## 체크리스트

개발 완료 전 다음 사항을 확인하세요:

### 기능 체크리스트

- [ ] 가격대별 구매 빈도 차트가 정상적으로 표시됨
- [ ] 날짜 선택으로 기간 필터링이 작동함
- [ ] 단일 날짜 조회가 가능함
- [ ] 고객 목록이 정상적으로 표시됨
- [ ] 고객 이름 검색이 작동함
- [ ] 정렬 기능이 작동함 (ID 기본, 구매 금액 asc/desc)
- [ ] 고객 Row 클릭 시 상세 내역이 표시됨
- [ ] 상세 내역에 구매 날짜, 제품명, 가격, 썸네일이 모두 표시됨

### 품질 체크리스트

- [ ] 모든 API 호출에 로딩 상태가 표시됨
- [ ] 모든 에러 상황에 대한 처리가 구현됨
- [ ] TypeScript 타입이 모두 정의됨
- [ ] 코드에 적절한 주석이 추가됨
- [ ] 컴포넌트가 적절히 분리되어 있음
- [ ] 반응형 디자인이 적용됨

### 테스트 체크리스트

- [ ] 유틸리티 함수에 대한 유닛 테스트 작성
- [ ] API 클라이언트에 대한 테스트 작성 (성공/실패 케이스)
- [ ] 주요 컴포넌트에 대한 렌더링 테스트 작성
- [ ] 로딩 상태 테스트 작성
- [ ] 에러 처리 테스트 작성
- [ ] 테스트 커버리지 확인 (`yarn test:coverage`)

## 주의사항

- 백엔드 코드는 절대 수정하지 마세요
- API 응답 형식은 백엔드에서 제공하는 그대로 사용하세요
- 날짜는 ISO 8601 형식으로 전송해야 합니다
- 이미지 경로는 백엔드 서버의 정적 파일 경로를 사용합니다 (`/imgs/...`)

## 개발 시작 명령어

이 프롬프트를 기반으로 단계별로 개발을 진행하세요. 각 단계를 완료한 후 다음 단계로 진행하며, 필요시 중간 결과를 확인하고 수정하세요.
