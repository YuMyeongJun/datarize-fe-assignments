import { createContext } from 'react'
import { createCustomerListStore } from './CustomerListStore'
import { CustomerListStore } from './CustomerListStore'

export interface ICustomerListViewModel {
  store: CustomerListStore
}

// eslint-disable-next-line react-refresh/only-export-components
export const CustomerListViewModel = createContext<ICustomerListViewModel | undefined>(undefined)

export const CustomerListViewModelProvider = ({
  children,
  initialState
}: {
  children: React.ReactNode
  initialState?: Partial<import('./CustomerListStore').ICustomerListStore>
}) => {
  const store = createCustomerListStore(initialState)

  return (
    <CustomerListViewModel.Provider value={{ store }}>{children}</CustomerListViewModel.Provider>
  )
}

