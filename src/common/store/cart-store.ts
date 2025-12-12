import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addProductToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      addProductToCart: (product) =>
        set((state) => {
          const existingItem = state.cart.find((item) => item.id === product.id);

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }],
            };
          }
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== productId),
        })),

      increaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        })),

      decreaseQuantity: (productId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0), 
        })),

      getTotal: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: "shopping-cart", 
    }
  )
);