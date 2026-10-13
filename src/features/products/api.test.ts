import { fetchProducts } from './api';
import type { Product } from './types';

const products: Product[] = [
  { id: '1', name: 'Ao thun', price: 199000, stock: 5 },
];

// jsdom khong co san fetch -> gan ham gia vao globalThis de test
const mockFetch = jest.fn();
globalThis.fetch = mockFetch as unknown as typeof fetch;

afterEach(() => {
  jest.clearAllMocks();
});

describe('fetchProducts', () => {
  it('tra ve danh sach san pham khi server tra ve 200', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => products,
    });

    await expect(fetchProducts()).resolves.toEqual(products);
    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/products');
  });

  it('nem loi khi server tra ve loi', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });

    await expect(fetchProducts()).rejects.toThrow(
      'Khong tai duoc danh sach san pham',
    );
  });
});
