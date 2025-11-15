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

export const createCustomerListStore = () => {
  return createStore<ICustomerListStore>()((set) => ({
    searchName: '',
    sortBy: 'id',
    selectedCustomerId: null,
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

