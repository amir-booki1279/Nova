import { Product } from "@/types/products";




export const products: Product[] = [
  {
    id: "1",
    name: "هدفون بی‌سیم نویز کنسلینگ",
    slug: "wireless-noise-cancelling-headphones",
    price: 4500000,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 124,
    image: "/images/products/headphones.webp",
    stock: 12,
    category: "کالای دیجیتال",
  },
  {
    id: "2",
    name: "ساعت هوشمند نسل جدید",
    slug: "next-gen-smartwatch",
    price: 6200000,
    discountPercentage: 10,
    rating: 4.6,
    reviewCount: 86,
    image: "/images/products/smartwatch.webp",
    stock: 7,
    category: "گجت هوشمند",
  },
  {
    id: "3",
    name: "کیبورد مکانیکی مخصوص گیمینگ",
    slug: "mechanical-gaming-keyboard",
    price: 3800000,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 203,
    image: "/images/products/keyboard.webp",
    stock: 0,
    category: "لوازم جانبی",
  },
  {
    id: "4",
    name: "ماوس بی‌سیم ارگونومیک",
    slug: "ergonomic-wireless-mouse",
    price: 1900000,
    discountPercentage: 20,
    rating: 4.5,
    reviewCount: 67,
    image: "/images/products/mouse.webp",
    stock: 15,
    category: "لوازم جانبی",
  },
];