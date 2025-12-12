import { create } from "zustand";
import type { Product } from "../types";

// Nuevo tipo para items del carrito (Product + quantity)
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

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],

  // Agregar producto (si ya existe, aumenta quantity)
  addProductToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        // Si ya existe, aumenta la cantidad
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        // Si no existe, agrégalo con quantity = 1
        return {
          cart: [...state.cart, { ...product, quantity: 1 }],
        };
      }
    }),

  // Eliminar producto del carrito
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  // Aumentar cantidad de un producto
  increaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    })),

  // Disminuir cantidad de un producto
  decreaseQuantity: (productId) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0), // Si llega a 0, lo elimina
    })),

  // Calcular el total del carrito
  getTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));