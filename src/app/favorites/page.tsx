"use client";

import Link from "next/link";

import { useFavorites } from "@/components/favorites/FavoriteProvider";
import ProductCard from "@/components/products/ProductCard";
import { products } from "@/lib/product";

export default function FavoritesPage() {
  const { favoriteIds } = useFavorites();

  const favoriteProducts = products.filter((product) =>
    favoriteIds.includes(product.id)
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          علاقه‌مندی‌های من ❤️
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          محصولاتی که برای خرید ذخیره کرده‌ای.
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 py-16 text-center">
          <div className="mb-4 text-5xl">♡</div>

          <h2 className="text-lg font-bold text-slate-800">
            هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌ای!
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            محصولات موردعلاقه‌ات را با زدن روی قلب ذخیره کن.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            مشاهده محصولات
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-5 text-sm text-slate-500">
            {favoriteProducts.length.toLocaleString("fa-IR")} محصول در لیست علاقه‌مندی‌ها
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}