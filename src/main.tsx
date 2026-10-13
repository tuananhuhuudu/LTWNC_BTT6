import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { MOCK_PRODUCTS } from './mocks/productData';
import './index.css';

// Khi chay thu o localhost chua co server that: tra ve du lieu mau
// de xem giao dien. Phan nay khong anh huong toi code trong src/features.
if (import.meta.env.DEV) {
  const originalFetch = window.fetch;
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    if (String(input).includes('/products')) {
      await new Promise((resolve) => setTimeout(resolve, 600));
      return new Response(JSON.stringify(MOCK_PRODUCTS), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return originalFetch(input, init);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
