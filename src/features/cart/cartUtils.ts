import type { CartItem } from '../products/types';

// Tinh tong tien cua gio hang
export function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Tong so luong san pham trong gio
export function calcTotalQuantity(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.qty, 0);
}

// Ap dung ma giam gia. Nem loi khi ma khong hop le
const DISCOUNT_CODES: Record<string, number> = {
  SALE10: 0.1,
  SALE20: 0.2,
};

export function applyDiscount(total: number, code: string): number {
  if (total < 0) {
    throw new Error('Tong tien khong hop le');
  }
  const rate = DISCOUNT_CODES[code.toUpperCase()];
  if (rate === undefined) {
    throw new Error('Ma giam gia khong ton tai');
  }
  return Math.round(total * (1 - rate));
}

// Dinh dang tien te VND
export function formatPrice(value: number): string {
  return `${value.toLocaleString('vi-VN')} d`;
}
