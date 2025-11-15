import { render, screen, fireEvent } from '@testing-library/react';
import { CustomerSortButton } from '../CustomerSortButton';
import { CustomerListViewModelProvider } from '../CustomerListViewModel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
            <CustomerListViewModelProvider>{ui}</CustomerListViewModelProvider>
        </QueryClientProvider>
    );
};

describe('CustomerSortButton', () => {
    it('정렬 버튼들이 렌더링되어야 함', () => {
        renderWithProviders(<CustomerSortButton />);
        expect(screen.getByText('ID 순')).toBeInTheDocument();
        expect(screen.getByText('구매 금액 ↑')).toBeInTheDocument();
        expect(screen.getByText('구매 금액 ↓')).toBeInTheDocument();
    });

    it('ID 순 버튼 클릭 시 정렬이 변경되어야 함', () => {
        renderWithProviders(<CustomerSortButton />);
        const idButton = screen.getByText('ID 순');

        fireEvent.click(idButton);

        // 버튼이 활성화된 상태로 표시되어야 함
        expect(idButton).toHaveClass('bg-blue-500');
    });

    it('구매 금액 ↑ 버튼 클릭 시 정렬이 변경되어야 함', () => {
        renderWithProviders(<CustomerSortButton />);
        const ascButton = screen.getByText('구매 금액 ↑');

        fireEvent.click(ascButton);

        // 버튼이 활성화된 상태로 표시되어야 함
        expect(ascButton).toHaveClass('bg-blue-500');
    });

    it('구매 금액 ↓ 버튼 클릭 시 정렬이 변경되어야 함', () => {
        renderWithProviders(<CustomerSortButton />);
        const descButton = screen.getByText('구매 금액 ↓');

        fireEvent.click(descButton);

        // 버튼이 활성화된 상태로 표시되어야 함
        expect(descButton).toHaveClass('bg-blue-500');
    });
});

