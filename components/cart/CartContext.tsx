"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

export type CartItem = {
  handle: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (handle: string) => void;
  updateQuantity: (handle: string, quantity: number) => void;
};

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "jafdft-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage full or unavailable
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCartItems(loadCart());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      saveCart(cartItems);
    }
  }, [cartItems, loaded]);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.handle === item.handle);
      if (existing) {
        return prev.map((i) =>
          i.handle === item.handle
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((handle: string) => {
    setCartItems((prev) => prev.filter((i) => i.handle !== handle));
  }, []);

  const updateQuantity = useCallback((handle: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((i) => i.handle !== handle));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.handle === handle ? { ...i, quantity } : i))
      );
    }
  }, []);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
