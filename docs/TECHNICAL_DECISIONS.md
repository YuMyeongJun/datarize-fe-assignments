# 기술 스택 및 아키텍처 결정 사항

## 개요

이 문서는 쇼핑몰 구매 데이터 대시보드 프로젝트에서 사용한 기술 스택과 아키텍처 패턴에 대한 결정 사항, 사용 이유, 장단점을 정리한 것입니다.

---

## 1. UI 및 스타일링

### 1.1 Tailwind CSS 3.4.17

**선택 이유:**

- 유틸리티 기반 CSS 프레임워크로 빠른 개발 속도
- 커스터마이징이 용이하고 일관된 디자인 시스템 구축 가능
- 번들 크기 최적화 (사용하지 않는 스타일 자동 제거)
- 반응형 디자인을 간단한 클래스로 구현 가능

**사용 패턴:**

```tsx
<div className="flex items-center justify-center p-6 bg-white rounded-lg shadow-md">
  <h2 className="text-2xl font-bold mb-6">제목</h2>
</div>
```

**장점:**

- ✅ 빠른 개발 속도
- ✅ 일관된 디자인 시스템
- ✅ 작은 번들 크기 (PurgeCSS)
- ✅ 반응형 디자인 용이
- ✅ HTML과 스타일이 같은 파일에 있어 가독성 향상

**단점:**

- ❌ 초기 학습 곡선
- ❌ 클래스명이 길어질 수 있음
- ❌ 복잡한 애니메이션은 추가 설정 필요

---

### 1.2 Shadcn UI 2.3.0

**선택 이유:**

- Radix UI 기반으로 접근성과 키보드 네비게이션 지원
- 컴포넌트를 복사하여 프로젝트에 포함하는 방식 (설치가 아닌 복사)
- Tailwind CSS와 완벽한 통합
- 커스터마이징이 자유로움

**사용 패턴:**

- 이 프로젝트에서는 직접 구현한 컴포넌트를 사용했지만, 향후 확장 시 Shadcn UI 컴포넌트 활용 가능

**장점:**

- ✅ 접근성 우수 (ARIA 속성 자동 지원)
- ✅ 완전한 커스터마이징 가능
- ✅ Tailwind CSS와 완벽한 통합
- ✅ TypeScript 지원

**단점:**

- ❌ 초기 설정 필요
- ❌ 컴포넌트를 직접 관리해야 함

---

## 2. 상태 관리

### 2.1 Zustand 5.0.8

**선택 이유:**

- 가벼운 상태 관리 라이브러리 (Redux 대비)
- 보일러플레이트 코드 최소화
- TypeScript 지원 우수
- React 외부에서도 사용 가능
- ViewModel 패턴과 잘 맞음

**사용 패턴:**

```typescript
// Store 정의
export const createCustomerListStore = () => {
  return createStore<ICustomerListStore>()((set) => ({
    searchName: "",
    sortBy: "id",
    setSearchName: (name) => set({ searchName: name }),
  }));
};

// 컴포넌트에서 사용
const searchName = useCustomerListStore((state) => state.searchName);
```

**장점:**

- ✅ 가벼움 (번들 크기 작음)
- ✅ 간단한 API
- ✅ TypeScript 지원 우수
- ✅ 보일러플레이트 최소화
- ✅ React 외부에서도 사용 가능

**단점:**

- ❌ Redux DevTools 지원이 제한적
- ❌ 복잡한 비동기 로직은 미들웨어 필요
- ❌ 대규모 팀에서의 표준화 필요

**대안 고려:**

- Redux Toolkit: 더 많은 기능과 생태계, 하지만 보일러플레이트 많음
- Jotai: 원자적 상태 관리, 하지만 학습 곡선 존재
- Context API: 간단하지만 성능 이슈 가능

---

### 2.2 ViewModel 패턴

**선택 이유:**

- 페이지별 상태를 캡슐화
- 컴포넌트와 비즈니스 로직 분리
- 테스트 용이성
- 재사용성 향상

**사용 패턴:**

```typescript
// ViewModel 정의 (Context와 Provider를 같은 파일에)
import { createContext } from "react";
import {
  createCustomerListStore,
  CustomerListStore,
} from "./CustomerListStore";

export interface ICustomerListViewModel {
  store: CustomerListStore;
}

// eslint-disable-next-line react-refresh/only-export-components
export const CustomerListViewModel = createContext<
  ICustomerListViewModel | undefined
>(undefined);

export const CustomerListViewModelProvider = ({ children }) => {
  const store = createCustomerListStore();
  return (
    <CustomerListViewModel.Provider value={{ store }}>
      {children}
    </CustomerListViewModel.Provider>
  );
};

// 컴포넌트에서 사용 (공통 useViewModel 훅 사용)
import { useViewModel } from "@/hooks/useViewModel";
import { useStore } from "zustand";
import { CustomerListViewModel } from "./CustomerListViewModel";

export const CustomerListComponent = () => {
  const { store } = useViewModel(CustomerListViewModel);
  const searchName = useStore(store, (state) => state.searchName);
  const setSearchName = useStore(store, (state) => state.setSearchName);
  // ...
};
```

