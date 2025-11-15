import { PurchaseFrequencyViewModelProvider } from '@/components/pages/purchase_frequency/PurchaseFrequencyViewModel';
import { PurchaseFrequencyComponent } from '@/components/pages/purchase_frequency/PurchaseFrequencyComponent';

export const PurchaseFrequencyPage = () => {
  return (
    <PurchaseFrequencyViewModelProvider>
      <PurchaseFrequencyComponent />
    </PurchaseFrequencyViewModelProvider>
  );
};

