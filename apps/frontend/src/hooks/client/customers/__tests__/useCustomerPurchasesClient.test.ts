/* eslint-disable no-extra-semi */
import { useCustomerPurchasesClient } from '../useCustomerPurchasesClient'

// fetch 모킹
global.fetch = jest.fn()

describe('useCustomerPurchasesClient', () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it('고객 구매 내역 데이터를 성공적으로 가져와야 함', async () => {
    const mockData = [
      {
        date: '2024-07-01T00:00:00.000Z',
        quantity: 2,
        product: '상품1',
        price: 60000,
        imgSrc: '/imgs/product1.jpg',
      },
      {
        date: '2024-07-02T00:00:00.000Z',
        quantity: 1,
        product: '상품2',
        price: 30000,
        imgSrc: '/imgs/product2.jpg',
      },
    ]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { fetchCustomerPurchases } = useCustomerPurchasesClient()
    const result = await fetchCustomerPurchases(1)

    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/customers/1/purchases'))
  })

  it('다른 고객 ID로 요청해야 함', async () => {
    const mockData = [
      {
        date: '2024-07-01T00:00:00.000Z',
        quantity: 1,
        product: '상품1',
        price: 50000,
        imgSrc: '/imgs/product1.jpg',
      },
    ]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { fetchCustomerPurchases } = useCustomerPurchasesClient()
    await fetchCustomerPurchases(2)

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/customers/2/purchases'))
  })

  it('에러 발생 시 에러를 throw해야 함', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({ error: 'Customer not found' }),
    })

    const { fetchCustomerPurchases } = useCustomerPurchasesClient()

    await expect(fetchCustomerPurchases(999)).rejects.toThrow()
  })

  it('네트워크 에러 발생 시 에러를 throw해야 함', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    const { fetchCustomerPurchases } = useCustomerPurchasesClient()

    await expect(fetchCustomerPurchases(1)).rejects.toThrow()
  })
})