**공통 useViewModel 훅:**

```typescript
// hooks/useViewModel.ts
import { Context, useContext } from "react";

export const useViewModel = <T>(viewModel: Context<T | undefined>): T => {
  const context = useContext(viewModel);
  if (!context) {
    throw new Error(`useViewModel: Provider를 감싸줘야 합니다.`);
  }
  return context;
};
```

**장점:**

- ✅ 관심사 분리
- ✅ 테스트 용이
- ✅ 재사용성
- ✅ 페이지별 상태 격리
- ✅ 공통 훅으로 코드 중복 제거
- ✅ 직접적인 패턴으로 가독성 향상

**단점:**

- ❌ 초기 설정 복잡도
- ❌ 작은 프로젝트에서는 오버엔지니어링 가능

---

## 3. 데이터 페칭 및 서버 상태 관리

### 3.1 TanStack React Query 5.90.9

**선택 이유:**

- 서버 상태 관리에 특화
- 자동 캐싱 및 동기화
- 로딩/에러 상태 자동 관리
- 백그라운드 업데이트
- 낙관적 업데이트 지원

**사용 패턴:**

```typescript
// API 클라이언트
export const useCustomersClient = () => {
  const fetchCustomers = async (
    params: ICustomersReq
  ): Promise<ICustomersRes> => {
    const response = await fetch(url);
    return response.json();
  };
  return { fetchCustomers };
};

// React Query 훅
export const useCustomersQuery = (params: ICustomersReq) => {
  const { fetchCustomers } = useCustomersClient();
  return useQuery({
    queryKey: ["customers", params],
    queryFn: () => fetchCustomers(params),
  });
};
```

**설정:**

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true, // 깜빡임 방지
      staleTime: 30000, // 30초 캐시
      refetchOnWindowFocus: false,
    },
  },
});
```

**장점:**

- ✅ 자동 캐싱 및 동기화
- ✅ 로딩/에러 상태 자동 관리
- ✅ 백그라운드 업데이트
- ✅ 낙관적 업데이트 지원
- ✅ 무한 스크롤, 페이지네이션 등 고급 기능

**단점:**

- ❌ 학습 곡선 존재
- ❌ 작은 프로젝트에서는 오버킬 가능
- ❌ 번들 크기 증가

**대안 고려:**

- SWR: 더 가벼움, 하지만 기능이 제한적
- Apollo Client: GraphQL 전용
- 직접 fetch: 간단하지만 캐싱/동기화 직접 구현 필요

---

## 4. 폼 관리

### 4.1 React Hook Form 7.66.0

**선택 이유:**

- 성능 최적화 (제어 컴포넌트 최소화)
- 적은 리렌더링
- 간단한 API
- 다양한 검증 라이브러리 통합 가능

**사용 패턴:**

```typescript
const { register, handleSubmit, reset } = useForm<SearchFormData>({
  resolver: zodResolver(searchSchema),
  defaultValues: { name: searchName },
});

const onSubmit = (data: SearchFormData) => {
  setSearchName(data.name || "");
};
```

**장점:**

- ✅ 성능 우수 (제어 컴포넌트 최소화)
- ✅ 적은 리렌더링
- ✅ 간단한 API
- ✅ 다양한 검증 라이브러리 통합

**단점:**

- ❌ 복잡한 폼에서는 설정이 복잡할 수 있음
- ❌ 제어 컴포넌트와의 통합이 약간 복잡

**대안 고려:**

- Formik: 더 많은 기능, 하지만 성능 이슈 가능
- Uncontrolled Components: 간단하지만 검증이 복잡

---

### 4.2 Zod 4.1.12

**선택 이유:**

- TypeScript-first 스키마 검증
- 타입 추론 자동
- 런타임 검증
- React Hook Form과 완벽한 통합

**사용 패턴:**

```typescript
const searchSchema = z.object({
  name: z.string().optional(),
});

