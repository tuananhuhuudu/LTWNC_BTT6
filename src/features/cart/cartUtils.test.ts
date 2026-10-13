import {
  calcTotal,
  calcTotalQuantity,
  applyDiscount,
  formatPrice,
} from './cartUtils';
import type { CartItem } from '../products/types';

// Ham tao du lieu mau de khong phai lap lai o moi test
const makeItem = (override: Partial<CartItem> = {}): CartItem => ({
  id: '1',
  name: 'Ao thun',
  price: 100000,
  qty: 1,
  ...override,
});

describe('calcTotal', () => {
  it('tra ve 0 khi gio hang rong', () => {
    expect(calcTotal([])).toBe(0);
  });

  it('cong dung gia x so luong voi 1 san pham', () => {
    const items = [makeItem({ price: 100000, qty: 2 })];
    expect(calcTotal(items)).toBe(200000);
  });

  it('cong dung tong khi co nhieu san pham', () => {
    const items = [
      makeItem({ id: '1', price: 100000, qty: 2 }),
      makeItem({ id: '2', price: 50000, qty: 3 }),
    ];
    expect(calcTotal(items)).toBe(350000);
  });
});

describe('calcTotalQuantity', () => {
  it('cong dung tong so luong cua tat ca san pham', () => {
    const items = [
      makeItem({ id: '1', qty: 2 }),
      makeItem({ id: '2', qty: 5 }),
    ];
    expect(calcTotalQuantity(items)).toBe(7);
  });
});

describe('applyDiscount', () => {
  it('giam 10% khi dung ma SALE10', () => {
    expect(applyDiscount(200000, 'SALE10')).toBe(180000);
  });

  it('khong phan biet chu hoa chu thuong cua ma giam gia', () => {
    expect(applyDiscount(200000, 'sale20')).toBe(160000);
  });

  it('nem loi khi ma giam gia khong ton tai', () => {
    expect(() => applyDiscount(200000, 'ABC')).toThrow(
      'Ma giam gia khong ton tai',
    );
  });

  it('nem loi khi tong tien am', () => {
    expect(() => applyDiscount(-1, 'SALE10')).toThrow();
  });
});

describe('formatPrice', () => {
  it('dinh dang so thanh tien VND co dau phan cach', () => {
    expect(formatPrice(1000000)).toContain('d');
    expect(formatPrice(0)).toBe('0 d');
  });
});
