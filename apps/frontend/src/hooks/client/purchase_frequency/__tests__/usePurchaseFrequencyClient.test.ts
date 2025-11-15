/* eslint-disable no-extra-semi */
import { usePurchaseFrequencyClient } from '../usePurchaseFrequencyClient'

// fetch 모킹
global.fetch = jest.fn()

describe('usePurchaseFrequencyClient', () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it('구매 빈도 데이터를 성공적으로 가져와야 함', async () => {
    const mockData = [
      { range: '0 - 20000', count: 10 },
      { range: '20001 - 30000', count: 5 },
    ]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { fetchPurchaseFrequency } = usePurchaseFrequencyClient()
    const result = await fetchPurchaseFrequency({
      from: '2024-07-01T00:00:00.000Z',
      to: '2024-07-31T23:59:59.999Z',
    })

    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/purchase-frequency'))
  })

  it('에러 발생 시 에러를 throw해야 함', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Invalid date format' }),
    })

    const { fetchPurchaseFrequency } = usePurchaseFrequencyClient()

    await expect(
      fetchPurchaseFrequency({
        from: 'invalid-date',
        to: '2024-07-31T23:59:59.999Z',
      }),
    ).rejects.toThrow()
  })
})
