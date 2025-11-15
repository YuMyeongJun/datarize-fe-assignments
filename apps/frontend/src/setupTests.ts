import '@testing-library/jest-dom'

// React Query 테스트를 위한 기본 설정
global.fetch = jest.fn()

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock ECharts
jest.mock('echarts-for-react', () => {
  const React = require('react')
  return {
    __esModule: true,
    default: ({ option }: { option: any }) => {
      return React.createElement('div', {
        'data-testid': 'echarts-mock',
        'data-option': JSON.stringify(option),
      })
    },
  }
})
