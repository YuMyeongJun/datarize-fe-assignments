import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CustomerSearchForm } from '../CustomerSearchForm';
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

describe('CustomerSearchForm', () => {
    it('검색 입력 필드가 렌더링되어야 함', () => {
        renderWithProviders(<CustomerSearchForm />);
        const input = screen.getByPlaceholderText('고객 이름으로 검색...');
        expect(input).toBeInTheDocument();
    });

    it('검색 버튼이 렌더링되어야 함', () => {
        renderWithProviders(<CustomerSearchForm />);
        const button = screen.getByText('검색');
        expect(button).toBeInTheDocument();
    });

    it('입력값을 입력하고 제출하면 store가 업데이트되어야 함', async () => {
        renderWithProviders(<CustomerSearchForm />);
        const input = screen.getByPlaceholderText('고객 이름으로 검색...') as HTMLInputElement;
        const button = screen.getByText('검색');

        fireEvent.change(input, { target: { value: '고객1' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(input.value).toBe('고객1');
        });
    });

    it('빈 값으로 검색할 수 있어야 함', async () => {
        renderWithProviders(<CustomerSearchForm />);
        const input = screen.getByPlaceholderText('고객 이름으로 검색...') as HTMLInputElement;
        const button = screen.getByText('검색');

        fireEvent.change(input, { target: { value: '고객1' } });
        fireEvent.change(input, { target: { value: '' } });
        fireEvent.click(button);

        await waitFor(() => {
            expect(input.value).toBe('');
        });
    });
});

