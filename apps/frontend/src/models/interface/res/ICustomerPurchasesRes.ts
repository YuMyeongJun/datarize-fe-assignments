/**
 * 고객 구매 내역 조회 응답 타입
 */
export interface ICustomerPurchase {
  date: string; // ISO 8601 형식
  quantity: number;
  product: string;
  price: number;
  imgSrc: string; // 이미지 경로
}

export type ICustomerPurchasesRes = ICustomerPurchase[];

