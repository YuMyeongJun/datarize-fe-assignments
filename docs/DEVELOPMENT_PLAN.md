# 개발 계획서

## 프로젝트 개요
쇼핑몰 구매 데이터 대시보드 애플리케이션 개발

## 개발 단계별 계획

### Phase 0: 프로젝트 초기 설정 (1단계)
**목표**: 개발 환경 구축 및 필수 라이브러리 설치

#### 작업 내용
1. **필수 라이브러리 설치**
   ```bash
   # 라우팅
   yarn add react-router react-router-dom
   
   # CSS 및 UI
   yarn add tailwindcss@3.4.17 postcss autoprefixer
   yarn add -D @types/node
   # shadcn/ui 초기화 필요
   
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

2. **Tailwind CSS 설정**
   - `tailwind.config.js` 생성
   - `postcss.config.js` 생성
   - `index.css`에 Tailwind 디렉티브 추가

3. **Shadcn UI 초기화**
   - `components.json` 생성
   - 필요한 컴포넌트 설치 (Button, Table, Dialog, Input, Calendar 등)

4. **프로젝트 구조 생성**
   ```
   src/
   ├── assets/
   │   ├── icons/
   │   └── index.ts
   ├── components/
   │   ├── common/
   │   └── pages/
   │       ├── purchase_frequency/
   │       └── customer_list/
   ├── hooks/
   │   └── client/
   │       ├── purchase_frequency/
   │       └── customers/
   ├── models/
   │   └── interface/
   │       ├── req/
   │       ├── res/
   │       └── dto/
   ├── pages/
   ├── routers/
   ├── utils/
   └── styles/
   ```

5. **Provider 설정**
   - React Query Provider
   - React Router 설정
   - Toastify Container

**예상 소요 시간**: 30분

---

### Phase 1: 타입 정의 및 API 클라이언트 (2단계)
**목표**: API 타입 정의 및 클라이언트 함수 구현

#### 작업 내용
1. **타입 정의 파일 생성**
   - `models/interface/req/IPurchaseFrequencyReq.ts`
   - `models/interface/req/ICustomersReq.ts`
   - `models/interface/res/IPurchaseFrequencyRes.ts`
   - `models/interface/res/ICustomersRes.ts`
   - `models/interface/res/ICustomerPurchasesRes.ts`

2. **API 클라이언트 구현**
   - `hooks/client/purchase_frequency/usePurchaseFrequencyClient.ts`
   - `hooks/client/purchase_frequency/usePurchaseFrequencyQuery.ts`
   - `hooks/client/customers/useCustomersClient.ts`
   - `hooks/client/customers/useCustomersQuery.ts`
   - `hooks/client/customers/useCustomerPurchasesClient.ts`
   - `hooks/client/customers/useCustomerPurchasesQuery.ts`

3. **유틸리티 함수**
   - `utils/dateUtils.ts` (dayjs 헬퍼 함수)
   - `utils/apiUtils.ts` (API 에러 처리)

**예상 소요 시간**: 1시간

---

### Phase 2: 가격대별 구매 빈도 차트 (3단계)
**목표**: 날짜 필터링이 가능한 바 차트 구현

#### 작업 내용
1. **페이지 구조 생성**
   - `pages/PurchaseFrequencyPage.tsx`
   - `components/pages/purchase_frequency/` 폴더 생성

2. **Store 및 ViewModel**
   - `PurchaseFrequencyStore.tsx` (날짜 범위 상태)
   - `PurchaseFrequencyViewModel.tsx` (Provider)

3. **컴포넌트 구현**
   - `PurchaseFrequencyComponent.tsx` (메인 컴포넌트)
   - `PurchaseFrequencyDatePicker.tsx` (날짜 선택)
   - `PurchaseFrequencyChart.tsx` (echarts 바 차트)

4. **기능 구현**
   - 날짜 선택 (시작일/종료일)
   - 단일 날짜 조회 지원
   - API 연동 및 데이터 가공
   - 로딩 상태 (react-loading-skeleton)
   - 에러 처리 (react-toastify)

**예상 소요 시간**: 2-3시간

---

### Phase 3: 고객 목록 및 검색 (4단계)
**목표**: 정렬 및 검색 기능이 있는 고객 목록 테이블

#### 작업 내용
1. **페이지 구조 생성**
   - `pages/CustomerListPage.tsx`
   - `components/pages/customer_list/` 폴더 생성

2. **Store 및 ViewModel**
   - `CustomerListStore.tsx` (검색어, 정렬 상태)
   - `CustomerListViewModel.tsx` (Provider)

3. **폼 스키마**
   - `useCustomerSearchSchema.ts` (zod 검증)

4. **컴포넌트 구현**
   - `CustomerListComponent.tsx` (메인 컴포넌트)
   - `CustomerListTable.tsx` (Shadcn UI Table)
   - `CustomerSearchForm.tsx` (검색 폼)
   - `CustomerSortButton.tsx` (정렬 버튼)

5. **기능 구현**
   - 고객 목록 표시 (ID, 이름, 구매 횟수, 구매 금액)
   - 이름 검색 기능
   - 정렬 기능 (ID 기본, 구매 금액 asc/desc)
   - Row 클릭 이벤트 (상세 모달 열기)
   - 로딩 상태
   - 에러 처리

**예상 소요 시간**: 2-3시간

---

### Phase 4: 고객 상세 구매 내역 (5단계)
**목표**: Row 클릭 시 상세 구매 내역 모달 표시

#### 작업 내용
1. **모달 컴포넌트**
   - `CustomerDetailModal.tsx` (Shadcn UI Dialog)

2. **구매 내역 리스트**
   - `CustomerPurchaseList.tsx` (구매 내역 아이템)
   - `CustomerPurchaseItem.tsx` (개별 구매 아이템)

3. **기능 구현**
   - 모달 열림/닫힘 상태 관리
   - 선택된 고객 ID로 구매 내역 조회
   - 구매 날짜 포맷팅 (dayjs)
   - 상품 썸네일 이미지 표시
   - 이미지 로딩 에러 처리
   - 로딩 상태
   - 에러 처리

**예상 소요 시간**: 1-2시간

---

### Phase 5: 라우팅 및 통합 (6단계)
**목표**: 전체 애플리케이션 통합 및 라우팅 설정

#### 작업 내용
1. **라우팅 설정**
   - `routers/index.tsx` (라우트 정의)
   - 메인 레이아웃 구성

2. **네비게이션**
   - 상단 네비게이션 바 (페이지 이동)

3. **통합 테스트**
   - 모든 기능 통합 확인
   - 에러 케이스 테스트
   - 로딩 상태 일관성 확인

4. **최종 정리**
   - 코드 리팩토링
   - 주석 추가
   - README 업데이트

**예상 소요 시간**: 1-2시간

---

## 전체 예상 소요 시간
**총 8-12시간**

## 우선순위
1. ✅ Phase 0: 프로젝트 초기 설정 (필수)
2. ✅ Phase 1: 타입 정의 및 API 클라이언트 (필수)
3. ✅ Phase 2: 가격대별 구매 빈도 차트 (핵심 기능)
4. ✅ Phase 3: 고객 목록 및 검색 (핵심 기능)
5. ✅ Phase 4: 고객 상세 구매 내역 (핵심 기능)
6. ✅ Phase 5: 라우팅 및 통합 (완성)

## 체크리스트

### 기능 체크리스트
- [ ] 가격대별 구매 빈도 차트 표시
- [ ] 날짜 선택으로 기간 필터링
- [ ] 단일 날짜 조회 가능
- [ ] 고객 목록 표시
- [ ] 고객 이름 검색
- [ ] 정렬 기능 (ID 기본, 구매 금액 asc/desc)
- [ ] 고객 Row 클릭 시 상세 내역 표시
- [ ] 상세 내역에 모든 정보 표시 (날짜, 제품, 가격, 썸네일)

### 품질 체크리스트
- [ ] 모든 API 호출에 로딩 상태
- [ ] 모든 에러 상황 처리
- [ ] TypeScript 타입 완전성
- [ ] 코드 주석 추가
- [ ] 컴포넌트 적절한 분리
- [ ] 반응형 디자인

## 개선 사항 (추후 논의)
1. 성능 최적화 (React.memo, useMemo 등)
2. 접근성 개선 (ARIA 속성, 키보드 네비게이션)
3. 테스트 코드 작성
4. 에러 바운더리 추가
5. 다크모드 지원 (선택)

