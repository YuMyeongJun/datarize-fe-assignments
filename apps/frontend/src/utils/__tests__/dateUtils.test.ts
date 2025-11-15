import { formatToISO8601, isValidDateRange, formatDate } from '../dateUtils'

describe('dateUtils', () => {
  describe('formatToISO8601', () => {
    it('날짜를 ISO 8601 형식으로 변환해야 함', () => {
      const date = new Date('2024-07-15T10:30:00')
      const result = formatToISO8601(date)
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('문자열 날짜도 ISO 8601 형식으로 변환해야 함', () => {
      const dateString = '2024-07-15'
      const result = formatToISO8601(dateString)
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })
  })

  describe('isValidDateRange', () => {
    it('from이 to보다 이전이면 true를 반환해야 함', () => {
      const from = new Date('2024-07-01')
      const to = new Date('2024-07-31')
      expect(isValidDateRange(from, to)).toBe(true)
    })

    it('from과 to가 같으면 true를 반환해야 함', () => {
      const date = new Date('2024-07-15')
      expect(isValidDateRange(date, date)).toBe(true)
    })

    it('from이 to보다 이후이면 false를 반환해야 함', () => {
      const from = new Date('2024-07-31')
      const to = new Date('2024-07-01')
      expect(isValidDateRange(from, to)).toBe(false)
    })
  })

  describe('formatDate', () => {
    it('기본 포맷으로 날짜를 포맷팅해야 함', () => {
      const date = new Date('2024-07-15')
      const result = formatDate(date)
      expect(result).toBe('2024-07-15')
    })

    it('커스텀 포맷으로 날짜를 포맷팅해야 함', () => {
      const date = new Date('2024-07-15T10:30:00')
      const result = formatDate(date, 'YYYY-MM-DD HH:mm')
      expect(result).toBe('2024-07-15 10:30')
    })
  })
})
