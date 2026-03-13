// CartItem interface — the shape of a single item in the cart.
// Shared across the CartService and the CartPage component.

export interface CartItem {
  id: number;
  name: string;
  price: number;   // price per unit
  quantity: number;
}
