"use client";

import { useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { Product } from "@/types/products";


type AddToCartButtonProps = {
  product: Product;
};

export default function AddToCartButton({
  product,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stock <= 0;

  function handleAddToCart() {
    if (isOutOfStock) return;

    addToCart(product);
    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1500);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isOutOfStock}
      className="mt-6 w-full rounded-xl bg-orange-500 px-6 py-4 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {isOutOfStock
        ? "ناموجود"
        : added
          ? "به سبد خرید اضافه شد ✓"
          : "افزودن به سبد خرید"}
    </button>
  );
}