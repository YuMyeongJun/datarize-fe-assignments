import { Context, useContext } from 'react'

/**
 * 공통 ViewModel 훅
 * @param viewModel - React Context
 * @returns Context value
 * @throws Error if used outside Provider
 */
export const useViewModel = <T>(viewModel: Context<T | undefined>): T => {
  const context = useContext(viewModel)
  if (!context) {
    throw new Error(`useViewModel: Provider를 감싸줘야 합니다.`)
  }
  return context
}
