import { BrowserRouter } from 'react-router-dom';
import ThemeRoutes from './router';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeRoutes />
    </BrowserRouter>
  );
}
