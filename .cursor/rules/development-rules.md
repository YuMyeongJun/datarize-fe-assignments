# 개발 룰 및 요구사항 명세서

## 프로젝트 개요

쇼핑몰 구매 데이터 대시보드 애플리케이션 개발

- 기간: 7월 한 달 동안의 구매 데이터 기반
- 기술 스택: React + TypeScript + Vite
- Node 버전: 20.13.1
- Yarn 버전: 1.22.22

## 기술 스택

### 필수 라이브러리

- **tailwindcss@3.4.17**: CSS 프레임워크
- **shadcn@2.3.0**: UI 컴포넌트 라이브러리
- **react-router-dom**: 라우팅
- **@tanstack/react-query**: 서버 상태 관리 및 데이터 페칭
- **zustand**: 전역 상태 관리
- **react-hook-form**: 폼 관리
- **@hookform/resolvers**: 폼 검증 리졸버
- **zod**: 스키마 검증 (yup 대신 사용)
- **dayjs**: 날짜/시간 처리
- **classnames**: 클래스명 조합 유틸리티
- **echarts + echarts-for-react**: 차트 라이브러리
- **react-toastify**: 토스트 메시지
- **react-loading-skeleton**: 로딩 스켈레톤 UI

## 제약 사항

- **`apps/backend` 폴더 내의 코드는 절대 수정 금지**
- 백엔드 API는 이미 구현되어 있으므로 프론트엔드에서만 개발

## 필수 기능 요구사항

### 1. 가격대별 구매 빈도 차트

**기능:**

- 한 달 동안의 구매 데이터를 바탕으로 가격대별 구매 빈도를 시각화
- 가격대 구분: 2만원 이하부터 10만원 이상까지 만원 단위
  - 0-20,000원
  - 20,001-30,000원
  - 30,001-40,000원
  - 40,001-50,000원
  - 50,001-60,000원
  - 60,001-70,000원
  - 70,001-80,000원
  - 80,001-90,000원
  - 90,001-100,000원
  - 100,000원 이상
- 차트 형태: 바 차트 (Bar Chart)
- 날짜 선택 기능: 시작일/종료일 선택으로 특정 기간 조회 가능
- 단일 날짜 조회 지원 (from과 to가 같은 날짜)

**API:**

- `GET /api/purchase-frequency`
  - 쿼리 파라미터 (optional):
    - `from`: 시작 날짜 (ISO 8601 형식)
    - `to`: 종료 날짜 (ISO 8601 형식)

### 2. 가장 많이 구매한 고객 목록 및 검색 기능

**기능:**

- 한 달 동안 가장 많이 구매한 고객 목록 표시
- 정렬 기능:
  - 기본 정렬: ID 오름차순
  - 구매 금액 순 정렬: 내림차순/오름차순 (sortBy 파라미터)
- 표시 정보:
  - 고객 ID
  - 고객 이름
  - 총 구매 횟수
  - 총 구매 금액
- 검색 기능: 고객 이름으로 검색 가능 (대소문자 구분 없음)

**API:**

- `GET /api/customers`
  - 쿼리 파라미터 (optional):
    - `sortBy`: 정렬 기준 ("asc" 또는 "desc" - 구매 금액 순)
    - `name`: 이름 검색 (부분 일치)

### 3. 고객 ID 기반 상세 기능

**기능:**

- 고객 목록의 특정 Row 클릭 시 해당 고객의 상세 구매 내역 표시
- 상세 정보 포함:
  - 구매 날짜
  - 구매한 제품 목록
  - 각 제품의 가격
  - 상품 썸네일 이미지

**API:**

- `GET /api/customers/{id}/purchases`
  - 경로 파라미터:
    - `id`: 고객 ID (숫자)

## 기술 요구사항

### 필수 구현 사항

1. **비동기 데이터 처리**

   - 모든 데이터는 클라이언트 사이드에서 비동기 요청으로 가져오기
   - fetch 또는 axios 등 HTTP 클라이언트 사용

2. **로딩 상태 처리**

   - 모든 데이터 요청에 대한 로딩 상태 표시
   - 로딩 중임을 사용자에게 명확히 알림

3. **에러 처리**

   - 모든 API 요청에 대한 에러 처리
   - 에러 발생 시 사용자에게 적절한 메시지 표시
   - 네트워크 에러, 404, 500 등 다양한 에러 상황 처리

4. **날짜 처리**
   - ISO 8601 형식으로 날짜 전송
   - 단일 날짜 조회 지원 (from과 to가 같은 값)

### 차트 라이브러리 (선택)

- Chart.js, Recharts, Victory 등 자유롭게 선택 가능

### 코드 스타일 및 품질 요구사항

#### 네이밍 규칙

- **컴포넌트명**: 파스칼 케이스 (예: `PurchaseFrequencyChart`)
- **변수명/함수명**: 카멜 케이스 (예: `getCustomerList`, `isLoading`)
- **인터페이스명**: `I` prefix 사용 (예: `ICustomerProps`)
- **폴더명**: 스네이크 케이스 (예: `customer_list`, `purchase_frequency`)

