import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartSummary } from './CartSummary';
import { renderWithProviders } from '../../test-utils/renderWithProviders';
import type { CartState } from './cartSlice';

const cartWithTwoItems: CartState = {
  items: [
    { id: '1', name: 'Ao thun', price: 100000, qty: 2 },
    { id: '2', name: 'Quan jean', price: 300000, qty: 1 },
  ],
  totalQuantity: 3,
  totalPrice: 500000,
};

describe('CartSummary (integration voi Redux store)', () => {
  it('hien thi "Gio hang trong" khi chua co san pham nao', () => {
    renderWithProviders(<CartSummary />);

    expect(screen.getByText('Gio hang trong')).toBeInTheDocument();
  });

  it('hien thi danh sach san pham va dung tong tien', () => {
    renderWithProviders(<CartSummary />, { cart: cartWithTwoItems });

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Ao thun x 2')).toBeInTheDocument();
    expect(screen.getByText('So luong: 3')).toBeInTheDocument();
    expect(screen.getByText(/Tong tien: 500\.000/)).toBeInTheDocument();
  });

  it('xoa san pham khoi gio va cap nhat lai tong tien khi bam Xoa', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartSummary />, { cart: cartWithTwoItems });

    await user.click(screen.getByRole('button', { name: 'Xoa Ao thun' }));

    expect(screen.queryByText('Ao thun x 2')).toBeNull();
    expect(screen.getByText(/Tong tien: 300\.000/)).toBeInTheDocument();
  });

  it('hien thi lai "Gio hang trong" sau khi bam Xoa gio hang', async () => {
    const user = userEvent.setup();
    renderWithProviders(<CartSummary />, { cart: cartWithTwoItems });

    await user.click(screen.getByRole('button', { name: 'Xoa gio hang' }));

    expect(screen.getByText('Gio hang trong')).toBeInTheDocument();
  });
});
