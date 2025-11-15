import { createContext } from 'react'
import { createPurchaseFrequencyStore } from './PurchaseFrequencyStore'
import { PurchaseFrequencyStore } from './PurchaseFrequencyStore'

export interface IPurchaseFrequencyViewModel {
  store: PurchaseFrequencyStore
}

// eslint-disable-next-line react-refresh/only-export-components
export const PurchaseFrequencyViewModel = createContext<IPurchaseFrequencyViewModel | undefined>(
  undefined
)

export const PurchaseFrequencyViewModelProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const store = createPurchaseFrequencyStore()

  return (
    <PurchaseFrequencyViewModel.Provider value={{ store }}>
      {children}
    </PurchaseFrequencyViewModel.Provider>
  )
}

