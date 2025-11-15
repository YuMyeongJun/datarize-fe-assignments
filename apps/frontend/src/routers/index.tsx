import { Routes, Route, Navigate } from 'react-router-dom';
import { PurchaseFrequencyPage } from '@/pages/PurchaseFrequencyPage';
import { CustomerListPage } from '@/pages/CustomerListPage';

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/purchase-frequency" replace />} />
      <Route path="/purchase-frequency" element={<PurchaseFrequencyPage />} />
      <Route path="/customers" element={<CustomerListPage />} />
    </Routes>
  );
};

