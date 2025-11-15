import { CustomerListViewModelProvider } from '@/components/pages/customer_list/CustomerListViewModel';
import { CustomerListComponent } from '@/components/pages/customer_list/CustomerListComponent';

export const CustomerListPage = () => {
  return (
    <CustomerListViewModelProvider>
      <CustomerListComponent />
    </CustomerListViewModelProvider>
  );
};

