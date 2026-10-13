import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../products/types';
import { calcTotal, calcTotalQuantity } from './cartUtils';

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
}

export const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

// Tinh lai tong moi khi gio hang thay doi
function recalculate(state: CartState): void {
  state.totalQuantity = calcTotalQuantity(state.items);
  state.totalPrice = calcTotal(state.items);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Them san pham: neu da co thi tang so luong
    addItem(state, action: PayloadAction<Product>) {
      const product = action.payload;
      const existing = state.items.find((i) => i.id === product.id);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
        });
      }
      recalculate(state);
    },

    // Xoa san pham khoi gio theo id
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      recalculate(state);
    },

    // Cap nhat so luong; qty <= 0 thi xoa khoi gio
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; qty: number }>,
    ) {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (!item) return;
      if (qty <= 0) {
        state.items = state.items.filter((i) => i.id !== id);
      } else {
        item.qty = qty;
      }
      recalculate(state);
    },

    // Xoa toan bo gio hang
    clearCart(state) {
      state.items = [];
      recalculate(state);
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
