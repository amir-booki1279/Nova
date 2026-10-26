import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Header from "@/components/layout/Header";
import { products } from "@/lib/product";



type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("fa-IR").format(price);
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { slug } = await params;
  console.log(2);
  

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  const discountedPrice = Math.round(
    product.price * (1 - product.discountPercentage / 100),
  );

  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="transition hover:text-orange-500">
            خانه
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/products"
            className="transition hover:text-orange-500"
          >
            محصولات
          </Link>

          <span className="mx-2">/</span>

          <span className="text-slate-900">{product.name}</span>
        </nav>

        <section className="grid gap-10 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />

            {product.discountPercentage > 0 && (
              <span className="absolute right-4 top-4 rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white">
                {product.discountPercentage}٪ تخفیف
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold text-orange-500">
              {product.category}
            </p>

            <h1 className="mt-4 text-2xl leading-relaxed font-black text-slate-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-5 flex items-center gap-2 text-sm">
              <span className="text-xl text-amber-500">★</span>

              <span className="font-bold text-slate-800">
                {formatPrice(product.rating)}
              </span>

              <span className="text-slate-500">
                ({formatPrice(product.reviewCount)} نظر)
              </span>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 p-5">
              {product.discountPercentage > 0 && (
                <p className="text-sm text-slate-400 line-through">
                  {formatPrice(product.price)} تومان
                </p>
              )}

              <p className="mt-2 text-3xl font-black text-slate-900">
                {formatPrice(discountedPrice)}

                <span className="mr-2 text-sm font-normal text-slate-500">
                  تومان
                </span>
              </p>

              <div className="mt-5 flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    product.stock > 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                />

                <span
                  className={
                    product.stock > 0
                      ? "text-sm text-green-700"
                      : "text-sm text-red-600"
                  }
                >
                  {product.stock > 0
                    ? `موجود در انبار (${formatPrice(product.stock)} عدد)`
                    : "این محصول در حال حاضر ناموجود است"}
                </span>
              </div>

              <button
                type="button"
                disabled={product.stock === 0}
                className="mt-6 w-full rounded-xl bg-orange-500 px-6 py-4 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
              >
                {product.stock > 0
                  ? "افزودن به سبد خرید"
                  : "ناموجود"}
              </button>
            </div>

            <div className="mt-6 space-y-3 text-sm leading-7 text-slate-600">
              <p>✓ تضمین اصالت کالا</p>
              <p>✓ امکان پیگیری سفارش</p>
              <p>✓ پرداخت امن در فرایند خرید</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}