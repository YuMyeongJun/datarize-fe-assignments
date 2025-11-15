import { useViewModel } from '@/hooks/useViewModel'
import { useStore } from 'zustand'
import { PurchaseFrequencyViewModel } from './PurchaseFrequencyViewModel'
import dayjs from 'dayjs'

export const PurchaseFrequencyDatePicker = () => {
  // Zustand store 구독: 상태 변경 시 리렌더링됨
  const { store } = useViewModel(PurchaseFrequencyViewModel)
  const fromDate = useStore(store, (state) => state.fromDate)
  const toDate = useStore(store, (state) => state.toDate)
  const setFromDate = useStore(store, (state) => state.setFromDate)
  const setToDate = useStore(store, (state) => state.setToDate)

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setFromDate(date);
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : null;
    setToDate(date);
  };

  return (
    <div className="flex gap-4 items-end mb-6">
      <div className="flex flex-col">
        <label htmlFor="from-date" className="text-sm font-medium text-gray-700 mb-1">
          시작일
        </label>
        <input
          id="from-date"
          type="date"
          value={fromDate ? dayjs(fromDate).format('YYYY-MM-DD') : ''}
          onChange={handleFromDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="to-date" className="text-sm font-medium text-gray-700 mb-1">
          종료일
        </label>
        <input
          id="to-date"
          type="date"
          value={toDate ? dayjs(toDate).format('YYYY-MM-DD') : ''}
          onChange={handleToDateChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

