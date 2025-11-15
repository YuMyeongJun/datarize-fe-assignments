import { createStore } from 'zustand';
import dayjs from 'dayjs';

export interface IPurchaseFrequencyStore {
  fromDate: Date | null;
  toDate: Date | null;
  setFromDate: (date: Date | null) => void;
  setToDate: (date: Date | null) => void;
  resetDates: () => void;
}

export type PurchaseFrequencyStore = ReturnType<typeof createPurchaseFrequencyStore>;

export const createPurchaseFrequencyStore = () => {
  // 기본값: 7월 1일 ~ 7월 31일
  const defaultFrom = dayjs('2024-07-01').toDate();
  const defaultTo = dayjs('2024-07-31').toDate();

  return createStore<IPurchaseFrequencyStore>()((set) => ({
    fromDate: defaultFrom,
    toDate: defaultTo,
    setFromDate: (date) => {
      set({ fromDate: date });
    },
    setToDate: (date) => {
      set({ toDate: date });
    },
    resetDates: () => {
      set({
        fromDate: defaultFrom,
        toDate: defaultTo,
      });
    },
  }));
};

