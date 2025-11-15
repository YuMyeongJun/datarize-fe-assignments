import { useViewModel } from '@/hooks/useViewModel'
import { useStore } from 'zustand'
import { CustomerListViewModel } from './CustomerListViewModel'
import { useCustomerPurchasesQuery } from '@/hooks/client/customers/useCustomerPurchasesQuery'
import { formatDate } from '@/utils/dateUtils'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'

export const CustomerDetailModal = () => {
  // Zustand store 구독: 상태 변경 시 리렌더링됨
  const { store } = useViewModel(CustomerListViewModel)
  const selectedCustomerId = useStore(store, (state) => state.selectedCustomerId)
  const setSelectedCustomerId = useStore(store, (state) => state.setSelectedCustomerId)

  const { data, isLoading, isError } = useCustomerPurchasesQuery(selectedCustomerId);

  if (!selectedCustomerId) {
    return null;
  }

  const handleClose = () => {
    setSelectedCustomerId(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-xl font-bold">고객 구매 내역</h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* 컨텐츠 */}
        <div className="flex-1 overflow-y-auto p-6 relative">
          {isLoading && !data ? (
            <div className="flex items-center justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : isError ? (
            <div className="text-center py-8 text-red-500">
              데이터를 불러오는 중 오류가 발생했습니다.
            </div>
          ) : data && Array.isArray(data) && data.length > 0 ? (
            <>
              {isLoading && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
                  <LoadingSpinner size="lg" />
                </div>
              )}
              <div
                className={`space-y-4 ${isLoading ? 'opacity-50' : 'opacity-100 transition-opacity duration-300'
                  }`}
              >
                {data.map((purchase, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      {/* 이미지 */}
                      <div className="flex-shrink-0">
                        <img
                          src={`http://localhost:4000${purchase.imgSrc}`}
                          alt={purchase.product}
                          className="w-24 h-24 object-cover rounded-md"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://via.placeholder.com/100?text=No+Image';
                          }}
                        />
                      </div>

                      {/* 정보 */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-2">{purchase.product}</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>
                            <span className="font-medium">구매일:</span>{' '}
                            {formatDate(purchase.date, 'YYYY-MM-DD HH:mm')}
                          </p>
                          <p>
                            <span className="font-medium">수량:</span> {purchase.quantity}개
                          </p>
                          <p>
                            <span className="font-medium">가격:</span>{' '}
                            {purchase.price.toLocaleString()}원
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">구매 내역이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
};

