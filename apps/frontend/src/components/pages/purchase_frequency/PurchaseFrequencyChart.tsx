import ReactECharts from 'echarts-for-react';
import { IPurchaseFrequencyItem } from '@/models/interface/res/IPurchaseFrequencyRes';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export interface IPurchaseFrequencyChartProps {
  data: IPurchaseFrequencyItem[];
  isLoading: boolean;
}

export const PurchaseFrequencyChart = ({ data, isLoading }: IPurchaseFrequencyChartProps) => {
  // 데이터가 없고 로딩 중일 때만 스피너 표시
  if (isLoading && (!data || data.length === 0)) {
    return (
      <div className="w-full bg-white p-6 rounded-lg shadow-md flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const option = {
    title: {
      text: '가격대별 구매 빈도',
      left: 'center',
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params: any) => {
        const param = params[0];
        return `${param.name}<br/>구매 횟수: ${param.value}회`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: data.map((item) => item.range),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      type: 'value',
      name: '구매 횟수',
    },
    series: [
      {
        name: '구매 빈도',
        type: 'bar',
        data: data.map((item) => item.count),
        itemStyle: {
          color: '#3b82f6',
        },
        label: {
          show: true,
          position: 'top',
        },
      },
    ],
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-md relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
          <LoadingSpinner size="lg" />
        </div>
      )}
      <div className={isLoading ? 'opacity-50' : 'opacity-100 transition-opacity duration-300'}>
        <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />
      </div>
    </div>
  );
};

