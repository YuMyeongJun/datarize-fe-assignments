import { ICustomersReq } from '@/models/interface/req/ICustomersReq';
import { ICustomersRes } from '@/models/interface/res/ICustomersRes';
import { handleApiError } from '@/utils/apiUtils';

const API_BASE_URL = 'http://localhost:4000';

/**
 * 고객 목록 조회 API 클라이언트
 */
export const useCustomersClient = () => {
  const fetchCustomers = async (params: ICustomersReq = {}): Promise<ICustomersRes> => {
    try {
      const queryParams = new URLSearchParams();

      if (params.sortBy) {
        queryParams.append('sortBy', params.sortBy);
      }
      if (params.name) {
        queryParams.append('name', params.name);
      }

      const url = `${API_BASE_URL}/api/customers${
        queryParams.toString() ? `?${queryParams.toString()}` : ''
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: ICustomersRes = await response.json();
      return data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(apiError.message);
    }
  };

  return { fetchCustomers };
};

