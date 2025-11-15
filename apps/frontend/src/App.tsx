import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './hooks/providers/QueryProvider';
import { ToastContainer } from 'react-toastify';
import { AppRouter } from './routers';
import { Navigation } from './components/common/Navigation';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

const App = () => {
  return (
    <QueryProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">쇼핑몰 구매 데이터 대시보드</h1>
            <Navigation />
            <main>
              <AppRouter />
            </main>
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </QueryProvider>
  );
};

export default App;
