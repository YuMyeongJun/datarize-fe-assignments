import { createStore } from 'zustand';

export interface ICustomerListStore {
  searchName: string;
  sortBy: 'id' | 'asc' | 'desc';
  selectedCustomerId: number | null;
  setSearchName: (name: string) => void;
  setSortBy: (sortBy: 'id' | 'asc' | 'desc') => void;
  setSelectedCustomerId: (id: number | null) => void;
}

export type CustomerListStore = ReturnType<typeof createCustomerListStore>;

export const createCustomerListStore = (initialState?: Partial<ICustomerListStore>) => {
  return createStore<ICustomerListStore>()((set) => ({
    searchName: initialState?.searchName ?? '',
    sortBy: initialState?.sortBy ?? 'id',
    selectedCustomerId: initialState?.selectedCustomerId ?? null,
    setSearchName: (name) => {
      set({ searchName: name });
    },
    setSortBy: (sortBy) => {
      set({ sortBy });
    },
    setSelectedCustomerId: (id) => {
      set({ selectedCustomerId: id });
    },
  }));
};

