import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import ProductInfo from '../pages/ProductInfo';
import OrderPlaced from '../pages/OrderPlaced';

export default function ThemeRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/product/:id',
      element: <ProductInfo />,
    },
    {
      path: '/order-placed',
      element: <OrderPlaced />,
    },
  ]);
}

