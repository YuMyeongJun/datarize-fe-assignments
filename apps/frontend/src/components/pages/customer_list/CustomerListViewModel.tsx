import { createContext } from 'react'
import { createCustomerListStore } from './CustomerListStore'
import { CustomerListStore } from './CustomerListStore'

export interface ICustomerListViewModel {
  store: CustomerListStore
}

// eslint-disable-next-line react-refresh/only-export-components
export const CustomerListViewModel = createContext<ICustomerListViewModel | undefined>(undefined)

export const CustomerListViewModelProvider = ({ children }: { children: React.ReactNode }) => {
  const store = createCustomerListStore()

  return (
    <CustomerListViewModel.Provider value={{ store }}>{children}</CustomerListViewModel.Provider>
  )
}

