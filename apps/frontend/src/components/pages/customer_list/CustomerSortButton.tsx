import { useViewModel } from '@/hooks/useViewModel'
import { useStore } from 'zustand'
import { CustomerListViewModel } from './CustomerListViewModel'

export const CustomerSortButton = () => {
  // Zustand store 구독: 상태 변경 시 리렌더링됨
  const { store } = useViewModel(CustomerListViewModel)
  const sortBy = useStore(store, (state) => state.sortBy)
  const setSortBy = useStore(store, (state) => state.setSortBy)

  const handleSortChange = (newSortBy: 'id' | 'asc' | 'desc') => {
    setSortBy(newSortBy);
  };

  return (
    <div className="mb-4 flex gap-2">
      <button
        onClick={() => {
          handleSortChange('id');
        }}
        className={`px-4 py-2 rounded-md ${sortBy === 'id'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
      >
        ID 순
      </button>
      <button
        onClick={() => {
          handleSortChange('asc');
        }}
        className={`px-4 py-2 rounded-md ${sortBy === 'asc'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
      >
        구매 금액 ↑
      </button>
      <button
        onClick={() => {
          handleSortChange('desc');
        }}
        className={`px-4 py-2 rounded-md ${sortBy === 'desc'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
      >
        구매 금액 ↓
      </button>
    </div>
  );
};

