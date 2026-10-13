import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { removeItem, clearCart } from './cartSlice';
import { formatPrice } from './cartUtils';

export function CartSummary() {
  const dispatch = useAppDispatch();
  const { items, totalQuantity, totalPrice } = useAppSelector((s) => s.cart);

  if (items.length === 0) {
    return <p className="cart-empty">Gio hang trong</p>;
  }

  return (
    <section className="cart">
      <h2>Gio hang</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <span>
              {item.name} x {item.qty}
            </span>
            <button
              type="button"
              onClick={() => dispatch(removeItem(item.id))}
            >
              Xoa {item.name}
            </button>
          </li>
        ))}
      </ul>
      <p>So luong: {totalQuantity}</p>
      <p className="cart-total">Tong tien: {formatPrice(totalPrice)}</p>
      <button type="button" onClick={() => dispatch(clearCart())}>
        Xoa gio hang
      </button>
    </section>
  );
}
