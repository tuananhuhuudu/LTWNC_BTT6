// Kieu du lieu dung chung cho module San pham / Gio hang
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}
