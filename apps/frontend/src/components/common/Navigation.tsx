import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

export interface INavigationProps {}

export const Navigation = ({}: INavigationProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/purchase-frequency', label: '가격대별 구매 빈도' },
    { path: '/customers', label: '고객 목록' },
  ];

  return (
    <nav className="bg-white shadow-sm mb-8">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={classNames(
                  'py-4 px-2 border-b-2 font-medium text-sm transition-colors',
                  {
                    'border-blue-500 text-blue-600': isActive,
                    'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300':
                      !isActive,
                  }
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

