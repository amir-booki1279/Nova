import { getAdminOders } from "@/lib/admin-orders";
import Link from "next/link";



const statusLabels: Record<string, string> = {
  PENDING: "در انتظار بررسی",
  PROCESSING: "در حال پردازش",
  SHIPPED: "ارسال شده",
  DELIVERED: "تحویل شده",
  CANCELLED: "لغو شده",
};

const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  PROCESSING: "bg-blue-100 text-blue-700",
  SHIPPED: "bg-purple-100 text-purple-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default async function AdminOrdersPage() {
  const orders = await getAdminOders();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          مدیریت سفارش‌ها
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          مشاهده و مدیریت سفارش‌های ثبت‌شده در فروشگاه
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">کل سفارش‌ها</p>
          <p className="mt-3 text-2xl font-extrabold text-slate-900">
            {orders.length.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">در انتظار بررسی</p>
          <p className="mt-3 text-2xl font-extrabold text-amber-600">
            {orders
              .filter((order) => order.status === "PENDING")
              .length.toLocaleString("fa-IR")}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">تحویل‌شده</p>
          <p className="mt-3 text-2xl font-extrabold text-green-600">
            {orders
              .filter((order) => order.status === "DELIVERED")
              .length.toLocaleString("fa-IR")}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-212.5 text-right">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="p-4">شماره سفارش</th>
                <th className="p-4">مشتری</th>
                <th className="p-4">مبلغ</th>
                <th className="p-4">تاریخ ثبت</th>
                <th className="p-4">وضعیت</th>
                <th className="p-4">عملیات</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="text-sm">
                  <td className="p-4 font-semibold text-slate-800">
                    {order.orderNumber}
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-slate-800">
                      {order.user.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {order.user.email}
                    </p>
                  </td>

                  <td className="p-4 font-semibold text-slate-800">
                    {order.totalAmount.toLocaleString("fa-IR")} تومان
                  </td>

                  <td className="p-4 text-slate-500">
                    {new Date(order.createAt).toLocaleDateString("fa-IR")}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                        statusStyles[order.status]
                      }`}
                    >
                      {statusLabels[order.status]}
                    </span>
                  </td>

                  <td className="p-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="font-semibold text-orange-600 hover:text-orange-700"
                    >
                      جزئیات سفارش
                    </Link>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="p-12 text-center text-slate-500"
                  >
                    هنوز هیچ سفارشی ثبت نشده است.
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
