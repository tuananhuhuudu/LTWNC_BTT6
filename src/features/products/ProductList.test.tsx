import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductList } from './ProductList';
import { fetchProducts } from './api';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import type { Product } from './types';

// Mock ca module api de test khong goi mang that
jest.mock('./api');

const mockFetchProducts = fetchProducts as jest.MockedFunction<
  typeof fetchProducts
>;

const products: Product[] = [
  { id: '1', name: 'Ao thun', price: 199000, stock: 5 },
  { id: '2', name: 'Quan jean', price: 499000, stock: 0 },
];

afterEach(() => {
  jest.clearAllMocks();
});

describe('ProductList (bat dong bo voi API duoc mock)', () => {
  it('hien thi "Dang tai..." roi hien danh sach khi API thanh cong', async () => {
    mockFetchProducts.mockResolvedValue(products);

    renderWithProviders(<ProductList />);

    // Trang thai dang tai hien ra truoc
    expect(screen.getByText('Dang tai...')).toBeInTheDocument();

    // Cho du lieu xuat hien
    expect(await screen.findByText('Ao thun')).toBeInTheDocument();
    expect(screen.getByText('Quan jean')).toBeInTheDocument();
    expect(mockFetchProducts).toHaveBeenCalledTimes(1);
  });

  it('hien thi thong bao loi khi API that bai', async () => {
    mockFetchProducts.mockRejectedValue(
      new Error('Khong tai duoc danh sach san pham'),
    );

    renderWithProviders(<ProductList />);

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent('Khong tai duoc danh sach san pham');
  });

  it('hien thi "Khong co san pham nao" khi API tra ve mang rong', async () => {
    mockFetchProducts.mockResolvedValue([]);

    renderWithProviders(<ProductList />);

    expect(
      await screen.findByText('Khong co san pham nao'),
    ).toBeInTheDocument();
  });

  it('them san pham vao gio hang khi bam nut Them (luong day du)', async () => {
    const user = userEvent.setup();
    mockFetchProducts.mockResolvedValue(products);

    const { store } = renderWithProviders(<ProductList />);
    await screen.findByText('Ao thun');

    // San pham thu 2 het hang -> chi co 1 nut bam duoc
    const buttons = screen.getAllByRole('button', { name: 'Them vao gio' });
    await user.click(buttons[0]);

    const state = store.getState().cart;
    expect(state.items).toHaveLength(1);
    expect(state.items[0].name).toBe('Ao thun');
    expect(state.totalPrice).toBe(199000);
  });
});
