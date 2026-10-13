import type { Product } from './types';
import { formatPrice } from '../cart/cartUtils';

interface ProductCardProps {
  product: Product;
  onAdd: (id: string) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const outOfStock = product.stock === 0;

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(product.price)}</p>
      {outOfStock ? (
        <p>Het hang</p>
      ) : (
        <p>Con {product.stock} san pham</p>
      )}
      <button
        type="button"
        disabled={outOfStock}
        onClick={() => onAdd(product.id)}
      >
        Them vao gio
      </button>
    </div>
  );
}
