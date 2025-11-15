import { IPurchaseFrequencyReq } from '@/models/interface/req/IPurchaseFrequencyReq';
import { IPurchaseFrequencyRes } from '@/models/interface/res/IPurchaseFrequencyRes';
import { handleApiError } from '@/utils/apiUtils';

const API_BASE_URL = 'http://localhost:4000';

/**
 * 구매 빈도 조회 API 클라이언트
 */
export const usePurchaseFrequencyClient = () => {
  const fetchPurchaseFrequency = async (
    params: IPurchaseFrequencyReq
  ): Promise<IPurchaseFrequencyRes> => {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.from) {
        queryParams.append('from', params.from);
      }
      if (params.to) {
        queryParams.append('to', params.to);
      }

      const url = `${API_BASE_URL}/api/purchase-frequency${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: IPurchaseFrequencyRes = await response.json();
      return data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(apiError.message);
    }
  };

  return { fetchPurchaseFrequency };
};

