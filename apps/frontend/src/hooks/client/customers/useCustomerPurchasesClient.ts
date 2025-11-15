import { ICustomerPurchasesRes } from '@/models/interface/res/ICustomerPurchasesRes';
import { handleApiError } from '@/utils/apiUtils';

const API_BASE_URL = 'http://localhost:4000';

/**
 * 고객 구매 내역 조회 API 클라이언트
 */
export const useCustomerPurchasesClient = () => {
  const fetchCustomerPurchases = async (customerId: number): Promise<ICustomerPurchasesRes> => {
    try {
      const url = `${API_BASE_URL}/api/customers/${customerId}/purchases`;

      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: ICustomerPurchasesRes = await response.json();
      return data;
    } catch (error) {
      const apiError = handleApiError(error);
      throw new Error(apiError.message);
    }
  };

  return { fetchCustomerPurchases };
};

