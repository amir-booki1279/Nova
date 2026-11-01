import Link from "next/link";
import { getCategories } from "@/lib/db-categories";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await getCategories();

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
          افزودن محصول جدید
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          اطلاعات محصول را وارد کن.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        {categories.length === 0 ? (
          <p className="text-sm text-slate-600">
            هنوز دسته‌بندی‌ای ثبت نشده است. ابتدا یک دسته‌بندی ایجاد کن.
          </p>
        ) : (
          <ProductForm
            categories={categories.map(({ id, name }) => ({ id, name }))}
          />
        )}
      </div>
    </div>
  );
}
