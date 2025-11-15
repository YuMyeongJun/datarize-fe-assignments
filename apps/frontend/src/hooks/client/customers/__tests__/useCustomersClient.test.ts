/* eslint-disable no-extra-semi */
import { useCustomersClient } from '../useCustomersClient'

// fetch 모킹
global.fetch = jest.fn()

describe('useCustomersClient', () => {
  beforeEach(() => {
    ;(fetch as jest.Mock).mockClear()
  })

  it('고객 목록 데이터를 성공적으로 가져와야 함', async () => {
    const mockData = [
      { id: 1, name: '고객1', count: 10, totalAmount: 500000 },
      { id: 2, name: '고객2', count: 5, totalAmount: 300000 },
    ]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { fetchCustomers } = useCustomersClient()
    const result = await fetchCustomers()

    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/api/customers'))
  })

  it('sortBy 파라미터를 포함하여 요청해야 함', async () => {
    const mockData = [{ id: 1, name: '고객1', count: 10, totalAmount: 500000 }]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { fetchCustomers } = useCustomersClient()
    await fetchCustomers({ sortBy: 'desc' })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/customers?sortBy=desc')
    )
  })

  it('name 파라미터를 포함하여 요청해야 함', async () => {
    const mockData = [{ id: 1, name: '고객1', count: 10, totalAmount: 500000 }]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { fetchCustomers } = useCustomersClient()
    await fetchCustomers({ name: '고객' })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/api\/customers\?.*name=/)
    )
  })

  it('sortBy와 name 파라미터를 모두 포함하여 요청해야 함', async () => {
    const mockData = [{ id: 1, name: '고객1', count: 10, totalAmount: 500000 }]
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    })

    const { fetchCustomers } = useCustomersClient()
    await fetchCustomers({ sortBy: 'asc', name: '고객' })

    const callUrl = (fetch as jest.Mock).mock.calls[0][0]
    expect(callUrl).toContain('/api/customers')
    expect(callUrl).toContain('sortBy=asc')
    expect(callUrl).toContain('name=')
  })

  it('에러 발생 시 에러를 throw해야 함', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    })

    const { fetchCustomers } = useCustomersClient()

    await expect(fetchCustomers()).rejects.toThrow()
  })

  it('네트워크 에러 발생 시 에러를 throw해야 함', async () => {
    ;(fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))

    const { fetchCustomers } = useCustomersClient()

    await expect(fetchCustomers()).rejects.toThrow()
  })

  it('JSON 파싱 실패 시 빈 객체로 처리해야 함', async () => {
    ;(fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => {
        throw new Error('Invalid JSON')
      },
    })

    const { fetchCustomers } = useCustomersClient()

    await expect(fetchCustomers()).rejects.toThrow()
  })
})

