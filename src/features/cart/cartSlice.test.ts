import cartReducer, {
  initialState,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  type CartState,
} from './cartSlice';
import type { Product } from '../products/types';

const makeProduct = (override: Partial<Product> = {}): Product => ({
  id: '1',
  name: 'Ao thun',
  price: 100000,
  stock: 5,
  ...override,
});

// State co san 1 san pham, dung cho cac test remove / update
const stateWithOneItem: CartState = {
  items: [{ id: '1', name: 'Ao thun', price: 100000, qty: 2 }],
  totalQuantity: 2,
  totalPrice: 200000,
};

describe('cartSlice - addItem', () => {
  it('them san pham moi vao gio hang', () => {
    const state = cartReducer(initialState, addItem(makeProduct()));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toBe(1);
    expect(state.totalPrice).toBe(100000);
  });

  it('tang so luong khi them san pham da co trong gio', () => {
    const state = cartReducer(stateWithOneItem, addItem(makeProduct()));

    expect(state.items).toHaveLength(1);
    expect(state.items[0].qty).toBe(3);
    expect(state.totalQuantity).toBe(3);
  });
});

describe('cartSlice - removeItem', () => {
  it('xoa dung san pham theo id', () => {
    const state = cartReducer(stateWithOneItem, removeItem('1'));

    expect(state.items).toHaveLength(0);
    expect(state.totalPrice).toBe(0);
  });

  it('bo qua khi id khong ton tai, state giu nguyen', () => {
    const state = cartReducer(stateWithOneItem, removeItem('khong-co'));

    expect(state).toEqual(stateWithOneItem);
  });
});

describe('cartSlice - updateQuantity', () => {
  it('cap nhat so luong va tinh lai tong tien', () => {
    const state = cartReducer(
      stateWithOneItem,
      updateQuantity({ id: '1', qty: 5 }),
    );

    expect(state.items[0].qty).toBe(5);
    expect(state.totalPrice).toBe(500000);
  });

  it('xoa san pham khoi gio khi so luong <= 0', () => {
    const state = cartReducer(
      stateWithOneItem,
      updateQuantity({ id: '1', qty: 0 }),
    );

    expect(state.items).toHaveLength(0);
    expect(state.totalQuantity).toBe(0);
  });

  it('bo qua khi cap nhat id khong ton tai', () => {
    const state = cartReducer(
      stateWithOneItem,
      updateQuantity({ id: 'khong-co', qty: 9 }),
    );

    expect(state).toEqual(stateWithOneItem);
  });
});

describe('cartSlice - clearCart', () => {
  it('xoa toan bo san pham trong gio', () => {
    const state = cartReducer(stateWithOneItem, clearCart());

    expect(state).toEqual(initialState);
  });
});
