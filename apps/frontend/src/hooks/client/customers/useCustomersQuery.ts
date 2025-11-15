import { useQuery } from '@tanstack/react-query';
import { useCustomersClient } from './useCustomersClient';
import { ICustomersReq } from '@/models/interface/req/ICustomersReq';

/**
 * 고객 목록 조회 React Query 훅
 */
export const useCustomersQuery = (params: ICustomersReq = {}) => {
  const { fetchCustomers } = useCustomersClient();

  return useQuery({
    queryKey: ['customers', params],
    queryFn: () => fetchCustomers(params),
  });
};

