import { useQuery } from '@tanstack/react-query';
import { useCustomerPurchasesClient } from './useCustomerPurchasesClient';

/**
 * 고객 구매 내역 조회 React Query 훅
 */
export const useCustomerPurchasesQuery = (customerId: number | null) => {
  const { fetchCustomerPurchases } = useCustomerPurchasesClient();

  return useQuery({
    queryKey: ['customer-purchases', customerId],
    queryFn: () => fetchCustomerPurchases(customerId!),
    enabled: customerId !== null && customerId > 0, // customerId가 유효할 때만 실행
  });
};

