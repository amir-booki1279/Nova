import { notFound } from "next/navigation";
import Link from "next/link";

import prisma from "@/lib/prisma";
import { getCategories } from "@/lib/db-categories";
import ProductForm from "@/components/admin/ProductForm";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id },
    }),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <Link
          href="/admin/products"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          ← بازگشت به محصولات
        </Link>

        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          ویرایش محصول
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          اطلاعات محصول «{product.name}» را ویرایش کن.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <ProductForm
          categories={categories.map(({ id, name }) => ({
            id,
            name,
          }))}
          product={product}
        />
      </div>
    </div>
  );
}
