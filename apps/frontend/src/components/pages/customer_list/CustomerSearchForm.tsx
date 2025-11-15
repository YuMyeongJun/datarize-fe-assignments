import { useViewModel } from '@/hooks/useViewModel'
import { useStore } from 'zustand'
import { CustomerListViewModel } from './CustomerListViewModel'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useEffect } from 'react'

const searchSchema = z.object({
  name: z.string().optional(),
})

type SearchFormData = z.infer<typeof searchSchema>

export const CustomerSearchForm = () => {
  // Zustand store 구독: 상태 변경 시 리렌더링됨
  const { store } = useViewModel(CustomerListViewModel)
  const searchName = useStore(store, (state) => state.searchName)
  const setSearchName = useStore(store, (state) => state.setSearchName)

  const { register, handleSubmit, reset } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      name: searchName,
    },
  });

  // store의 searchName이 변경되면 폼도 업데이트
  useEffect(() => {
    reset({ name: searchName });
  }, [searchName, reset]);

  const onSubmit = (data: SearchFormData) => {
    setSearchName(data.name || '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="flex gap-2">
        <input
          {...register('name')}
          type="text"
          placeholder="고객 이름으로 검색..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          검색
        </button>
      </div>
    </form>
  );
};

