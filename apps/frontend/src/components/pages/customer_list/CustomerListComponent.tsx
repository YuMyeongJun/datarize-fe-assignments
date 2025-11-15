import { useViewModel } from '@/hooks/useViewModel'
import { useStore } from 'zustand'
import { CustomerListViewModel } from './CustomerListViewModel'
import { CustomerSearchForm } from './CustomerSearchForm'
import { CustomerSortButton } from './CustomerSortButton'
import { CustomerListTable } from './CustomerListTable'
import { CustomerDetailModal } from './CustomerDetailModal'
import { useCustomersQuery } from '@/hooks/client/customers/useCustomersQuery'
import { toast } from 'react-toastify'
import { useMemo, useEffect } from 'react'

export const CustomerListComponent = () => {
  // Zustand store 구독: 상태 변경 시 리렌더링됨
  const { store } = useViewModel(CustomerListViewModel)
  const searchName = useStore(store, (state) => state.searchName)
  const sortBy = useStore(store, (state) => state.sortBy)

  // sortBy가 'id'일 때는 sortBy 파라미터를 보내지 않음 (기본 정렬)
  const queryParams = useMemo(() => {
    const params: { sortBy?: 'asc' | 'desc'; name?: string } = {};
    if (sortBy !== 'id') {
      params.sortBy = sortBy;
    }
    if (searchName) {
      params.name = searchName;
    }
    return params;
  }, [sortBy, searchName]);

  const { data, isLoading, isError, error } = useCustomersQuery(queryParams);

  // 에러 처리: useEffect로 한 번만 표시
  useEffect(() => {
    if (isError) {
      toast.error(error instanceof Error ? error.message : '데이터를 불러오는 중 오류가 발생했습니다.');
    }
  }, [isError, error]);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6">고객 목록</h2>
      <CustomerSearchForm />
      <CustomerSortButton />
      <CustomerListTable customers={data || []} isLoading={isLoading} />
      <CustomerDetailModal />
    </div>
  );
};

