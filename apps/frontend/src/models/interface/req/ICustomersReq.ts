/**
 * 고객 목록 조회 요청 타입
 */
export interface ICustomersReq {
  sortBy?: 'asc' | 'desc'; // 구매 금액 순 정렬
  name?: string; // 이름 검색
}

