import type { Product } from '../features/products/types';

// Du lieu mau de chay thu giao dien o localhost khi chua co server that
export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Ao thun tron', price: 199000, stock: 12 },
  { id: '2', name: 'Quan jean xanh', price: 499000, stock: 5 },
  { id: '3', name: 'Ao so mi trang', price: 359000, stock: 3 },
  { id: '4', name: 'Giay sneaker', price: 899000, stock: 0 },
  { id: '5', name: 'Mu luoi trai', price: 149000, stock: 20 },
];
