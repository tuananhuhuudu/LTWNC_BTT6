import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductCard } from './ProductCard';
import type { Product } from './types';

const makeProduct = (override: Partial<Product> = {}): Product => ({
  id: '1',
  name: 'Ao thun',
  price: 199000,
  stock: 5,
  ...override,
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('ProductCard', () => {
  it('hien thi ten, gia va so luong con lai cua san pham', () => {
    // Arrange
    render(<ProductCard product={makeProduct()} onAdd={jest.fn()} />);

    // Assert
    expect(screen.getByText('Ao thun')).toBeInTheDocument();
    expect(screen.getByText(/199\.000/)).toBeInTheDocument();
    expect(screen.getByText('Con 5 san pham')).toBeInTheDocument();
  });

  it('goi onAdd dung 1 lan voi id san pham khi bam nut Them', async () => {
    // Arrange
    const user = userEvent.setup();
    const onAdd = jest.fn();
    render(<ProductCard product={makeProduct({ id: '42' })} onAdd={onAdd} />);

    // Act
    await user.click(screen.getByRole('button', { name: 'Them vao gio' }));

    // Assert
    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onAdd).toHaveBeenCalledWith('42');
  });

  it('vo hieu hoa nut va bao het hang khi stock = 0', () => {
    render(
      <ProductCard product={makeProduct({ stock: 0 })} onAdd={jest.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Them vao gio' })).toBeDisabled();
    expect(screen.getByText('Het hang')).toBeInTheDocument();
  });

  it('khong goi onAdd khi san pham het hang', async () => {
    const user = userEvent.setup();
    const onAdd = jest.fn();
    render(
      <ProductCard product={makeProduct({ stock: 0 })} onAdd={onAdd} />,
    );

    await user.click(screen.getByRole('button', { name: 'Them vao gio' }));

    expect(onAdd).not.toHaveBeenCalled();
  });
});
