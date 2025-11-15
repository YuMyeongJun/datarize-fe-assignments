import { render } from '@testing-library/react';
import { PurchaseFrequencyChart } from '../PurchaseFrequencyChart';
import { IPurchaseFrequencyItem } from '@/models/interface/res/IPurchaseFrequencyRes';

describe('PurchaseFrequencyChart', () => {
    const mockData: IPurchaseFrequencyItem[] = [
        { range: '0 - 20000', count: 10 },
        { range: '20001 - 30000', count: 5 },
        { range: '30001 - 40000', count: 3 },
    ];

    it('로딩 중일 때 스피너를 표시해야 함', () => {
        const { container } = render(<PurchaseFrequencyChart data={[]} isLoading={true} />);
        // 스피너가 표시되는지 확인
        const spinner = container.querySelector('[role="status"]');
        expect(spinner).toBeInTheDocument();
    });

    it('데이터가 있을 때 차트를 표시해야 함', () => {
        const { container } = render(<PurchaseFrequencyChart data={mockData} isLoading={false} />);
        // 차트 컨테이너가 렌더링되는지 확인
        const chartContainer = container.querySelector('.w-full.bg-white');
        expect(chartContainer).toBeInTheDocument();
    });

    it('데이터가 없고 로딩 중일 때 스피너를 표시해야 함', () => {
        const { container } = render(<PurchaseFrequencyChart data={[]} isLoading={true} />);
        const spinner = container.querySelector('[role="status"]');
        expect(spinner).toBeInTheDocument();
    });
});

