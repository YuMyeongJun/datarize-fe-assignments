import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCustomerPurchasesQuery } from '../useCustomerPurchasesQuery'
import { useCustomerPurchasesClient } from '../useCustomerPurchasesClient'
import { ReactNode } from 'react'
import React from 'react'

// fetch 모킹
global.fetch = jest.fn()

// useCustomerPurchasesClient 모킹
jest.mock('../useCustomerPurchasesClient')

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return ({ children }: { children: ReactNode }) => {
    return React.createElement(QueryClientProvider, { client: queryClient }, children)
  }
}

describe('useCustomerPurchasesQuery', () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
    ;(useCustomerPurchasesClient as jest.Mock).mockReturnValue({
      fetchCustomerPurchases: jest.fn(),
    })
  })

  it('customerId가 null이면 쿼리가 비활성화되어야 함', () => {
    const { result } = renderHook(() => useCustomerPurchasesQuery(null), {
      wrapper: createWrapper(),
    })

    expect(result.current.isFetching).toBe(false)
    // enabled는 useQuery의 내부 속성이므로 직접 접근 불가
    // 대신 데이터가 없고 로딩도 안 되는지 확인
    expect(result.current.data).toBeUndefined()
  })

  it('customerId가 0이면 쿼리가 비활성화되어야 함', () => {
    const { result } = renderHook(() => useCustomerPurchasesQuery(0), {
      wrapper: createWrapper(),
    })

    expect(result.current.isFetching).toBe(false)
    expect(result.current.data).toBeUndefined()
  })

  it('유효한 customerId일 때 쿼리가 활성화되어야 함', async () => {
    const mockData = [
      {
        date: '2024-07-01T00:00:00.000Z',
        quantity: 2,
        product: '상품1',
        price: 60000,
        imgSrc: '/imgs/product1.jpg',
      },
    ]

    const mockFetch = jest.fn().mockResolvedValue(mockData)
    ;(useCustomerPurchasesClient as jest.Mock).mockReturnValue({
      fetchCustomerPurchases: mockFetch,
    })

    const { result } = renderHook(() => useCustomerPurchasesQuery(1), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true)
    })

    expect(result.current.data).toEqual(mockData)
  })
})

