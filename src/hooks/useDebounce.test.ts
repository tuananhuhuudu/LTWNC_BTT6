import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

// Dung dong ho gia de khong phai cho that 300ms
beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useDebounce', () => {
  it('tra ve gia tri ban dau ngay lap tuc', () => {
    const { result } = renderHook(() => useDebounce('ao', 300));

    expect(result.current).toBe('ao');
  });

  it('chi cap nhat gia tri sau khi het 300ms', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'ao' } },
    );

    rerender({ value: 'ao thun' });
    // Chua du 300ms -> van la gia tri cu
    expect(result.current).toBe('ao');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('ao thun');
  });

  it('chi giu lai lan go cuoi cung khi go lien tuc', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: 'a' } },
    );

    rerender({ value: 'ao' });
    act(() => {
      jest.advanceTimersByTime(100);
    });
    rerender({ value: 'ao thun' });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('ao thun');
  });

  it('dung delay mac dinh 300ms khi khong truyen delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value),
      { initialProps: { value: 'ao' } },
    );

    rerender({ value: 'ao thun' });
    expect(result.current).toBe('ao');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('ao thun');
  });
});
