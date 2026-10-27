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
    image:"/images/1.jpg",
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
    image:"/images/2.jpg",
    stock: 7,
    category: "کالای دیجیتال",
  },
  {
    id: "3",
    name: "کیبورد مکانیکال گیمینگ",
    slug: "mechanical-gaming-keyboard",
    price: 3800000,
    discountPercentage: 0,
    rating: 4.9,
    reviewCount: 203,
    image:"/images/3.jpg",
    stock: 0,
    category: "لوازم خانه"
  },
  {
    id: "4",
    name: "ماوس بی‌سیم ارگونومیک",
    slug: "ergonomic-wireless-mouse",
    price: 1900000,
    discountPercentage: 20,
    rating: 4.5,
    reviewCount: 67,
    image:"/images/4.jpg",
    stock: 15,
    category: "لوازم خانه"
  },
];