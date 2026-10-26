"use client";

import { Product } from "@/types/products";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";



type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("nova-cart");

    if (savedCart) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(savedCart) as CartItem[]);
      } catch {
        localStorage.removeItem("nova-cart");
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("nova-cart", JSON.stringify(items));
  }, [items, isLoaded]);

  function addToCart(product: Product) {
    if (product.stock <= 0) return;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === product.id,
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + 1, item.stock),
              }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId: string) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  function increaseQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.min(item.quantity + 1, item.stock),
            }
          : item,
      ),
    );
  }

  function decreaseQuantity(productId: string) {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const totalPrice = items.reduce((total, item) => {
    const finalPrice = Math.round(
      item.price * (1 - item.discountPercentage / 100),
    );

    return total + finalPrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart باید داخل CartProvider استفاده شود.");
  }

  return context;
}