"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CartItem } from "./types";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (concertId: string, tierId: string) => void;
  updateQuantity: (concertId: string, tierId: string, qty: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.concertId === newItem.concertId && i.tierId === newItem.tierId
      );
      if (existing) {
        return prev.map((i) =>
          i.concertId === newItem.concertId && i.tierId === newItem.tierId
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (concertId: string, tierId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.concertId === concertId && i.tierId === tierId))
    );
  };

  const updateQuantity = (concertId: string, tierId: string, qty: number) => {
    if (qty <= 0) return removeItem(concertId, tierId);
    setItems((prev) =>
      prev.map((i) =>
        i.concertId === concertId && i.tierId === tierId
          ? { ...i, quantity: qty }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
