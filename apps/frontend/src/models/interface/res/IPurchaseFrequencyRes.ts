/**
 * 구매 빈도 조회 응답 타입
 */
export interface IPurchaseFrequencyItem {
  range: string; // 예: "0 - 20000"
  count: number;
}

export type IPurchaseFrequencyRes = IPurchaseFrequencyItem[];

