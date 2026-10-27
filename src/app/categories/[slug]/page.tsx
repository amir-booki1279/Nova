


import { notFound } from "next/navigation";
import { categories } from "@/lib/categories";

import ProductCard from "@/components/products/ProductCard";
import { products } from "@/lib/product";

type CategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({
  params,
}: CategoryPageProps) {
  const { slug } = await params;

  const category = categories.find(
    (item) => item.slug === slug
  );

  if (!category) {
    notFound();
  }

  const categoryProducts = products.filter(
    (product) => product.category === category.name
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900">
          {category.name}
        </h1>

        <p className="mt-3 text-slate-500">
          {category.description}
        </p>

        <p className="mt-4 text-sm text-slate-400">
          {categoryProducts.length.toLocaleString("fa-IR")} محصول
        </p>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <h2 className="text-xl font-bold text-slate-800">
            هنوز محصولی در این دسته‌بندی وجود ندارد
          </h2>

          <p className="mt-3 text-slate-500">
            به‌زودی محصولات جدیدی به این دسته‌بندی اضافه می‌شوند.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
