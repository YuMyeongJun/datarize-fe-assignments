import { render, screen } from '@testing-library/react';
import { CustomerListTable } from '../CustomerListTable';
import { ICustomer } from '@/models/interface/res/ICustomersRes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CustomerListViewModelProvider } from '../CustomerListViewModel';

// QueryClient 생성 헬퍼
const createTestQueryClient = () => {
    return new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createTestQueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            <CustomerListViewModelProvider>{children}</CustomerListViewModelProvider>
        </QueryClientProvider>
    );
};

describe('CustomerListTable', () => {
    const mockCustomers: ICustomer[] = [
        { id: 1, name: '홍길동', count: 10, totalAmount: 500000 },
        { id: 2, name: '김철수', count: 5, totalAmount: 300000 },
    ];

    it('고객 목록을 표시해야 함', () => {
        render(
            <TestWrapper>
                <CustomerListTable customers={mockCustomers} isLoading={false} />
            </TestWrapper>
        );

        expect(screen.getByText('홍길동')).toBeInTheDocument();
        expect(screen.getByText('김철수')).toBeInTheDocument();
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('로딩 중일 때 스켈레톤을 표시해야 함', () => {
        render(
            <TestWrapper>
                <CustomerListTable customers={[]} isLoading={true} />
            </TestWrapper>
        );

        // 스켈레톤이 표시되는지 확인
        const skeleton = document.querySelector('.react-loading-skeleton');
        expect(skeleton).toBeInTheDocument();
    });

    it('고객이 없을 때 메시지를 표시해야 함', () => {
        render(
            <TestWrapper>
                <CustomerListTable customers={[]} isLoading={false} />
            </TestWrapper>
        );

        expect(screen.getByText('검색 결과가 없습니다.')).toBeInTheDocument();
    });

    it('구매 금액을 포맷팅하여 표시해야 함', () => {
        render(
            <TestWrapper>
                <CustomerListTable customers={mockCustomers} isLoading={false} />
            </TestWrapper>
        );

        expect(screen.getByText('500,000원')).toBeInTheDocument();
        expect(screen.getByText('300,000원')).toBeInTheDocument();
    });
});