#### 코드 작성 규칙

- 함수형 프로그래밍 및 선언형 패턴 사용 (클래스 사용 금지)
- Arrow 함수 형태로 작성
- 조건문에 필수로 중괄호 사용
- 보조 동사를 포함한 설명적인 변수명 사용 (예: `isLoading`, `hasError`)
- 코드 중복을 피하고 반복 및 모듈화를 선호
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

#### 주석 및 문서화

- 코드의 가독성을 위해 적절한 주석 추가
- 복잡한 로직에는 설명 주석 필수
- 필요한 경우 유닛 테스트 작성

## API 응답 형식

### GET /api/purchase-frequency

```json
[
  { "range": "0 - 20000", "count": 10 },
  { "range": "20001 - 30000", "count": 5 },
  ...
]
```

### GET /api/customers

```json
[
  {
    "id": 1,
    "name": "고객명",
    "count": 15,
    "totalAmount": 500000
  },
  ...
]
```

### GET /api/customers/{id}/purchases

```json
[
  {
    "date": "2024-07-01T00:00:00.000Z",
    "quantity": 2,
    "product": "상품명",
    "price": 60000,
    "imgSrc": "/imgs/product.jpg"
  },
  ...
]
```

## 프로젝트 구조

### 필수 폴더 구조

```
apps/frontend/src/
├── assets/
│   ├── icons/              # 아이콘 파일들 (ic_*.png 형식)
│   └── index.ts            # 모든 에셋 export
├── components/
│   ├── common/             # 공통 컴포넌트
│   └── pages/
│       └── [페이지명]/     # 페이지별 컴포넌트 (스네이크 케이스)
│           ├── [페이지명].md
│           ├── [페이지명]Component.tsx
│           ├── [페이지명]ViewModel.tsx    # 페이지 단위 Provider
│           ├── [페이지명]Store.tsx        # 페이지 단위 Store
│           ├── use[모델명]Schema.ts       # 폼 zod 스키마
│           └── [페이지명][컴포넌트명].tsx
├── hooks/
│   ├── client/
│   │   └── [name]/
│   │       ├── use[name]Query.ts          # React Query 훅
│   │       └── use[name]Client.ts         # API 호출 로직
│   ├── providers/
│   │   └── [name]Provider.ts
│   └── use[name].ts
├── models/
│   ├── interface/
│   │   ├── req/
│   │   │   └── I[리퀘스트명]Req.ts
│   │   ├── res/
│   │   │   └── I[리스폰스명]Res.ts
│   │   └── dto/
│   │       └── I[dto명]Dto.ts
│   └── type/
│       └── [타입명]Type.ts
├── pages/
│   └── [페이지명]Page.tsx  # 페이지 진입점
├── routers/
├── store/                  # 전역 Store (필요시)
├── styles/
├── translations/           # 다국어 (필요시)
├── utils/
├── main.tsx
└── styles.css
```

### API 클라이언트 패턴

- `hooks/client/[name]/` 폴더 구조를 따릅니다
- `use[Name]Client.ts`: API 호출 로직
- 모든 API 요청/응답 타입은 `models/interface`에서 정의
  - `req/`: `I[RequestName]Req.ts`
  - `res/`: `I[ResponseName]Res.ts`
  - `dto/`: `I[DtoName]Dto.ts`

### 폼 처리 패턴

- `react-hook-form + @hookform/resolvers + zod` 조합 사용
- `use[ModelName]Schema.ts` 파일에서 zod 스키마 정의

### 상태 관리 패턴

- **전역 상태**: zustand 사용
- **페이지별 Store**: `create[PageName]Store` 함수로 생성
- **ViewModel 패턴**: `[PageName]ViewModel.tsx` 및 Provider 사용
- **공통 ViewModel 훅**: `hooks/useViewModel.ts`의 `useViewModel` 훅 사용
- 컴포넌트에서 `useViewModel`과 `useStore`를 직접 조합하여 사용

### Store 작성 패턴

```typescript
import { createStore } from 'zustand';

interface I[페이지명]Store {
  // ...
}

export type [페이지명]Store = ReturnType<typeof create[페이지명]Store>;

export const create[페이지명]Store = () => {
  return createStore<I[페이지명]Store>()((set) => ({
    // ...
  }));
};
```

### ViewModel 작성 패턴

```typescript
import { createContext } from 'react';
import { create[페이지명]Store, [페이지명]Store } from './[페이지명]Store';

export interface I[페이지명]ViewModel {
  store: [페이지명]Store;
}

// eslint-disable-next-line react-refresh/only-export-components
export const [페이지명]ViewModel = createContext<I[페이지명]ViewModel | undefined>(undefined);

export const [페이지명]ViewModelProvider = ({ children }: { children: React.ReactNode }) => {
  const store = create[페이지명]Store();

  return (
    <[페이지명]ViewModel.Provider value={{ store }}>
      {children}
    </[페이지명]ViewModel.Provider>
  );
};
```

### ViewModel 사용 패턴 (컴포넌트에서)

