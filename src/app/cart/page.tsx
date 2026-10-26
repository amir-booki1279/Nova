"use client";

import Link from "next/link";
import Image from "next/image";

import { useCart } from "@/components/cart/CartProvider";

export default function CartPage() {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalItems,
    totalPrice,
  } = useCart();

  const formatPrice = (price: number) =>
    `${price.toLocaleString("fa-IR")} تومان`;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-10">
          <div className="mb-5 text-6xl">🛒</div>

          <h1 className="text-2xl font-bold text-slate-900">
            سبد خریدت خالیه!
          </h1>

          <p className="mt-3 leading-7 text-slate-500">
            هنوز محصولی به سبد خرید اضافه نکردی. محصولات موردعلاقه‌ات
            رو پیدا کن و به سبد خریدت اضافه کن.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            مشاهده محصولات
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          سبد خرید
        </h1>

        <p className="mt-2 text-slate-500">
          {totalItems.toLocaleString("fa-IR")} عدد محصول در سبد خرید
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* فهرست محصولات */}
        <section className="space-y-4 lg:col-span-2">
          {items.map((item) => {
            const discountedPrice = Math.round(
              item.price * (1 - item.discountPercentage / 100),
            );

            return (
              <article
                key={item.id}
                className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row"
              >
                {/* تصویر محصول */}
                <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-36">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="144px"
                    className="object-contain p-3"
                  />
                </div>

                {/* اطلاعات محصول */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <h2 className="text-lg font-bold text-slate-900">
                    {item.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    {item.category}
                  </p>

                  <div className="mt-4">
                    {item.discountPercentage > 0 && (
                      <p className="mb-1 text-sm text-slate-400 line-through">
                        {formatPrice(item.price)}
                      </p>
                    )}

                    <p className="font-bold text-slate-900">
                      {formatPrice(discountedPrice)}
                    </p>
                  </div>

                  {/* کنترل تعداد */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center rounded-lg border border-slate-200">
                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.id)}
                        disabled={item.quantity >= item.stock}
                        aria-label="افزایش تعداد"
                        className="px-4 py-2 text-lg disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        +
                      </button>

                      <span className="min-w-10 text-center font-semibold">
                        {item.quantity.toLocaleString("fa-IR")}
                      </span>

                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.id)}
                        aria-label="کاهش تعداد"
                        className="px-4 py-2 text-lg"
                      >
                        −
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-500 transition hover:text-red-700"
                    >
                      حذف محصول
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* خلاصه سفارش */}
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">
            خلاصه سفارش
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-slate-500">تعداد محصولات</span>

              <span className="font-semibold">
                {totalItems.toLocaleString("fa-IR")} عدد
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <span className="text-slate-500">مبلغ قابل پرداخت</span>

              <span className="text-lg font-bold text-slate-900">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <p className="text-xs leading-6 text-slate-400">
              هزینه ارسال در مرحله ثبت سفارش محاسبه می‌شود.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="mt-6 w-full cursor-not-allowed rounded-xl bg-slate-300 px-5 py-4 font-semibold text-white"
          >
            ادامه فرایند خرید (به‌زودی)
          </button>

          <Link
            href="/"
            className="mt-4 block text-center text-sm font-medium text-orange-600 hover:text-orange-700"
          >
            ادامه خرید
          </Link>
        </aside>
      </div>
    </main>
  );
}