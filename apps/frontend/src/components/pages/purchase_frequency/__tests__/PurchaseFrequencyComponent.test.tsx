import { render, screen, waitFor } from '@testing-library/react';
import { PurchaseFrequencyComponent } from '../PurchaseFrequencyComponent';
import { PurchaseFrequencyViewModelProvider } from '../PurchaseFrequencyViewModel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// fetch 모킹
global.fetch = jest.fn();

// QueryClient 생성
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
        },
    },
});

// ViewModel Provider로 감싸는 헬퍼 함수
const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <QueryClientProvider client={queryClient}>
            <PurchaseFrequencyViewModelProvider>{ui}</PurchaseFrequencyViewModelProvider>
        </QueryClientProvider>
    );
};

describe('PurchaseFrequencyComponent', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('제목이 렌더링되어야 함', () => {
        renderWithProviders(<PurchaseFrequencyComponent />);
        expect(screen.getByText('가격대별 구매 빈도')).toBeInTheDocument();
    });

    it('날짜 선택기가 렌더링되어야 함', () => {
        renderWithProviders(<PurchaseFrequencyComponent />);
        expect(screen.getByLabelText('시작일')).toBeInTheDocument();
        expect(screen.getByLabelText('종료일')).toBeInTheDocument();
    });

    it('차트 컴포넌트가 렌더링되어야 함', async () => {
        renderWithProviders(<PurchaseFrequencyComponent />);
        // PurchaseFrequencyChart가 렌더링되는지 확인
        await waitFor(() => {
            const chartContainer = document.querySelector('.w-full.bg-white');
            expect(chartContainer).toBeInTheDocument();
        });
    });
});

