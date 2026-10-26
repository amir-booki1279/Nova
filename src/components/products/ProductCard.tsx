"use client"

import { Product } from "@/types/products";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "../favorites/FavoriteProvider";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
    const{toggleFavorite,isFavorite} = useFavorites()
    const favorite = isFavorite(product.id)
  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100),
  );
  const formattedPrice = (price: number) =>
    new Intl.NumberFormat("fa-IR").format(price);

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/50">
      <Link
        href={`/products/${product.slug}`}
        className="relative block overflow-hidden bg-slate-50"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        {product.discountPercentage > 0 && (
          <span
            className="absolute right-3 top-3  rounded-lg bg-red-500 px-2.5
                    py-1 text-xs font-bold text-white"
          >
            {product.discountPercentage}% تخفیف
          </span>
        )}
        {product.stock === 0 && (
          <span
            className="absolute inset-0 flex items-center justify-center
                     bg-white/75"
          >
            <span className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white">
              ناموجود
            </span>
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          aria-label={
            favorite
              ? "حذف از علاقه‌مندی‌ها"
              : "افزودن به علاقه‌مندی‌ها"
          }
          aria-pressed={favorite}
          className={`absolute left-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 ${
            favorite ? "text-red-500" : "text-slate-500"
          }`}
        >
          <span className="text-xl">{favorite ? "♥" : "♡"}</span>
        </button>
      </Link>

      <div className="p-4">
        <p className="text-xs text-slate-500">{product.category}</p>

        <Link href={`/products/${product.slug}`}>
          <h2
            className="mt-2 min-h-12 text-sm leading-6
                        font-bold text-slate-800 transition group-hover:text-orange-600"
          >
            {product.name}
          </h2>
        </Link>

        <div className="mt-3 flex items-center gap-1.5 text-sm">
          <span className="text-amber-500">★</span>
          <span className="font-bold text-slate-700">
            {formattedPrice(product.rating)}
          </span>
          <span className="text-xs text-slate-400">
            {formattedPrice(product.reviewCount)} نظر
          </span>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          {product.discountPercentage > 0 && (
            <p className="text-xs text-slate-400 line-through">
              {formattedPrice(product.price)} تومان
            </p>
          )}
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="text-base font-black text-slate-900">
              {formattedPrice(discountedPrice)}
              <span className="mr-1 text-xs font-normal text-slate-500">
                تومان
              </span>
            </p>
          </div>
          <button
            type="button"
            disabled={product.stock === 0}
            className="mt-4 w-full rounded-xl bg-orange-500 px-4 py-3 text-sm 
                        font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {product.stock > 0 ? "افزودن به سبد خرید" : "ناموجود"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
