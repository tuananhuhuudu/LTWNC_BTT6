import type { Product } from './types';

const BASE_URL = 'https://api.example.com';

// Goi API lay danh sach san pham (se duoc mock trong test)
export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) {
    throw new Error('Khong tai duoc danh sach san pham');
  }
  return res.json() as Promise<Product[]>;
}
