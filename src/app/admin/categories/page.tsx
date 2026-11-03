import Link from "next/link";
import { getAdminCategories } from "@/lib/admin-categories";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";

export default async function AdminCategoriesPage() {
  const categories = await getAdminCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            مدیریت دسته‌بندی‌ها
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            مدیریت دسته‌بندی‌های محصولات فروشگاه
          </p>
        </div>

        <Link
          href="/admin/categories/new"
          className="rounded-xl bg-orange-500 px-5 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-600"
        >
          افزودن دسته‌بندی
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-162.5 text-right">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="p-4">نام دسته‌بندی</th>
                <th className="p-4">شناسه</th>
                <th className="p-4">تعداد محصولات</th>
                <th className="p-4">عملیات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {categories.map((category) => (
                <tr key={category.id} className="text-sm">
                  <td className="p-4 font-semibold text-slate-800">
                    {category.name}
                  </td>

                  <td className="p-4 text-slate-500" dir="ltr">
                    {category.slug}
                  </td>

                  <td className="p-4 text-slate-600">
                    {category._count.products.toLocaleString("fa-IR")}
                  </td>

                  <td className="p-4">
                   <div className="flex items-center gap-2">
                     <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="font-medium text-orange-600 hover:text-orange-700"
                    >
                      ویرایش
                    </Link>
                    <DeleteCategoryButton
                        categoryId={category.id}
                        categoryName={category.name}
                    />
                   </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-10 text-center text-slate-500"
                  >
                    هنوز دسته‌بندی‌ای ثبت نشده است.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
