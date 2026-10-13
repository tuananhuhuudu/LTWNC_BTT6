import { ProductList } from './features/products/ProductList';
import { CartSummary } from './features/cart/CartSummary';

export default function App() {
  return (
    <main>
      <h1>Cua hang</h1>
      <ProductList />
      <CartSummary />
    </main>
  );
}