type SearchFormData = z.infer<typeof searchSchema>;
```

**장점:**

- ✅ TypeScript와 완벽한 통합
- ✅ 타입 추론 자동
- ✅ 런타임 검증
- ✅ 간단한 API

**단점:**

- ❌ 복잡한 검증 규칙은 설정이 복잡할 수 있음

**대안 고려:**

- Yup: 더 많은 기능, 하지만 TypeScript 통합이 약함
- Joi: 강력하지만 브라우저 번들 크기 큼

---

## 5. 라우팅

### 5.1 React Router DOM 6.30.2

**선택 이유:**

- React 생태계의 표준 라우팅 라이브러리
- 선언적 라우팅
- 코드 스플리팅 지원
- TypeScript 지원

**사용 패턴:**

```typescript
<Routes>
  <Route path="/purchase-frequency" element={<PurchaseFrequencyPage />} />
  <Route path="/customers" element={<CustomerListPage />} />
</Routes>
```

**장점:**

- ✅ React 생태계 표준
- ✅ 선언적 라우팅
- ✅ 코드 스플리팅 지원
- ✅ TypeScript 지원

**단점:**

- ❌ 서버 사이드 렌더링은 별도 설정 필요

---

## 6. 차트 라이브러리

### 6.1 ECharts + ECharts-for-React

**선택 이유:**

- 강력한 차트 기능
- 다양한 차트 타입 지원
- 커스터마이징 용이
- 성능 우수
- React 래퍼 제공

**사용 패턴:**

```typescript
<ReactECharts option={option} style={{ height: "400px", width: "100%" }} />
```

**장점:**

- ✅ 강력한 기능
- ✅ 다양한 차트 타입
- ✅ 커스터마이징 용이
- ✅ 성능 우수

**단점:**

- ❌ 번들 크기가 큼
- ❌ 학습 곡선 존재

**대안 고려:**

- Recharts: 더 가벼움, 하지만 기능 제한적
- Chart.js: 널리 사용되지만 React 통합이 약함
- Victory: React 네이티브, 하지만 커스터마이징 복잡

---

## 7. 유틸리티 라이브러리

### 7.1 Day.js 1.11.19

**선택 이유:**

- Moment.js 대체 라이브러리
- 가벼움 (2KB)
- Moment.js와 유사한 API
- 플러그인 시스템

**사용 패턴:**

```typescript
import dayjs from "dayjs";
const formatted = dayjs(date).format("YYYY-MM-DD");
```

**장점:**

- ✅ 가벼움
- ✅ Moment.js와 유사한 API
- ✅ 플러그인 시스템

**단점:**

- ❌ 일부 고급 기능은 플러그인 필요

**대안 고려:**

- Moment.js: 더 많은 기능, 하지만 번들 크기 큼
- date-fns: 함수형, 하지만 API가 다름

---

### 7.2 Classnames 2.5.1

**선택 이유:**

- 조건부 클래스명 조합
- 간단한 API
- 가벼움

**사용 패턴:**

```typescript
import classNames from "classnames";
<div className={classNames("base-class", { active: isActive })} />;
```

**장점:**

- ✅ 간단한 API
- ✅ 가벼움
- ✅ 조건부 클래스명 조합 용이

---

## 8. UI 컴포넌트

### 8.1 React Toastify 11.0.5

**선택 이유:**

- 간단한 토스트 메시지
- 다양한 옵션
- 접근성 지원

**사용 패턴:**

```typescript
import { toast } from "react-toastify";
toast.error("에러 메시지");
```

**장점:**

- ✅ 간단한 사용
- ✅ 다양한 옵션
- ✅ 접근성 지원

---

### 8.2 React Loading Skeleton 3.5.0

**선택 이유:**

- 로딩 상태 시각화
- 사용자 경험 향상
- 간단한 사용

**사용 패턴:**

```typescript
<Skeleton height={50} count={5} />
```

**장점:**

- ✅ 사용자 경험 향상
- ✅ 간단한 사용

---

## 9. 아키텍처 패턴

### 9.1 API 클라이언트 패턴

**구조:**

```
hooks/client/
  ├── purchase_frequency/
  │   ├── usePurchaseFrequencyClient.ts
  │   └── usePurchaseFrequencyQuery.ts
  └── customers/
      ├── useCustomersClient.ts
      ├── useCustomersQuery.ts
      ├── useCustomerPurchasesClient.ts
      └── useCustomerPurchasesQuery.ts