```typescript
import { useViewModel } from '@/hooks/useViewModel';
import { useStore } from 'zustand';
import { [페이지명]ViewModel } from './[페이지명]ViewModel';

export const [컴포넌트명] = () => {
  // ViewModel에서 store 가져오기
  const { store } = useViewModel([페이지명]ViewModel);

  // Zustand store에서 상태 구독
  const stateValue = useStore(store, (state) => state.value);
  const setValue = useStore(store, (state) => state.setValue);

  // ...
};
```

### 공통 useViewModel 훅

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

### Schema 작성 패턴

```typescript
export const use[모델명]Schema = () => {
  const { tv } = usePage();

  const schema = z.object({
    // ...
  });

  return schema;
};
```

## 테스트 작성 가이드

### 테스트 프레임워크

- **Jest**: 테스트 러너 및 어설션 라이브러리
- **React Testing Library**: React 컴포넌트 테스트
- **@testing-library/jest-dom**: DOM 매처 확장
- **@testing-library/user-event**: 사용자 이벤트 시뮬레이션

### 테스트 파일 구조

```
src/
├── utils/
│   └── __tests__/
│       └── dateUtils.test.ts
├── hooks/
│   └── client/
│       └── [name]/
│           └── __tests__/
│               └── use[name]Client.test.ts
└── components/
    └── pages/
        └── [페이지명]/
            └── __tests__/
                └── [컴포넌트명].test.tsx
```

### 테스트 작성 패턴

#### 유닛 테스트 예시 (유틸리티 함수)

```typescript
import { formatToISO8601, isValidDateRange } from "../dateUtils";

describe("dateUtils", () => {
  describe("formatToISO8601", () => {
    it("날짜를 ISO 8601 형식으로 변환해야 함", () => {
      const date = new Date("2024-07-15T10:30:00");
      const result = formatToISO8601(date);
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
    });
  });
});
```

#### API 클라이언트 테스트 예시

```typescript
import { usePurchaseFrequencyClient } from "../usePurchaseFrequencyClient";

describe("usePurchaseFrequencyClient", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it("데이터를 성공적으로 가져와야 함", async () => {
    const mockData = [{ range: "0 - 20000", count: 10 }];
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { fetchPurchaseFrequency } = usePurchaseFrequencyClient();
    const result = await fetchPurchaseFrequency({
      from: "2024-07-01",
      to: "2024-07-31",
    });

    expect(result).toEqual(mockData);
  });
});
```

#### 컴포넌트 테스트 예시

```typescript
import { render } from "@testing-library/react";
import { PurchaseFrequencyChart } from "../PurchaseFrequencyChart";
import { IPurchaseFrequencyItem } from "@/models/interface/res/IPurchaseFrequencyRes";

describe("PurchaseFrequencyChart", () => {
  const mockData: IPurchaseFrequencyItem[] = [
    { range: "0 - 20000", count: 10 },
  ];

  it("로딩 중일 때 스피너를 표시해야 함", () => {
    const { container } = render(
      <PurchaseFrequencyChart data={[]} isLoading={true} />
    );
    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toBeInTheDocument();
  });

  it("데이터가 있을 때 차트를 표시해야 함", () => {
    const { container } = render(
      <PurchaseFrequencyChart data={mockData} isLoading={false} />
    );
    const chartContainer = container.querySelector(".w-full.bg-white");
    expect(chartContainer).toBeInTheDocument();
  });
});
```

### 테스트 작성 원칙

1. **명확한 테스트 이름**: 테스트가 무엇을 검증하는지 명확히 표현
2. **단일 책임**: 각 테스트는 하나의 동작만 검증
3. **AAA 패턴**: Arrange (준비), Act (실행), Assert (검증)
4. **Mock 사용**: 외부 의존성은 Mock으로 처리
5. **커버리지**: 중요한 비즈니스 로직은 테스트 커버리지 확보

### 테스트 실행 명령어

```bash
# 모든 테스트 실행
yarn test

# Watch 모드로 실행
yarn test:watch

# 커버리지 리포트 생성
yarn test:coverage
```

### Jest 설정

- **테스트 환경**: `jsdom` (브라우저 환경 시뮬레이션)
- **경로 별칭**: `@/` → `src/` 매핑
- **CSS 모킹**: `identity-obj-proxy` 사용
- **파일 확장자**: `.ts`, `.tsx`, `.js`, `.jsx` 지원
- **테스트 파일 패턴**: `**/__tests__/**/*.(ts|tsx)`, `**/*.(test|spec).(ts|tsx)`

### 테스트 작성 체크리스트

- [ ] 유틸리티 함수에 대한 유닛 테스트 작성
- [ ] API 클라이언트에 대한 테스트 작성 (성공/실패 케이스)
- [ ] 주요 컴포넌트에 대한 렌더링 테스트 작성
- [ ] 사용자 인터랙션 테스트 작성 (필요시)
- [ ] 에러 처리 테스트 작성
- [ ] 로딩 상태 테스트 작성

## 실행 방법

```bash
cd apps
yarn install
yarn start-server  # 백엔드 서버 시작 (포트 4000)
yarn start-client   # 프론트엔드 개발 서버 시작
yarn test          # 테스트 실행
```
