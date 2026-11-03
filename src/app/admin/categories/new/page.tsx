import Link from "next/link";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <Link
          href="/admin/categories"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          ← بازگشت به دسته‌بندی‌ها
        </Link>

        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          افزودن دسته‌بندی جدید
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          اطلاعات دسته‌بندی جدید را وارد کن.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <CategoryForm />
      </div>
    </div>
  );
}
