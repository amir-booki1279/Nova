

import Link from "next/link";

import ProductCard from "@/components/products/ProductCard";
import { products } from "@/lib/product";

type SearchPageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const { q } = await searchParams;

  const query = q?.trim() ?? "";

  const results = products.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          نتایج جست‌وجو
        </h1>

        {query ? (
          <p className="mt-3 text-slate-500">
            نتایج مربوط به «{query}»
          </p>
        ) : (
          <p className="mt-3 text-slate-500">
            عبارت موردنظرت رو برای جست‌وجوی محصولات وارد کن.
          </p>
        )}
      </div>

      {!query ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-slate-600">
            هنوز عبارت جست‌وجویی وارد نکردی.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      ) : results.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <h2 className="text-xl font-bold text-slate-800">
            محصولی پیدا نشد!
          </h2>

          <p className="mt-3 text-slate-500">
            عبارت جست‌وجو رو تغییر بده و دوباره امتحان کن.
          </p>

          <Link
            href="/products"
            className="mt-5 inline-block rounded-xl bg-orange-500 px-5 py-3 font-medium text-white transition hover:bg-orange-600"
          >
            مشاهده همه محصولات
          </Link>
        </div>
      ) : (
        <>
          <p className="mb-6 text-sm text-slate-500">
            {results.length.toLocaleString("fa-IR")} محصول پیدا شد.
          </p>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}