import { getAdminProducts } from "@/lib/db_admin-products";
import Link from "next/link";


export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            مدیریت محصولات
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            مشاهده و مدیریت محصولات فروشگاه
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          + افزودن محصول
        </Link>
      </div>

      {/* Products Count */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <p className="text-sm text-slate-500">تعداد کل محصولات</p>

        <p className="mt-2 text-2xl font-extrabold text-slate-900">
          {products.length.toLocaleString("fa-IR")}
        </p>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {products.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-semibold text-slate-700">
              هنوز محصولی ثبت نشده است.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              برای شروع، اولین محصول فروشگاه را اضافه کن.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-212.5 text-right">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    محصول
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    دسته‌بندی
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    قیمت
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    موجودی
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    وضعیت
                  </th>

                  <th className="px-5 py-4 text-sm font-semibold text-slate-600">
                    عملیات
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">
                        {product.name}
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        {product.slug}
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {product.category.name}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {product.price.toLocaleString("fa-IR")} تومان
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {product.stock.toLocaleString("fa-IR")}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          product.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.isActive ? "فعال" : "غیرفعال"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="text-sm font-semibold text-orange-600 transition hover:text-orange-700"
                      >
                        ویرایش
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
