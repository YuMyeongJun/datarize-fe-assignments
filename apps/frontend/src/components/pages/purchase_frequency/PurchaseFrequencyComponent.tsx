import { useViewModel } from '@/hooks/useViewModel'
import { useStore } from 'zustand'
import { PurchaseFrequencyViewModel } from './PurchaseFrequencyViewModel'
import { PurchaseFrequencyDatePicker } from './PurchaseFrequencyDatePicker'
import { PurchaseFrequencyChart } from './PurchaseFrequencyChart'
import { usePurchaseFrequencyQuery } from '@/hooks/client/purchase_frequency/usePurchaseFrequencyQuery'
import { formatToISO8601 } from '@/utils/dateUtils'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const PurchaseFrequencyComponent = () => {
  // Zustand store 구독: 상태 변경 시 리렌더링됨
  const { store } = useViewModel(PurchaseFrequencyViewModel)
  const fromDate = useStore(store, (state) => state.fromDate)
  const toDate = useStore(store, (state) => state.toDate)

  const { data, isLoading, isError, error } = usePurchaseFrequencyQuery({
    from: fromDate ? formatToISO8601(fromDate) : undefined,
    to: toDate ? formatToISO8601(toDate) : undefined,
  });

  // 에러 처리: useEffect로 한 번만 표시
  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    }
  }, [isError, error]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">가격대별 구매 빈도</h2>
      <PurchaseFrequencyDatePicker />
      <PurchaseFrequencyChart data={data || []} isLoading={isLoading} />
    </div>
  );
};

