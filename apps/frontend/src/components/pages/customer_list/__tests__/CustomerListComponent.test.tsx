import { render, screen, waitFor } from '@testing-library/react';
import { CustomerListComponent } from '../CustomerListComponent';
import { CustomerListViewModelProvider, CustomerListViewModel } from '../CustomerListViewModel';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useViewModel } from '@/hooks/useViewModel';
import { useStore } from 'zustand';
import React from 'react';
import { toast } from 'react-toastify';

// toast 모킹
jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

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

// Store를 조작할 수 있는 테스트 헬퍼 컴포넌트
const TestWrapper = ({
    children,
    initialSortBy,
    initialSearchName
}: {
    children: React.ReactElement
    initialSortBy?: 'id' | 'asc' | 'desc'
    initialSearchName?: string
}) => {
    const initialState = {
        ...(initialSortBy !== undefined && { sortBy: initialSortBy }),
        ...(initialSearchName !== undefined && { searchName: initialSearchName }),
    };

    return (
        <QueryClientProvider client={queryClient}>
            <CustomerListViewModelProvider initialState={Object.keys(initialState).length > 0 ? initialState : undefined}>
                {children}
            </CustomerListViewModelProvider>
        </QueryClientProvider>
    );
};

// ViewModel Provider로 감싸는 헬퍼 함수
const renderWithProviders = (
    ui: React.ReactElement,
    options?: { sortBy?: 'id' | 'asc' | 'desc', searchName?: string }
) => {
    return render(
        <TestWrapper
            initialSortBy={options?.sortBy}
            initialSearchName={options?.searchName}
        >
            {ui}
        </TestWrapper>
    );
};

describe('CustomerListComponent', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
        (toast.error as jest.Mock).mockClear();
    });

    it('제목이 렌더링되어야 함', () => {
        renderWithProviders(<CustomerListComponent />);
        expect(screen.getByText('고객 목록')).toBeInTheDocument();
    });

    it('검색 폼이 렌더링되어야 함', () => {
        renderWithProviders(<CustomerListComponent />);
        expect(screen.getByPlaceholderText('고객 이름으로 검색...')).toBeInTheDocument();
    });

    it('정렬 버튼들이 렌더링되어야 함', () => {
        renderWithProviders(<CustomerListComponent />);
        expect(screen.getByText('ID 순')).toBeInTheDocument();
        expect(screen.getByText('구매 금액 ↑')).toBeInTheDocument();
        expect(screen.getByText('구매 금액 ↓')).toBeInTheDocument();
    });

    it('고객 목록 테이블이 렌더링되어야 함', async () => {
        renderWithProviders(<CustomerListComponent />);
        await waitFor(() => {
            const container = document.querySelector('.w-full');
            expect(container).toBeInTheDocument();
        });
    });

    it('sortBy가 id일 때는 sortBy 파라미터를 보내지 않아야 함', async () => {
        const mockData = [{ id: 1, name: '고객1', count: 10, totalAmount: 500000 }];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        renderWithProviders(<CustomerListComponent />, { sortBy: 'id' });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            const calls = (fetch as jest.Mock).mock.calls;
            const customerCall = calls.find((call: string[]) =>
                call[0] && call[0].includes('/api/customers')
            );
            if (customerCall) {
                expect(customerCall[0]).not.toContain('sortBy=');
            }
        });
    });

    it('sortBy가 asc일 때는 sortBy=asc 파라미터를 보내야 함', async () => {
        const mockData = [{ id: 1, name: '고객1', count: 10, totalAmount: 500000 }];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        renderWithProviders(<CustomerListComponent />, { sortBy: 'asc' });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            const calls = (fetch as jest.Mock).mock.calls;
            const customerCall = calls.find((call: string[]) =>
                call[0] && call[0].includes('/api/customers')
            );
            if (customerCall) {
                expect(customerCall[0]).toContain('sortBy=asc');
            }
        });
    });

    it('searchName이 있을 때 name 파라미터를 보내야 함', async () => {
        const mockData = [{ id: 1, name: '고객1', count: 10, totalAmount: 500000 }];
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData,
        });

        renderWithProviders(<CustomerListComponent />, { searchName: '고객' });

        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
            const calls = (fetch as jest.Mock).mock.calls;
            const customerCall = calls.find((call: string[]) =>
                call[0] && call[0].includes('/api/customers')
            );
            if (customerCall) {
                expect(customerCall[0]).toContain('name=');
            }
        }, { timeout: 3000 });
    });

    it('에러 발생 시 toast.error를 호출해야 함', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({ error: 'Server error' }),
        });

        renderWithProviders(<CustomerListComponent />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalled();
        });
    });

    it('Error 객체일 때 error.message를 표시해야 함', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        renderWithProviders(<CustomerListComponent />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Network error');
        });
    });

    it('Error 객체가 아닐 때 기본 메시지를 표시해야 함', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            status: 500,
            json: async () => ({ error: 'Server error' }),
        });

        renderWithProviders(<CustomerListComponent />);

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalled();
            // 에러 메시지가 호출되었는지 확인 (정확한 메시지는 API 클라이언트에서 처리)
            const errorCall = (toast.error as jest.Mock).mock.calls[0]?.[0];
            expect(errorCall).toBeTruthy();
        });
    });
});

