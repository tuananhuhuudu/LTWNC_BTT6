import { useEffect, useState } from 'react';
import { fetchProducts } from './api';
import type { Product } from './types';
import { ProductCard } from './ProductCard';
import { useAppDispatch } from '../../app/hooks';
import { addItem } from '../cart/cartSlice';

export function ProductList() {
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    fetchProducts()
      .then((data) => {
        if (!ignore) setProducts(data);
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  if (loading) return <p>Dang tai...</p>;
  if (error) return <p role="alert">{error}</p>;
  if (products.length === 0) return <p>Khong co san pham nao</p>;

  return (
    <div>
      <h2>Danh sach san pham</h2>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={() => dispatch(addItem(p))}
          />
        ))}
      </div>
    </div>
  );
}
