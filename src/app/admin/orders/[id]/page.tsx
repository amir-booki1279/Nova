import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminOrderById } from "@/lib/admin-orders";
import OrderStatusForm from "@/components/admin/OrderStatusForm";

type AdminOrderPageProps = {
  params: Promise<{ id: string }>;
};

const statusLabels: Record<string, string> = {
  PENDING: "در انتظار بررسی",
  PROCESSING: "در حال پردازش",
  SHIPPED: "ارسال شده",
  DELIVERED: "تحویل شده",
  CANCELLED: "لغو شده",
};

const paymentLabels: Record<string, string> = {
  UNPAID: "پرداخت نشده",
  PAID: "پرداخت شده",
  FAILED: "پرداخت ناموفق",
  REFUNDED: "مسترد شده",
};

export default async function AdminOrderPage({
  params,
}: AdminOrderPageProps) {
  const { id } = await params;

  const order = await getAdminOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <Link
          href="/admin/orders"
          className="text-sm font-medium text-orange-600 hover:text-orange-700"
        >
          ← بازگشت به سفارش‌ها
        </Link>

        <h1 className="mt-4 text-2xl font-extrabold text-slate-900">
          جزئیات سفارش
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          سفارش شماره {order.orderNumber}
        </p>
      </div>

      {/* اطلاعات اصلی سفارش */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <InfoCard
          title="شماره سفارش"
          value={order.orderNumber}
        />

        <InfoCard
          title="وضعیت سفارش"
          value={statusLabels[order.status]}
        />

        <InfoCard
          title="وضعیت پرداخت"
          value={paymentLabels[order.paymentStatus]}
        />

        <InfoCard
          title="مبلغ کل"
          value={`${order.totalAmount.toLocaleString("fa-IR")} تومان`}
        />

        <InfoCard
          title="تاریخ ثبت"
          value={new Date(order.createAt).toLocaleDateString("fa-IR")}
        />

        <OrderStatusForm orderId={order.id} currentStatus={order.status} />
      </div>

      {/* اطلاعات مشتری */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          اطلاعات مشتری
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">نام مشتری</p>
            <p className="mt-2 font-semibold text-slate-800">
              {order.user.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">ایمیل</p>
            <p className="mt-2 font-semibold text-slate-800" dir="ltr">
              {order.user.email}
            </p>
          </div>
        </div>
      </section>

      {/* محصولات سفارش */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-bold text-slate-900">
          محصولات سفارش
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-right">
            <thead className="bg-slate-50 text-sm text-slate-600">
              <tr>
                <th className="p-4">محصول</th>
                <th className="p-4">قیمت واحد</th>
                <th className="p-4">تعداد</th>
                <th className="p-4">جمع</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {order.items.map((item) => (
                <tr key={item.id} className="text-sm">
                  <td className="p-4 font-semibold text-slate-800">
                    {item.product.name}
                  </td>

                  <td className="p-4 text-slate-600">
                    {item.unitPrice.toLocaleString("fa-IR")} تومان
                  </td>

                  <td className="p-4 text-slate-600">
                    {item.quantity.toLocaleString("fa-IR")}
                  </td>

                  <td className="p-4 font-semibold text-slate-800">
                    {(item.unitPrice * item.quantity).toLocaleString("fa-IR")} تومان
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex justify-between border-t border-slate-100 pt-5">
          <span className="font-bold text-slate-700">
            مبلغ نهایی سفارش
          </span>

          <span className="font-extrabold text-orange-600">
            {order.totalAmount.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </section>
    </div>
  );
}

function InfoCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-3 wrap-break-word font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}
