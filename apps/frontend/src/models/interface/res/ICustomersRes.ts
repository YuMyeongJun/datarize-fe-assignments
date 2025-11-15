/**
 * 고객 목록 조회 응답 타입
 */
export interface ICustomer {
  id: number;
  name: string;
  count: number; // 총 구매 횟수
  totalAmount: number; // 총 구매 금액
}

export type ICustomersRes = ICustomer[];