```

**선택 이유:**

- 관심사 분리 (API 호출 로직과 React Query 분리)
- 재사용성
- 테스트 용이성
- 타입 안정성

**장점:**

- ✅ 관심사 분리
- ✅ 재사용성
- ✅ 테스트 용이
- ✅ 타입 안정성

**단점:**

- ❌ 파일 구조가 복잡할 수 있음

---

### 9.2 타입 정의 구조

**구조:**

```
models/interface/
  ├── req/
  │   ├── IPurchaseFrequencyReq.ts
  │   └── ICustomersReq.ts
  ├── res/
  │   ├── IPurchaseFrequencyRes.ts
  │   ├── ICustomersRes.ts
  │   └── ICustomerPurchasesRes.ts
  └── dto/
```

**선택 이유:**

- 명확한 타입 분리
- 재사용성
- 유지보수 용이

**장점:**

- ✅ 명확한 구조
- ✅ 재사용성
- ✅ 유지보수 용이

---

### 9.3 컴포넌트 구조

**구조:**

```
components/
  ├── common/              # 공통 컴포넌트
  └── pages/
      ├── purchase_frequency/
      │   ├── PurchaseFrequencyComponent.tsx
      │   ├── PurchaseFrequencyViewModel.tsx
      │   ├── PurchaseFrequencyStore.tsx
      │   └── PurchaseFrequencyChart.tsx
      └── customer_list/
          ├── CustomerListComponent.tsx
          ├── CustomerListViewModel.tsx
          ├── CustomerListStore.tsx
          └── CustomerDetailModal.tsx
```

**선택 이유:**

- 페이지별 컴포넌트 그룹화
- 관심사 분리
- 재사용성

**장점:**

- ✅ 명확한 구조
- ✅ 관심사 분리
- ✅ 재사용성

---

## 10. 성능 최적화 전략

### 10.1 React Query 설정

```typescript
{
  keepPreviousData: true,  // 깜빡임 방지
  staleTime: 30000,        // 30초 캐시
  refetchOnWindowFocus: false,
}
```

**효과:**

- 이전 데이터 유지로 깜빡임 방지
- 불필요한 refetch 방지
- 부드러운 사용자 경험

---

### 10.2 Zustand Store 구독 최적화

```typescript
// ❌ 잘못된 방법 (리렌더링 안 됨)
const value = store.getState().value;

// ✅ 올바른 방법 (리렌더링 됨)
const value = useStore(store, (state) => state.value);
```

**효과:**

- 필요한 부분만 리렌더링
- 성능 최적화

---

## 11. UX 개선 전략

### 11.1 로딩 상태 처리

**전략:**

1. 초기 로딩: 스켈레톤 UI 또는 스피너
2. 데이터 업데이트: 기존 데이터 위 오버레이 스피너
3. 부드러운 전환: opacity transition

**효과:**

- 깜빡임 최소화
- 사용자 경험 향상

---

## 12. 실제 프로젝트에서의 적용 사례

### 12.1 검색 기능 구현

**문제 상황:**

- 검색 조건 변경 시 깜빡임 발생
- 상태 변경이 UI에 반영되지 않음

**해결 방법:**

```typescript
// ❌ 문제: getState() 사용 시 리렌더링 안 됨
const searchName = store.getState().searchName;

// ✅ 해결: useStore 훅 사용
const searchName = useCustomerListStore((state) => state.searchName);
```

**결과:**

- 상태 변경 시 자동 리렌더링
- React Query 자동 refetch
- 부드러운 사용자 경험

---

### 12.2 로딩 상태 최적화

**문제 상황:**

- 데이터 로딩 중 화면 깜빡임
- 사용자가 빈 화면을 보게 됨

**해결 방법:**

```typescript
// React Query 설정
{
  keepPreviousData: true,  // 이전 데이터 유지
  staleTime: 30000,        // 캐시 시간 연장
}

// UI 구현
{isLoading && (
  <div className="absolute inset-0 bg-white bg-opacity-75">
    <LoadingSpinner />
  </div>
)}
<div className={isLoading ? 'opacity-50' : 'opacity-100 transition-opacity'}>
  {/* 기존 데이터 표시 */}
</div>
```

**결과:**

- 깜빡임 최소화
- 부드러운 전환 효과
- 사용자 경험 향상

---

### 12.3 타입 안정성 확보

**문제 상황:**

- API 응답 타입 불일치
- 런타임 에러 발생 가능

**해결 방법:**

```typescript
// 명확한 타입 정의
export interface ICustomer {
  id: number;
  name: string;
  count: number;
  totalAmount: number;
}

