import { ICustomer } from '@/models/interface/res/ICustomersRes'
import { useViewModel } from '@/hooks/useViewModel'
import { useStore } from 'zustand'
import { CustomerListViewModel } from './CustomerListViewModel'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import Skeleton from 'react-loading-skeleton'
import classNames from 'classnames'

export interface ICustomerListTableProps {
  customers: ICustomer[]
  isLoading: boolean
}

export const CustomerListTable = ({ customers, isLoading }: ICustomerListTableProps) => {
  // Zustand store 구독: 상태 변경 시 리렌더링됨
  const { store } = useViewModel(CustomerListViewModel)
  const setSelectedCustomerId = useStore(store, (state) => state.setSelectedCustomerId)

  const handleRowClick = (customerId: number) => {
    setSelectedCustomerId(customerId);
  };

  // 초기 로딩 (데이터가 없을 때)
  if (isLoading && customers.length === 0) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <div className="space-y-2">
          <Skeleton height={50} count={5} className="mb-2" />
        </div>
      </div>
    );
  }

  if (customers.length === 0 && !isLoading) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center py-8 text-gray-500">검색 결과가 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
          <LoadingSpinner size="lg" />
        </div>
      )}
      <div className={classNames('max-h-[500px] overflow-y-auto opacity-100 transition-opacity duration-300', { 'opacity-50': isLoading })}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                이름
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                총 구매 횟수
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                총 구매 금액
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => {
                  handleRowClick(customer.id);
                }}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.count}회
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {customer.totalAmount.toLocaleString()}원
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

