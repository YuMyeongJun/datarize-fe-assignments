import { useQuery } from '@tanstack/react-query';
import { usePurchaseFrequencyClient } from './usePurchaseFrequencyClient';
import { IPurchaseFrequencyReq } from '@/models/interface/req/IPurchaseFrequencyReq';

/**
 * 구매 빈도 조회 React Query 훅
 */
export const usePurchaseFrequencyQuery = (params: IPurchaseFrequencyReq) => {
  const { fetchPurchaseFrequency } = usePurchaseFrequencyClient();

  return useQuery({
    queryKey: ['purchase-frequency', params],
    queryFn: () => fetchPurchaseFrequency(params),
    enabled: !!(params.from && params.to), // from과 to가 모두 있을 때만 실행
  });
};