// 타입 안전한 API 클라이언트
const fetchCustomers = async (
  params: ICustomersReq
): Promise<ICustomersRes> => {
  // ...
};
```

**결과:**

- 컴파일 타임 에러 검출
- IDE 자동완성 지원
- 런타임 에러 감소

---

## 13. 트레이드오프 분석

### 13.1 Zustand vs Redux Toolkit

| 항목           | Zustand                    | Redux Toolkit |
| -------------- | -------------------------- | ------------- |
| 보일러플레이트 | 적음                       | 많음          |
| 학습 곡선      | 낮음                       | 중간          |
| DevTools       | 제한적                     | 우수          |
| 미들웨어       | 제한적                     | 풍부          |
| 번들 크기      | 작음                       | 큼            |
| **선택 이유**  | 간단한 프로젝트, 빠른 개발 | ✅            |

### 13.2 React Query vs SWR

| 항목          | React Query                    | SWR    |
| ------------- | ------------------------------ | ------ |
| 기능          | 풍부                           | 기본적 |
| 캐싱 전략     | 유연                           | 단순   |
| 학습 곡선     | 중간                           | 낮음   |
| 번들 크기     | 큼                             | 작음   |
| **선택 이유** | 고급 기능 필요, 캐싱 전략 중요 | ✅     |

### 13.3 Zod vs Yup

| 항목            | Zod                                   | Yup  |
| --------------- | ------------------------------------- | ---- |
| TypeScript 통합 | 우수                                  | 보통 |
| 타입 추론       | 자동                                  | 수동 |
| 런타임 성능     | 빠름                                  | 보통 |
| API             | 간단                                  | 복잡 |
| **선택 이유**   | TypeScript 프로젝트, 타입 안정성 중요 | ✅   |

---

## 14. 성능 최적화 전략

### 14.1 번들 크기 최적화

**전략:**

- Tree-shaking 활용 (ESM 모듈)
- 필요한 기능만 import
- 코드 스플리팅 (향후 적용)

**결과:**

- 초기 로딩 시간 단축
- 사용자 경험 향상

---

### 14.2 리렌더링 최적화

**전략:**

- Zustand 선택적 구독
- React Query 캐싱
- useMemo로 계산 결과 메모이제이션

**결과:**

- 불필요한 리렌더링 방지
- 성능 향상

---

## 15. 결론

### 선택한 기술 스택의 핵심 가치

1. **개발 속도**: Tailwind CSS, React Hook Form으로 빠른 개발
2. **타입 안정성**: TypeScript + Zod로 런타임/컴파일 타임 검증
3. **성능**: React Query 캐싱, Zustand 최적화
4. **사용자 경험**: 로딩 상태, 부드러운 전환 효과
5. **유지보수성**: 명확한 구조, 관심사 분리

### 프로젝트 특성에 맞는 선택

이 프로젝트는 **중소규모 대시보드 애플리케이션**으로, 다음 요구사항을 충족해야 했습니다:

1. **빠른 개발**: 24시간 내 완성 필요
2. **안정성**: 타입 안정성과 런타임 검증
3. **사용자 경험**: 부드러운 인터랙션, 로딩 상태 표시
4. **유지보수성**: 명확한 구조, 확장 가능성

선택한 기술 스택은 이러한 요구사항을 모두 만족하며, 특히:

- **Zustand**: 간단한 상태 관리로 빠른 개발
- **React Query**: 서버 상태 관리 자동화로 개발 시간 단축
- **TypeScript + Zod**: 타입 안정성으로 버그 예방
- **Tailwind CSS**: 빠른 스타일링으로 개발 속도 향상

### 향후 개선 가능한 부분

1. **테스트**: Jest + React Testing Library 추가
2. **접근성**: ARIA 속성, 키보드 네비게이션 강화
3. **성능 모니터링**: React DevTools Profiler 활용
4. **에러 바운더리**: React Error Boundary 추가
5. **코드 스플리팅**: React.lazy로 페이지별 코드 스플리팅
6. **E2E 테스트**: Playwright 또는 Cypress 추가

### 학습한 교훈

1. **상태 관리**: Zustand의 `getState()` vs `useStore()` 차이 이해
2. **React Query**: `keepPreviousData`로 UX 개선
3. **타입 안정성**: Zod로 런타임 검증과 타입 추론 동시에
4. **성능**: 불필요한 리렌더링 방지의 중요성
5. **사용자 경험**: 로딩 상태와 전환 효과의 중요성

---

## 참고 자료

- [Tailwind CSS 공식 문서](https://tailwindcss.com/docs)
- [TanStack Query 공식 문서](https://tanstack.com/query/latest)
- [Zustand 공식 문서](https://zustand-demo.pmnd.rs/)
- [React Hook Form 공식 문서](https://react-hook-form.com/)
- [ECharts 공식 문서](https://echarts.apache.org/)
