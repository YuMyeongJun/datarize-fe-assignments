import { render, screen, fireEvent } from '@testing-library/react';
import { PurchaseFrequencyDatePicker } from '../PurchaseFrequencyDatePicker';
import { PurchaseFrequencyViewModelProvider } from '../PurchaseFrequencyViewModel';
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
            <PurchaseFrequencyViewModelProvider>{ui}</PurchaseFrequencyViewModelProvider>
        </QueryClientProvider>
    );
};

describe('PurchaseFrequencyDatePicker', () => {
    it('시작일과 종료일 입력 필드가 렌더링되어야 함', () => {
        renderWithProviders(<PurchaseFrequencyDatePicker />);
        expect(screen.getByLabelText('시작일')).toBeInTheDocument();
        expect(screen.getByLabelText('종료일')).toBeInTheDocument();
    });

    it('시작일을 변경하면 store가 업데이트되어야 함', () => {
        renderWithProviders(<PurchaseFrequencyDatePicker />);
        const fromDateInput = screen.getByLabelText('시작일') as HTMLInputElement;

        fireEvent.change(fromDateInput, { target: { value: '2024-07-01' } });

        expect(fromDateInput.value).toBe('2024-07-01');
    });

    it('종료일을 변경하면 store가 업데이트되어야 함', () => {
        renderWithProviders(<PurchaseFrequencyDatePicker />);
        const toDateInput = screen.getByLabelText('종료일') as HTMLInputElement;

        fireEvent.change(toDateInput, { target: { value: '2024-07-31' } });

        expect(toDateInput.value).toBe('2024-07-31');
    });

    it('날짜를 초기화할 수 있어야 함', () => {
        renderWithProviders(<PurchaseFrequencyDatePicker />);
        const fromDateInput = screen.getByLabelText('시작일') as HTMLInputElement;
        const toDateInput = screen.getByLabelText('종료일') as HTMLInputElement;

        fireEvent.change(fromDateInput, { target: { value: '2024-07-01' } });
        fireEvent.change(toDateInput, { target: { value: '2024-07-31' } });

        fireEvent.change(fromDateInput, { target: { value: '' } });
        fireEvent.change(toDateInput, { target: { value: '' } });

        expect(fromDateInput.value).toBe('');
        expect(toDateInput.value).toBe('');
    });
});

